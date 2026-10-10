from __future__ import annotations

import base64
import json
import os
import re
import secrets
import subprocess
import sys
import urllib.error
import urllib.request
from pathlib import Path
from typing import Any
from urllib.parse import quote, urlsplit

from flask import Flask, jsonify, redirect, render_template, request, session, url_for

BASE_DIR = Path(__file__).resolve().parent
DATA_DIR = Path.home() / ".gitflow-manager"
REPOSITORY_INDEX = DATA_DIR / "repositories.json"
ACTIVE_REPOSITORY = DATA_DIR / "active_repository.json"
SECRET_KEY_FILE = DATA_DIR / "secret.key"
GITHUB_CONFIG = DATA_DIR / "github.json"
ALLOWED_TYPES = {"feat", "fix", "refactor", "docs", "chore"}
MAX_SCAN_FILE_SIZE = 2 * 1024 * 1024
MAX_FINDINGS = 100

def load_secret_key() -> str:
    configured = os.environ.get("GITFLOW_SECRET_KEY")
    if configured:
        return configured
    try:
        if SECRET_KEY_FILE.is_file():
            value = SECRET_KEY_FILE.read_text(encoding="utf-8").strip()
            if len(value) >= 64:
                return value
        DATA_DIR.mkdir(parents=True, exist_ok=True)
        try:
            DATA_DIR.chmod(0o700)
        except OSError:
            pass
        value = secrets.token_hex(32)
        SECRET_KEY_FILE.write_text(value, encoding="utf-8")
        try:
            SECRET_KEY_FILE.chmod(0o600)
        except OSError:
            pass
        return value
    except OSError:
        return secrets.token_hex(32)


def read_active_repository() -> str:
    try:
        value = json.loads(ACTIVE_REPOSITORY.read_text(encoding="utf-8"))
    except (OSError, json.JSONDecodeError, TypeError):
        return ""
    path = value.get("path", "") if isinstance(value, dict) else ""
    return path if isinstance(path, str) else ""


def write_active_repository(path: str | None) -> None:
    DATA_DIR.mkdir(parents=True, exist_ok=True)
    try:
        DATA_DIR.chmod(0o700)
    except OSError:
        pass
    if not path:
        try:
            ACTIVE_REPOSITORY.unlink(missing_ok=True)
        except OSError:
            pass
        return
    temporary = ACTIVE_REPOSITORY.with_suffix(".tmp")
    temporary.write_text(json.dumps({"path": path}, ensure_ascii=False), encoding="utf-8")
    try:
        temporary.chmod(0o600)
    except OSError:
        pass
    temporary.replace(ACTIVE_REPOSITORY)


app = Flask(__name__)
app.config.update(
    SECRET_KEY=load_secret_key(),
    SESSION_COOKIE_HTTPONLY=True,
    SESSION_COOKIE_SAMESITE="Lax",
    SESSION_COOKIE_SECURE=False,
    MAX_CONTENT_LENGTH=16 * 1024,
    JSON_SORT_KEYS=False,
)

DEBUG_PATTERNS = (
    ("console_log", re.compile(r"\bconsole\s*\.\s*log\s*\(", re.IGNORECASE)),
    ("print_call", re.compile(r"\bprint\s*\(", re.IGNORECASE)),
    ("debug_statement", re.compile(r"\bdebug" + r"ger\b", re.IGNORECASE)),
    ("dd_call", re.compile(r"\bdd\s*\(\s*\)", re.IGNORECASE)),
    ("unfinished_marker", re.compile(r"\bTO" + r"DO\b", re.IGNORECASE)),
)
SECRET_PATTERNS = (
    ("aws_key", re.compile(r"\b(?:AKIA|ASIA)[0-9A-Z]{16}\b", re.IGNORECASE)),
    ("github_token", re.compile(r"\b(?:gh[pousr]_[A-Za-z0-9_]{20,}|github_pat_[A-Za-z0-9_]{20,})\b")),
    ("gitlab_token", re.compile(r"\bglpat-[A-Za-z0-9_-]{20,}\b")),
    ("service_key", re.compile(r"\b(?:sk|rk)_live_[A-Za-z0-9]{16,}\b", re.IGNORECASE)),
    ("jwt", re.compile(r"\beyJ[A-Za-z0-9_-]{10,}\.[A-Za-z0-9_-]{10,}\.[A-Za-z0-9_-]{10,}\b")),
    ("private_key_header", re.compile(r"-----" + r"BEGIN (?:RSA |OPENSSH |EC |DSA )?PRIVATE KEY-----")),
    (
        "credential_assignment",
        re.compile(
            r"\b(?:api[_-]?key|secret|password|passwd|access[_-]?token|auth[_-]?token|private[_-]?key)\b"
            r"\s*[\"']?\s*[:=]\s*(?:[\"'][^\"'\r\n]{8,}[\"']|[-A-Za-z0-9_+/=]{12,}(?=\s|$|[,;]))",
            re.IGNORECASE,
        ),
    ),
)


class GitCommandError(RuntimeError):
    def __init__(self, message: str, detail: str = "") -> None:
        super().__init__(message)
        self.detail = detail.strip()[:1600]


def _git_env() -> dict[str, str]:
    env = os.environ.copy()
    env.update({"GIT_TERMINAL_PROMPT": "0", "GCM_INTERACTIVE": "Never", "GIT_PAGER": "cat", "PAGER": "cat"})
    return env


def run_git(repo: Path, args: list[str], timeout: int = 20, check: bool = True) -> subprocess.CompletedProcess[str]:
    try:
        result = subprocess.run(
            ["git", *args],
            cwd=str(repo),
            env=_git_env(),
            stdin=subprocess.DEVNULL,
            stdout=subprocess.PIPE,
            stderr=subprocess.PIPE,
            text=True,
            encoding="utf-8",
            errors="replace",
            timeout=timeout,
            shell=False,
            check=False,
        )
    except FileNotFoundError as exc:
        raise GitCommandError("git_not_installed") from exc
    except subprocess.TimeoutExpired as exc:
        raise GitCommandError("git_timeout", "Git command timed out.") from exc
    except OSError as exc:
        raise GitCommandError("git_execution_failed", str(exc)) from exc
    if check and result.returncode != 0:
        detail = result.stderr or result.stdout or "Git komutu başarısız oldu."
        raise GitCommandError("git_command_failed", detail)
    return result


def current_branch_name(repo: Path) -> str:
    result = run_git(repo, ["symbolic-ref", "--quiet", "--short", "HEAD"], check=False)
    branch = result.stdout.strip() if result.returncode == 0 else ""
    if not branch:
        raise GitCommandError("branch_detached", "Push is unavailable while HEAD is detached. Check out a branch first.")
    return branch


def git_config_value(repo: Path, key: str) -> str:
    result = run_git(repo, ["config", "--get", key], check=False)
    return result.stdout.strip() if result.returncode == 0 else ""


def push_repository(repo: Path) -> subprocess.CompletedProcess[str]:
    branch = current_branch_name(repo)
    upstream = run_git(
        repo,
        ["rev-parse", "--abbrev-ref", "--symbolic-full-name", "@{upstream}"],
        check=False,
    )
    if upstream.returncode == 0 and upstream.stdout.strip():
        return run_git(repo, ["push"], timeout=90)

    remote_result = run_git(repo, ["remote"], check=False)
    remotes = [line.strip() for line in remote_result.stdout.splitlines() if line.strip()]
    if not remotes:
        raise GitCommandError("remote_not_configured", "Add a Git remote before pushing.")

    preferred = (
        git_config_value(repo, f"branch.{branch}.pushRemote"),
        git_config_value(repo, "remote.pushDefault"),
        git_config_value(repo, f"branch.{branch}.remote"),
    )
    remote_name = next((candidate for candidate in preferred if candidate in remotes), "")
    if not remote_name:
        if "origin" in remotes:
            remote_name = "origin"
        elif len(remotes) == 1:
            remote_name = remotes[0]
        else:
            raise GitCommandError(
                "push_remote_ambiguous",
                "This branch has no upstream and multiple remotes are configured. Set branch pushRemote or remote.pushDefault, or keep a single remote.",
            )

    return run_git(repo, ["push", "--set-upstream", remote_name, branch], timeout=90)


def has_unpushed_commits(repo: Path) -> bool:
    upstream = run_git(
        repo,
        ["rev-parse", "--abbrev-ref", "--symbolic-full-name", "@{upstream}"],
        check=False,
    )
    if upstream.returncode == 0 and upstream.stdout.strip():
        ahead = run_git(repo, ["rev-list", "--count", f"{upstream.stdout.strip()}..HEAD"], check=False)
        if ahead.returncode != 0:
            return False
        try:
            return int(ahead.stdout.strip()) > 0
        except ValueError:
            return False
    return run_git(repo, ["rev-parse", "--verify", "HEAD"], check=False).returncode == 0


def has_git_metadata(path: Path) -> bool:
    current = path
    while True:
        metadata = current / ".git"
        if metadata.exists():
            return True
        if (current / "HEAD").is_file() and (current / "objects").is_dir() and (current / "config").is_file():
            return True
        if current.parent == current:
            return False
        current = current.parent


def discover_nested_repositories(root: Path, max_depth: int = 3, max_items: int = 10) -> list[dict[str, str]]:
    excluded = {".git", ".venv", "venv", "env", "node_modules", "__pycache__", ".tox", ".next", "dist", "build", "vendor", ".idea"}
    found: list[dict[str, str]] = []
    try:
        for current, directories, files in os.walk(root, topdown=True, followlinks=False):
            current_path = Path(current)
            relative_depth = len(current_path.relative_to(root).parts)
            if relative_depth > max_depth:
                directories[:] = []
                continue
            if current_path != root and (current_path / ".git").exists():
                found.append({"path": str(current_path.resolve()), "name": current_path.name})
                directories[:] = []
                if len(found) >= max_items:
                    break
                continue
            if relative_depth >= max_depth:
                directories[:] = []
            else:
                directories[:] = [name for name in directories if name not in excluded and not (current_path / name).is_symlink()]
    except (OSError, RuntimeError, ValueError):
        return found
    return found


def resolve_repo(raw_path: str | None) -> Path:
    if not raw_path or not raw_path.strip():
        raise GitCommandError("repository_not_selected")
    try:
        candidate = Path(raw_path.strip()).expanduser().resolve(strict=True)
    except (OSError, RuntimeError) as exc:
        raise GitCommandError("repository_path_invalid") from exc
    if not candidate.is_dir():
        raise GitCommandError("repository_path_invalid")
    try:
        result = run_git(candidate, ["rev-parse", "--show-toplevel"], timeout=10)
    except GitCommandError as exc:
        if str(exc) == "git_command_failed":
            if not has_git_metadata(candidate):
                raise GitCommandError("repository_not_initialized") from exc
            raise GitCommandError("repository_path_invalid", exc.detail) from exc
        raise
    try:
        root = Path(result.stdout.strip()).resolve(strict=True)
    except (OSError, RuntimeError) as exc:
        raise GitCommandError("repository_path_invalid") from exc
    if not root.is_dir():
        raise GitCommandError("repository_path_invalid")
    return root


def current_active_path() -> str | None:
    if session.get("repo_disconnected"):
        return None
    raw_path = session.get("repo_path") or read_active_repository() or os.environ.get("GITFLOW_REPO")
    if not raw_path:
        return None
    try:
        return str(resolve_repo(raw_path))
    except GitCommandError:
        return raw_path


def active_repo() -> Path:
    raw_path = current_active_path()
    if not raw_path:
        raise GitCommandError("repository_not_selected")
    return resolve_repo(raw_path)


def open_folder_dialog(title: str = "GitFlow Manager - Select a Git repository") -> str:
    if sys.platform == "win32":
        script = "$ErrorActionPreference='Stop'; Add-Type -AssemblyName System.Windows.Forms; [Console]::OutputEncoding = New-Object System.Text.UTF8Encoding; $dialog = New-Object System.Windows.Forms.FolderBrowserDialog; $dialog.Description = '" + title.replace("'", "''") + "'; $dialog.ShowNewFolderButton = $true; if ($dialog.ShowDialog() -eq [System.Windows.Forms.DialogResult]::OK) { Write-Output $dialog.SelectedPath }"
        commands = [["powershell", "-NoProfile", "-STA", "-Command", script]]
    elif sys.platform == "darwin":
        prompt = title.replace('"', '\"')
        commands = [["osascript", "-e", f'POSIX path of (choose folder with prompt "{prompt}")']]
    else:
        commands = [
            ["zenity", "--file-selection", "--directory", "--title", title],
            ["kdialog", "--getexistingdirectory", str(Path.home()), "--title", title],
        ]
    for command in commands:
        try:
            result = subprocess.run(
                command,
                stdin=subprocess.DEVNULL,
                stdout=subprocess.PIPE,
                stderr=subprocess.PIPE,
                text=True,
                encoding="utf-8",
                errors="replace",
                timeout=180,
                shell=False,
                check=False,
            )
        except FileNotFoundError:
            continue
        except subprocess.TimeoutExpired as exc:
            raise GitCommandError("folder_picker_unavailable", "The native folder picker timed out.") from exc
        except OSError as exc:
            raise GitCommandError("folder_picker_unavailable", str(exc)) from exc
        if result.returncode == 0:
            return result.stdout.strip()
        return ""
    try:
        import tkinter as tk
        from tkinter import filedialog
    except Exception as exc:
        raise GitCommandError("folder_picker_unavailable", str(exc)) from exc
    root = None
    try:
        root = tk.Tk()
        root.withdraw()
        try:
            root.attributes("-topmost", True)
        except Exception:
            pass
        selected = filedialog.askdirectory(parent=root, title=title, mustexist=True)
        return str(selected or "")
    except Exception as exc:
        raise GitCommandError("folder_picker_unavailable", str(exc)) from exc
    finally:
        if root is not None:
            try:
                root.destroy()
            except Exception:
                pass


def read_repository_index() -> list[dict[str, str]]:
    try:
        raw = json.loads(REPOSITORY_INDEX.read_text(encoding="utf-8"))
    except (OSError, json.JSONDecodeError, TypeError):
        return []
    if not isinstance(raw, list):
        return []
    entries: list[dict[str, str]] = []
    seen: set[str] = set()
    for item in raw:
        if not isinstance(item, dict) or not isinstance(item.get("path"), str):
            continue
        path = item["path"]
        if path in seen:
            continue
        seen.add(path)
        entries.append({"path": path, "name": str(item.get("name") or Path(path).name or path)})
    return entries[:500]


def write_repository_index(entries: list[dict[str, str]]) -> None:
    DATA_DIR.mkdir(parents=True, exist_ok=True)
    try:
        DATA_DIR.chmod(0o700)
    except OSError:
        pass
    temporary = REPOSITORY_INDEX.with_suffix(".tmp")
    temporary.write_text(json.dumps(entries[:500], ensure_ascii=False, indent=2), encoding="utf-8")
    try:
        temporary.chmod(0o600)
    except OSError:
        pass
    temporary.replace(REPOSITORY_INDEX)


def remember_repository(repo: Path) -> None:
    canonical = str(repo.resolve())
    entries = [{"path": canonical, "name": repo.name}]
    entries.extend(item for item in read_repository_index() if item.get("path") != canonical)
    write_repository_index(entries[:500])


def forget_repository(path: str) -> None:
    entries = [item for item in read_repository_index() if item.get("path") != path]
    write_repository_index(entries)


def recent_repository_list(active_path: str | None = None) -> list[dict[str, Any]]:
    result: list[dict[str, Any]] = []
    for item in read_repository_index():
        raw_path = item["path"]
        row: dict[str, Any] = {
            "path": raw_path,
            "name": item.get("name") or Path(raw_path).name or raw_path,
            "active": raw_path == active_path,
            "available": False,
            "branch": "—",
            "changed_count": 0,
            "remote": False,
        }
        try:
            repo = resolve_repo(raw_path)
            status_result = run_git(repo, ["status", "--porcelain=v1", "-z", "--untracked-files=all"], timeout=10)
            branch_result = run_git(repo, ["rev-parse", "--abbrev-ref", "HEAD"], timeout=10, check=False)
            branch = branch_result.stdout.strip() if branch_result.returncode == 0 else ""
            if not branch or branch == "HEAD":
                head = run_git(repo, ["rev-parse", "--short", "HEAD"], timeout=10, check=False)
                if head.returncode == 0:
                    branch = f"detached · {head.stdout.strip()}"
                else:
                    symbolic = run_git(repo, ["symbolic-ref", "--quiet", "--short", "HEAD"], timeout=10, check=False)
                    branch = symbolic.stdout.strip() if symbolic.returncode == 0 and symbolic.stdout.strip() else "unborn"
            remotes_result = run_git(repo, ["remote"], timeout=10, check=False)
            row.update({
                "path": str(repo),
                "name": repo.name,
                "active": str(repo) == active_path,
                "available": True,
                "branch": branch,
                "changed_count": len(parse_status(status_result.stdout)),
                "remote": bool(remotes_result.stdout.strip()),
            })
        except GitCommandError:
            pass
        result.append(row)
    return result


def safe_remote_display(value: str) -> str:
    value = value.strip()
    try:
        parsed = urlsplit(value)
        port = parsed.port
        if parsed.scheme in {"http", "https"} and parsed.hostname:
            host = parsed.hostname
            if port:
                host = f"{host}:{port}"
            return parsed._replace(netloc=host, query="", fragment="").geturl()
        if parsed.scheme == "ssh" and parsed.hostname:
            host = parsed.hostname
            if port:
                host = f"{host}:{port}"
            if ":" in host and not host.startswith("["):
                host = f"[{host}]"
            username = f"{parsed.username}@" if parsed.username else ""
            return parsed._replace(netloc=f"{username}{host}", query="", fragment="").geturl()
    except ValueError:
        value = re.sub(r"(?i)(https?://|ssh://)[^/@\s]+@", r"\1", value)
        return value.split("?", 1)[0].split("#", 1)[0]
    return re.sub(r"(https?://)[^/@\s]+@", r"\1", value)


def list_remotes(repo: Path) -> list[dict[str, str]]:
    result = run_git(repo, ["remote"], check=False)
    if result.returncode != 0:
        return []
    remotes: list[dict[str, str]] = []
    for name in result.stdout.splitlines():
        name = name.strip()
        if not name:
            continue
        fetch = run_git(repo, ["remote", "get-url", name], check=False)
        push = run_git(repo, ["remote", "get-url", "--push", name], check=False)
        remotes.append({
            "name": name,
            "fetch_url": safe_remote_display(fetch.stdout) if fetch.returncode == 0 else "",
            "push_url": safe_remote_display(push.stdout) if push.returncode == 0 else "",
        })
    return remotes


def valid_remote_url(value: str) -> bool:
    if not value or len(value) > 2048 or any(ch.isspace() for ch in value) or value.startswith("-"):
        return False
    try:
        parsed = urlsplit(value)
        parsed.port
    except ValueError:
        return False
    if parsed.scheme == "https":
        return bool(parsed.hostname and parsed.path and parsed.username is None and parsed.password is None)
    if parsed.scheme == "ssh":
        return bool(parsed.hostname and parsed.path and parsed.password is None)
    return bool(re.fullmatch(r"git@[A-Za-z0-9.-]+:[A-Za-z0-9._/-]+", value))


def valid_remote_name(value: str) -> bool:
    return bool(re.fullmatch(r"[A-Za-z0-9][A-Za-z0-9._-]{0,63}", value)) and not value.endswith(".lock") and ".." not in value


def csrf_valid() -> bool:
    sent = request.headers.get("X-CSRF-Token", "")
    expected = session.get("csrf_token", "")
    return bool(sent and expected and secrets.compare_digest(sent, expected))


def request_json_object() -> dict[str, Any]:
    value = request.get_json(silent=True)
    return value if isinstance(value, dict) else {}


def api_error(code: str, status: int = 400, detail: str = ""):
    payload: dict[str, Any] = {"ok": False, "code": code}
    if detail:
        payload["detail"] = detail[:1600]
    return jsonify(payload), status


def _status_label(code: str) -> str:
    if "?" in code:
        return "untracked"
    if "U" in code:
        return "conflict"
    if "D" in code:
        return "deleted"
    if "R" in code:
        return "renamed"
    if "C" in code:
        return "copied"
    if "A" in code:
        return "added"
    if "M" in code or "T" in code:
        return "modified"
    return "changed"


def parse_status(raw: str) -> list[dict[str, str]]:
    parts = raw.split("\0")
    files: list[dict[str, str]] = []
    index = 0
    while index < len(parts):
        item = parts[index]
        index += 1
        if not item:
            continue
        if len(item) < 4:
            continue
        xy = item[:2]
        path = item[3:]
        state = _status_label(xy)
        if "R" in xy or "C" in xy:
            if index < len(parts) and parts[index]:
                old_path = parts[index]
                index += 1
                path = f"{old_path} → {path}"
        files.append({"path": path, "xy": xy, "state": state})
    return files


def repo_status(repo: Path) -> dict[str, Any]:
    status_result = run_git(repo, ["status", "--porcelain=v1", "-z", "--untracked-files=all"])
    branch_result = run_git(repo, ["rev-parse", "--abbrev-ref", "HEAD"], check=False)
    branch = branch_result.stdout.strip() if branch_result.returncode == 0 else ""
    if not branch or branch == "HEAD":
        head = run_git(repo, ["rev-parse", "--short", "HEAD"], check=False)
        if head.returncode == 0:
            branch = f"detached · {head.stdout.strip()}"
        else:
            symbolic = run_git(repo, ["symbolic-ref", "--quiet", "--short", "HEAD"], check=False)
            branch = symbolic.stdout.strip() if symbolic.returncode == 0 and symbolic.stdout.strip() else "unborn"
    remotes = list_remotes(repo)
    remote = bool(remotes)
    last_result = run_git(repo, ["log", "-1", "--pretty=%h%x00%s"], check=False)
    last_commit = None
    if last_result.returncode == 0 and last_result.stdout.strip():
        fields = last_result.stdout.rstrip("\n").split("\0", 1)
        last_commit = {"hash": fields[0], "subject": fields[1] if len(fields) > 1 else ""}
    files = parse_status(status_result.stdout)
    return {
        "ok": True,
        "repository": str(repo),
        "repository_name": repo.name,
        "branch": branch,
        "remote": remote,
        "remotes": remotes,
        "files": files,
        "changed_count": len(files),
        "last_commit": last_commit,
    }


DOCUMENTATION_EXTENSIONS = {".md", ".mdx", ".rst", ".txt", ".adoc", ".asciidoc"}


def _mask_quoted_strings(line: str) -> str:
    masked = list(line)
    quote = None
    escaped = False
    for index, character in enumerate(line):
        if quote is not None:
            masked[index] = " "
            if escaped:
                escaped = False
            elif character == "\\":
                escaped = True
            elif character == quote:
                quote = None
        elif character in {"'", '"', "`"}:
            quote = character
            masked[index] = " "
    return "".join(masked)


def _scan_lines(file_path: str, lines: list[tuple[int, str]]) -> list[dict[str, Any]]:
    findings: list[dict[str, Any]] = []
    is_documentation = Path(file_path).suffix.lower() in DOCUMENTATION_EXTENSIONS
    for line_number, line in lines:
        if not is_documentation:
            executable_text = _mask_quoted_strings(line)
            for kind, pattern in DEBUG_PATTERNS:
                if pattern.search(executable_text):
                    findings.append({"kind": kind, "file": file_path, "line": line_number})
        for kind, pattern in SECRET_PATTERNS:
            if pattern.search(line):
                findings.append({"kind": kind, "file": file_path, "line": line_number})
    return findings


def _scan_diff_text(diff_text: str) -> list[dict[str, Any]]:
    findings: list[dict[str, Any]] = []
    current_file = "unknown"
    new_line = 0
    in_hunk = False
    for line in diff_text.splitlines():
        if line.startswith("+++ b/"):
            current_file = line[6:]
            in_hunk = False
            continue
        if line.startswith("+++ "):
            in_hunk = False
            continue
        if line.startswith("@@"):
            match = re.search(r"\+(\d+)(?:,(\d+))?", line)
            new_line = int(match.group(1)) if match else 0
            in_hunk = True
            continue
        if not in_hunk:
            continue
        if line.startswith("+") and not line.startswith("+++"):
            findings.extend(_scan_lines(current_file, [(new_line, line[1:])]))
            new_line += 1
        elif line.startswith(" "):
            new_line += 1
    return findings


def lint_changes(repo: Path, staged_only: bool = False) -> list[dict[str, Any]]:
    commands = [["diff", "--no-ext-diff", "--no-color", "--unified=0", "--no-renames", "--no-textconv"]]
    if staged_only:
        commands = [["diff", "--cached", "--no-ext-diff", "--no-color", "--unified=0", "--no-renames", "--no-textconv"]]
    diffs: list[str] = []
    for args in commands:
        result = run_git(repo, args, timeout=30)
        diffs.append(result.stdout)
    if not staged_only:
        cached = run_git(repo, ["diff", "--cached", "--no-ext-diff", "--no-color", "--unified=0", "--no-renames", "--no-textconv"], timeout=30)
        diffs.append(cached.stdout)
    findings: list[dict[str, Any]] = []
    for diff_text in diffs:
        findings.extend(_scan_diff_text(diff_text))
    if not staged_only:
        untracked_result = run_git(repo, ["ls-files", "--others", "--exclude-standard", "-z"], timeout=20)
        for relative_name in untracked_result.stdout.split("\0"):
            if not relative_name:
                continue
            candidate = repo / relative_name
            try:
                if candidate.is_symlink() or not candidate.is_file():
                    continue
                if candidate.stat().st_size > MAX_SCAN_FILE_SIZE:
                    findings.append({"kind": "file_too_large", "file": relative_name, "line": 0})
                    continue
                raw = candidate.read_bytes()
            except OSError:
                findings.append({"kind": "file_unreadable", "file": relative_name, "line": 0})
                continue
            if b"\0" in raw:
                continue
            content = raw.decode("utf-8", errors="replace")
            lines = [(line_number, line) for line_number, line in enumerate(content.splitlines(), 1)]
            findings.extend(_scan_lines(relative_name, lines))
    unique: dict[tuple[str, str, int], dict[str, Any]] = {}
    for finding in findings:
        key = (finding["kind"], finding["file"], finding["line"])
        unique[key] = finding
    return list(unique.values())[:MAX_FINDINGS]


def validate_commit_message(commit_type: str, description: str) -> str | None:
    if commit_type not in ALLOWED_TYPES:
        return "invalid_commit_type"
    if not description or description != description.strip():
        return "invalid_commit_description"
    if len(description) < 5:
        return "commit_description_too_short"
    if "\n" in description or "\r" in description or any(ord(ch) < 32 for ch in description):
        return "invalid_commit_description"
    if description.endswith("."):
        return "commit_description_period"
    full_message = f"{commit_type}: {description}"
    if len(full_message) > 72:
        return "commit_message_too_long"
    return None


@app.before_request
def protect_local_server():
    try:
        host = (urlsplit(f"//{request.host}").hostname or "").lower()
    except ValueError:
        host = ""
    if host not in {"127.0.0.1", "localhost", "::1"}:
        return jsonify({"ok": False, "code": "local_only"}), 403
    if request.remote_addr not in {"127.0.0.1", "::1", "localhost", None}:
        return jsonify({"ok": False, "code": "local_only"}), 403
    if request.method == "POST" and not csrf_valid():
        return jsonify({"ok": False, "code": "csrf_invalid"}), 403
    if request.method in {"GET", "HEAD"} and "csrf_token" not in session:
        session["csrf_token"] = secrets.token_urlsafe(32)
    return None


@app.after_request
def add_security_headers(response):
    response.headers["X-Content-Type-Options"] = "nosniff"
    response.headers["X-Frame-Options"] = "DENY"
    response.headers["Referrer-Policy"] = "no-referrer"
    response.headers["Cache-Control"] = "no-store"
    return response


@app.get("/")
def index():
    return redirect(url_for("dashboard_page"))


def template_repo() -> tuple[Path | None, dict[str, Any] | None]:
    try:
        repo = active_repo()
        known = {item.get("path") for item in read_repository_index()}
        if str(repo) not in known:
            remember_repository(repo)
        if not read_active_repository():
            write_active_repository(str(repo))
        return repo, repo_status(repo)
    except GitCommandError:
        return None, None


def repository_activity(repo: Path, limit: int = 40) -> list[dict[str, str]]:
    limit = max(1, min(int(limit), 100))
    result = run_git(
        repo,
        ["log", f"-{limit}", "--date=iso-strict", "--format=%h%x1f%an%x1f%ae%x1f%ad%x1f%s"],
        check=False,
        timeout=15,
    )
    if result.returncode != 0:
        return []
    items: list[dict[str, str]] = []
    for raw in result.stdout.splitlines():
        fields = raw.split("\x1f", 4)
        if len(fields) != 5:
            continue
        items.append({"hash": fields[0], "author": fields[1], "email": fields[2], "date": fields[3], "subject": fields[4]})
    return items


@app.get("/dashboard")
def dashboard_page():
    repo, status = template_repo()
    active_path = str(repo) if repo else None
    projects = recent_repository_list(active_path)
    return render_template(
        "dashboard.html",
        page="dashboard",
        page_title="Overview",
        projects=projects,
        active_status=status,
        activity=repository_activity(repo, 8) if repo else [],
        csrf_token=session["csrf_token"],
    )


@app.get("/projects")
def projects_page():
    repo, _ = template_repo()
    projects = recent_repository_list(str(repo) if repo else None)
    return render_template("projects.html", page="projects", page_title="Projects", projects=projects, csrf_token=session["csrf_token"])


@app.get("/workspace")
def workspace_page():
    repo, status = template_repo()
    return render_template("workspace.html", page="workspace", page_title="Workspace", active_status=status, csrf_token=session["csrf_token"])


@app.get("/activity")
def activity_page():
    repo, status = template_repo()
    activity = repository_activity(repo, 60) if repo else []
    github_project = github_project_from_repo(repo)
    return render_template("activity.html", page="activity", page_title="Activity", active_status=status, activity=activity, github_project=github_project, csrf_token=session["csrf_token"])


def github_project_from_repo(repo: Path | None) -> dict[str, str] | None:
    if repo is None:
        return None
    result = run_git(repo, ["remote"], check=False)
    names = [line.strip() for line in result.stdout.splitlines() if line.strip()]
    names.sort(key=lambda name: (name != "origin", name))
    patterns = (
        re.compile(r"^https://github\.com/([^/]+)/([^/#?]+?)(?:\.git)?/?$", re.IGNORECASE),
        re.compile(r"^ssh://git@github\.com/([^/]+)/([^/#?]+?)(?:\.git)?/?$", re.IGNORECASE),
        re.compile(r"^git@github\.com:([^/]+)/([^/#?]+?)(?:\.git)?$", re.IGNORECASE),
    )
    for name in names:
        remote = run_git(repo, ["remote", "get-url", name], check=False)
        if remote.returncode != 0:
            continue
        value = remote.stdout.strip()
        for pattern in patterns:
            match = pattern.fullmatch(value)
            if match:
                owner, repository = match.groups()
                return {"owner": owner, "repo": repository, "full_name": f"{owner}/{repository}", "remote": name}
    return None


class GitHubAPIError(RuntimeError):
    def __init__(self, status: int, code: str, message: str = "") -> None:
        super().__init__(code)
        self.status = status
        self.code = code
        self.message = message[:600]


def stored_github_token() -> str:
    try:
        config = json.loads(GITHUB_CONFIG.read_text(encoding="utf-8"))
    except (OSError, json.JSONDecodeError, TypeError):
        return ""
    token = config.get("token", "") if isinstance(config, dict) else ""
    return token if isinstance(token, str) else ""


@app.context_processor
def inject_layout_context() -> dict[str, Any]:
    return {
        "registered_project_count": len(read_repository_index()),
        "github_token_present": bool(stored_github_token()),
    }


def save_github_token(token: str) -> None:
    DATA_DIR.mkdir(parents=True, exist_ok=True)
    try:
        DATA_DIR.chmod(0o700)
    except OSError:
        pass
    temporary = GITHUB_CONFIG.with_suffix(".tmp")
    temporary.write_text(json.dumps({"token": token}, ensure_ascii=False), encoding="utf-8")
    try:
        temporary.chmod(0o600)
    except OSError:
        pass
    temporary.replace(GITHUB_CONFIG)
    try:
        GITHUB_CONFIG.chmod(0o600)
    except OSError:
        pass


def github_clone_environment() -> dict[str, str]:
    env = _git_env()
    token = stored_github_token()
    if not token:
        return env
    try:
        index = max(0, int(env.get("GIT_CONFIG_COUNT", "0")))
    except ValueError:
        index = 0
    authorization = base64.b64encode(f"x-access-token:{token}".encode("utf-8")).decode("ascii")
    env["GIT_CONFIG_COUNT"] = str(index + 1)
    env[f"GIT_CONFIG_KEY_{index}"] = "http.https://github.com/.extraheader"
    env[f"GIT_CONFIG_VALUE_{index}"] = f"AUTHORIZATION: basic {authorization}"
    return env


def github_api(path: str, method: str = "GET", payload: dict[str, Any] | None = None, token_override: str | None = None) -> Any:
    token = stored_github_token() if token_override is None else token_override
    if not token:
        raise GitHubAPIError(401, "github_not_connected", "Connect a GitHub personal access token first.")
    body = json.dumps(payload).encode("utf-8") if payload is not None else None
    req = urllib.request.Request(
        "https://api.github.com" + path,
        data=body,
        method=method,
        headers={
            "Accept": "application/vnd.github+json",
            "Authorization": f"Bearer {token}",
            "X-GitHub-Api-Version": "2022-11-28",
            "User-Agent": "GitFlow-Manager",
            "Content-Type": "application/json",
        },
    )
    try:
        with urllib.request.urlopen(req, timeout=12) as response:
            raw = response.read(2 * 1024 * 1024)
            if not raw:
                return {"status": response.status}
            return json.loads(raw.decode("utf-8", errors="replace"))
    except urllib.error.HTTPError as exc:
        try:
            raw_error = exc.read(8192).decode("utf-8", errors="replace")
            parsed = json.loads(raw_error) if raw_error else {}
            message = parsed.get("message", "") if isinstance(parsed, dict) else ""
        except (OSError, json.JSONDecodeError):
            message = ""
        if exc.code == 401:
            code = "github_token_invalid"
        elif exc.code == 403:
            code = "github_permission_denied"
        elif exc.code == 404:
            code = "github_resource_not_found"
        elif exc.code == 422:
            code = "github_validation_failed"
        elif exc.code == 409:
            code = "github_conflict"
        else:
            code = "github_api_error"
        raise GitHubAPIError(exc.code, code, message) from exc
    except (urllib.error.URLError, TimeoutError, OSError) as exc:
        raise GitHubAPIError(503, "github_network_error", str(exc)) from exc
    except json.JSONDecodeError as exc:
        raise GitHubAPIError(502, "github_response_invalid", "GitHub returned an unreadable response.") from exc


def github_remote_context() -> dict[str, str] | None:
    repo, _ = template_repo()
    return github_project_from_repo(repo)


@app.get("/collaborators")
def collaborators_page():
    _, status = template_repo()
    context = github_remote_context()
    return render_template("collaborators.html", page="collaborators", page_title="Collaborators", active_status=status, github_project=context, csrf_token=session["csrf_token"])


@app.get("/account")
def account_page():
    _, status = template_repo()
    return render_template("account.html", page="account", page_title="Git Account", active_status=status, csrf_token=session["csrf_token"])


@app.get("/settings")
def settings_page():
    _, status = template_repo()
    return render_template("settings.html", page="settings", page_title="Settings", active_status=status, csrf_token=session["csrf_token"])


@app.get("/api/status")
def status_api():
    try:
        repo = active_repo()
        session["repo_path"] = str(repo)
        session.pop("repo_disconnected", None)
        return jsonify(repo_status(repo))
    except GitCommandError as exc:
        return api_error(str(exc), 400, exc.detail)


@app.post("/api/repository")
def repository_api():
    data = request_json_object()
    raw_path = data.get("path")
    if not isinstance(raw_path, str):
        return api_error("repository_path_invalid", 400)
    try:
        repo = resolve_repo(raw_path)
        session["repo_path"] = str(repo)
        session.pop("repo_disconnected", None)
        remember_repository(repo)
        write_active_repository(str(repo))
        return jsonify(repo_status(repo))
    except GitCommandError as exc:
        return api_error(str(exc), 400, exc.detail)


@app.post("/api/browse")
def browse_repository_api():
    try:
        selected = open_folder_dialog()
        if not selected:
            return api_error("folder_selection_cancelled", 400)
        try:
            candidate = Path(selected).expanduser().resolve(strict=True)
        except (OSError, RuntimeError) as exc:
            raise GitCommandError("repository_path_invalid") from exc
        if not candidate.is_dir():
            raise GitCommandError("repository_path_invalid")
        try:
            repo = resolve_repo(str(candidate))
        except GitCommandError as exc:
            if str(exc) != "repository_not_initialized":
                raise
            return jsonify({
                "ok": False,
                "code": "repository_not_initialized",
                "selected_path": str(candidate),
                "nested_repositories": discover_nested_repositories(candidate),
            }), 409
        session["repo_path"] = str(repo)
        session.pop("repo_disconnected", None)
        remember_repository(repo)
        write_active_repository(str(repo))
        return jsonify(repo_status(repo))
    except GitCommandError as exc:
        return api_error(str(exc), 400, exc.detail)


@app.post("/api/repository/initialize")
def initialize_repository_api():
    data = request_json_object()
    raw_path = data.get("path")
    if not isinstance(raw_path, str) or not raw_path.strip():
        return api_error("repository_path_invalid", 400)
    try:
        try:
            candidate = Path(raw_path.strip()).expanduser().resolve(strict=True)
        except (OSError, RuntimeError) as exc:
            raise GitCommandError("repository_path_invalid") from exc
        if not candidate.is_dir():
            raise GitCommandError("repository_path_invalid")
        try:
            repo = resolve_repo(str(candidate))
            initialized = False
        except GitCommandError as exc:
            if str(exc) != "repository_not_initialized":
                raise
            result = run_git(candidate, ["init"], timeout=30, check=False)
            if result.returncode != 0:
                raise GitCommandError("git_command_failed", result.stderr or result.stdout) from None
            repo = resolve_repo(str(candidate))
            initialized = True
        session["repo_path"] = str(repo)
        session.pop("repo_disconnected", None)
        remember_repository(repo)
        write_active_repository(str(repo))
        result = repo_status(repo)
        result["initialized"] = initialized
        return jsonify(result)
    except GitCommandError as exc:
        return api_error(str(exc), 400, exc.detail)


@app.get("/api/repositories")
def repositories_api():
    return jsonify({"ok": True, "repositories": recent_repository_list(current_active_path())})


@app.post("/api/repositories/remove")
def remove_repository_api():
    data = request_json_object()
    raw_path = data.get("path")
    if not isinstance(raw_path, str) or not raw_path.strip():
        return api_error("repository_path_invalid", 400)
    try:
        canonical = str(Path(raw_path).expanduser().resolve(strict=True))
    except (OSError, RuntimeError):
        canonical = raw_path
    session_path = session.get("repo_path") if not session.get("repo_disconnected") else ""
    persisted_path = read_active_repository()
    if session_path:
        try:
            session_canonical = str(Path(session_path).expanduser().resolve(strict=True))
        except (OSError, RuntimeError):
            session_canonical = session_path
        if session_canonical == canonical:
            session.pop("repo_path", None)
            session["repo_disconnected"] = True
    if persisted_path:
        try:
            persisted_canonical = str(Path(persisted_path).expanduser().resolve(strict=True))
        except (OSError, RuntimeError):
            persisted_canonical = persisted_path
        if persisted_canonical == canonical:
            write_active_repository(None)
    forget_repository(canonical)
    active_for_response = None if session.get("repo_disconnected") else current_active_path()
    return jsonify({"ok": True, "repositories": recent_repository_list(active_for_response)})


@app.post("/api/disconnect")
def disconnect_repository_api():
    session.pop("repo_path", None)
    session["repo_disconnected"] = True
    write_active_repository(None)
    return jsonify({"ok": True, "code": "repository_disconnected"})


@app.post("/api/remote")
def remote_api():
    data = request_json_object()
    action = data.get("action")
    name = data.get("name", "")
    if not isinstance(name, str) or not valid_remote_name(name):
        return api_error("invalid_remote_name", 400)
    try:
        repo = active_repo()
        remotes_result = run_git(repo, ["remote"], check=False)
        existing = {item.strip() for item in remotes_result.stdout.splitlines() if item.strip()}
        if action == "remove":
            if name not in existing:
                return api_error("remote_not_found", 404)
            run_git(repo, ["remote", "remove", name])
            return jsonify({"ok": True, "code": "remote_removed", "status": repo_status(repo)})
        if action != "save":
            return api_error("invalid_remote_action", 400)
        url = data.get("url", "")
        if not isinstance(url, str) or not valid_remote_url(url.strip()):
            return api_error("invalid_remote_url", 400)
        if name in existing:
            run_git(repo, ["remote", "set-url", name, url.strip()])
        else:
            run_git(repo, ["remote", "add", name, url.strip()])
        return jsonify({"ok": True, "code": "remote_saved", "status": repo_status(repo)})
    except GitCommandError as exc:
        status_code = 504 if str(exc) == "git_timeout" else 400
        return api_error(str(exc), status_code, exc.detail)


@app.post("/api/commit-push")
def commit_push_api():
    data = request_json_object()
    commit_type = data.get("type", "")
    description = data.get("description", "")
    if not isinstance(commit_type, str) or not isinstance(description, str):
        return api_error("invalid_commit_description", 400)
    validation_error = validate_commit_message(commit_type, description)
    if validation_error:
        return api_error(validation_error, 400)
    try:
        repo = active_repo()
        remotes = run_git(repo, ["remote"], check=False)
        if remotes.returncode != 0 or not remotes.stdout.strip():
            return api_error("remote_not_configured", 409)
        findings = lint_changes(repo)
        if findings:
            return jsonify({"ok": False, "code": "lint_failed", "findings": findings}), 422
        run_git(repo, ["add", "."], timeout=45)
        staged_findings = lint_changes(repo, staged_only=True)
        if staged_findings:
            return jsonify({"ok": False, "code": "lint_failed", "findings": staged_findings}), 422
        staged_diff = run_git(repo, ["diff", "--cached", "--quiet"], check=False)
        if staged_diff.returncode == 0:
            if not has_unpushed_commits(repo):
                return api_error("nothing_to_commit", 409)
            try:
                push_result = push_repository(repo)
            except GitCommandError as exc:
                status_code = 504 if str(exc) == "git_timeout" else 502
                return jsonify({
                    "ok": False,
                    "code": "push_failed_after_commit",
                    "commit_created": True,
                    "commit_output": "",
                    "detail": exc.detail or str(exc),
                }), status_code
            return jsonify({
                "ok": True,
                "code": "push_existing_success",
                "message": "Existing local commits pushed successfully.",
                "commit_output": "",
                "push_output": push_result.stdout.strip()[:1200] or push_result.stderr.strip()[:1200],
                "status": repo_status(repo),
            })
        message = f"{commit_type}: {description.strip()}"
        commit_result = run_git(repo, ["commit", "-m", message], timeout=60)
        try:
            push_result = push_repository(repo)
        except GitCommandError as exc:
            status_code = 504 if str(exc) == "git_timeout" else 502
            return jsonify({
                "ok": False,
                "code": "push_failed_after_commit",
                "commit_created": True,
                "commit_output": commit_result.stdout.strip()[:1200],
                "detail": exc.detail or str(exc),
            }), status_code
        return jsonify({
            "ok": True,
            "code": "commit_push_success",
            "message": message,
            "commit_output": commit_result.stdout.strip()[:1200],
            "push_output": push_result.stdout.strip()[:1200] or push_result.stderr.strip()[:1200],
            "status": repo_status(repo),
        })
    except GitCommandError as exc:
        status_code = 504 if str(exc) == "git_timeout" else 400
        return api_error(str(exc), status_code, exc.detail)



@app.post("/api/lint")
def lint_api():
    try:
        repo = active_repo()
        findings = lint_changes(repo)
        return jsonify({"ok": True, "findings": findings, "count": len(findings)})
    except GitCommandError as exc:
        return api_error(str(exc), 400, exc.detail)


@app.get("/api/activity")
def activity_api():
    try:
        repo = active_repo()
        return jsonify({"ok": True, "activity": repository_activity(repo, (request.args.get("limit", 40, type=int) or 40))})
    except GitCommandError as exc:
        return api_error(str(exc), 400, exc.detail)


@app.get("/api/overview")
def overview_api():
    active_path = current_active_path()
    projects = recent_repository_list(active_path)
    try:
        profile = github_api("/user")
        account = {"connected": True, "login": profile.get("login", ""), "avatar_url": profile.get("avatar_url", ""), "html_url": profile.get("html_url", "")}
    except GitHubAPIError as exc:
        account = {"connected": False, "code": exc.code}
    active_repo_path, active_status = template_repo()
    return jsonify({
        "ok": True,
        "project_count": len(projects),
        "available_project_count": sum(1 for project in projects if project["available"]),
        "changed_count": active_status["changed_count"] if active_status else 0,
        "active_project": active_status["repository_name"] if active_status else "",
        "active_branch": active_status["branch"] if active_status else "",
        "projects": projects,
        "github": account,
        "activity": repository_activity(active_repo_path, 8) if active_repo_path else [],
    })


def _github_error_response(exc: GitHubAPIError):
    payload: dict[str, Any] = {"ok": False, "code": exc.code}
    if exc.message:
        payload["detail"] = exc.message
    return jsonify(payload), exc.status if 400 <= exc.status < 600 else 502


@app.get("/api/github/status")
def github_status_api():
    if not stored_github_token():
        return jsonify({"ok": True, "connected": False, "profile": None})
    try:
        profile = github_api("/user")
        return jsonify({"ok": True, "connected": True, "profile": {
            "login": profile.get("login", ""),
            "name": profile.get("name") or profile.get("login", ""),
            "avatar_url": profile.get("avatar_url", ""),
            "html_url": profile.get("html_url", ""),
            "public_repos": profile.get("public_repos", 0),
            "total_private_repos": profile.get("total_private_repos", 0),
            "company": profile.get("company") or "",
            "bio": profile.get("bio") or "",
            "email": profile.get("email") or "",
        }})
    except GitHubAPIError as exc:
        return _github_error_response(exc)


@app.post("/api/github/connect")
def github_connect_api():
    data = request_json_object()
    token = data.get("token", "")
    if not isinstance(token, str) or not 20 <= len(token.strip()) <= 300 or any(ch.isspace() for ch in token.strip()):
        return api_error("github_token_invalid_format", 400)
    token = token.strip()
    try:
        profile = github_api("/user", token_override=token)
        save_github_token(token)
        return jsonify({"ok": True, "connected": True, "profile": {
            "login": profile.get("login", ""),
            "name": profile.get("name") or profile.get("login", ""),
            "avatar_url": profile.get("avatar_url", ""),
            "html_url": profile.get("html_url", ""),
            "public_repos": profile.get("public_repos", 0),
            "total_private_repos": profile.get("total_private_repos", 0),
            "company": profile.get("company") or "",
            "bio": profile.get("bio") or "",
            "email": profile.get("email") or "",
        }})
    except GitHubAPIError as exc:
        return _github_error_response(exc)


@app.post("/api/github/disconnect")
def github_disconnect_api():
    save_github_token("")
    try:
        GITHUB_CONFIG.unlink(missing_ok=True)
    except OSError:
        pass
    return jsonify({"ok": True, "connected": False})


@app.get("/api/github/repos")
def github_repositories_api():
    try:
        repos: list[dict[str, Any]] = []
        for page in range(1, 11):
            items = github_api(f"/user/repos?per_page=100&sort=updated&affiliation=owner,collaborator,organization&page={page}")
            if not isinstance(items, list):
                raise GitHubAPIError(502, "github_response_invalid", "Repository list was not an array.")
            for item in items:
                repos.append({
                    "id": item.get("id"),
                    "name": item.get("name", ""),
                    "full_name": item.get("full_name", ""),
                    "description": item.get("description") or "",
                    "private": bool(item.get("private")),
                    "html_url": item.get("html_url", ""),
                    "clone_url": item.get("clone_url", ""),
                    "ssh_url": item.get("ssh_url", ""),
                    "default_branch": item.get("default_branch", "main"),
                    "updated_at": item.get("updated_at", ""),
                    "language": item.get("language") or "",
                    "permissions": item.get("permissions") or {},
                    "owner": (item.get("owner") or {}).get("login", ""),
                })
            if len(items) < 100:
                break
        return jsonify({"ok": True, "repositories": repos})
    except GitHubAPIError as exc:
        return _github_error_response(exc)


def _active_github_project_or_error():
    repo, _ = template_repo()
    if repo is None:
        return None, api_error("repository_not_selected", 400)
    project = github_project_from_repo(repo)
    if project is None:
        return None, api_error("github_remote_not_found", 409)
    return project, None


@app.get("/api/github/activity")
def github_activity_api():
    project, error = _active_github_project_or_error()
    if error:
        return error
    try:
        items = github_api(f"/repos/{quote(project['owner'], safe='')}/{quote(project['repo'], safe='')}/commits?per_page=50")
        activity: list[dict[str, str]] = []
        for item in items if isinstance(items, list) else []:
            commit = item.get("commit") or {}
            author = item.get("author") or {}
            commit_author = commit.get("author") or {}
            activity.append({
                "hash": str(item.get("sha", ""))[:7],
                "author": author.get("login") or commit_author.get("name") or "Unknown",
                "email": commit_author.get("email") or "",
                "date": commit_author.get("date") or "",
                "subject": str(commit.get("message", "")).splitlines()[0] if commit.get("message") else "",
                "url": item.get("html_url", ""),
            })
        return jsonify({"ok": True, "project": project, "activity": activity})
    except GitHubAPIError as exc:
        return _github_error_response(exc)


@app.get("/api/github/collaborators")
def github_collaborators_api():
    project, error = _active_github_project_or_error()
    if error:
        return error
    try:
        path = f"/repos/{quote(project['owner'], safe='')}/{quote(project['repo'], safe='')}/collaborators?per_page=100"
        people = github_api(path)
        collaborators = []
        for person in people if isinstance(people, list) else []:
            collaborators.append({
                "login": person.get("login", ""),
                "avatar_url": person.get("avatar_url", ""),
                "html_url": person.get("html_url", ""),
                "role": (person.get("role_name") or (person.get("permissions") or {}).get("admin") and "admin" or (person.get("permissions") or {}).get("push") and "write" or (person.get("permissions") or {}).get("pull") and "read" or "read"),
                "permissions": person.get("permissions") or {},
                "site_admin": bool(person.get("site_admin")),
            })
        return jsonify({"ok": True, "project": project, "collaborators": collaborators})
    except GitHubAPIError as exc:
        return _github_error_response(exc)


@app.post("/api/github/collaborators")
def github_collaborator_update_api():
    data = request_json_object()
    action = data.get("action", "invite")
    username = data.get("username", "")
    permission = data.get("permission", "push")
    if not isinstance(username, str) or not re.fullmatch(r"[A-Za-z0-9-]{1,39}", username):
        return api_error("github_username_invalid", 400)
    if not isinstance(action, str) or action not in {"invite", "remove"}:
        return api_error("github_collaborator_action_invalid", 400)
    if action == "invite" and (not isinstance(permission, str) or permission not in {"pull", "triage", "push", "maintain", "admin"}):
        return api_error("github_permission_invalid", 400)
    project, error = _active_github_project_or_error()
    if error:
        return error
    path = f"/repos/{quote(project['owner'], safe='')}/{quote(project['repo'], safe='')}/collaborators/{quote(username, safe='')}"
    try:
        if action == "remove":
            github_api(path, method="DELETE")
            return jsonify({"ok": True, "code": "github_collaborator_removed", "project": project})
        result = github_api(path, method="PUT", payload={"permission": permission})
        return jsonify({"ok": True, "code": "github_collaborator_invited", "result": result, "project": project})
    except GitHubAPIError as exc:
        return _github_error_response(exc)


@app.post("/api/github/clone")
def github_clone_api():
    data = request_json_object()
    clone_url = data.get("clone_url", "")
    if not isinstance(clone_url, str) or not re.fullmatch(r"https://github\.com/[A-Za-z0-9][A-Za-z0-9-]{0,38}/[A-Za-z0-9][A-Za-z0-9._-]{0,99}\.git", clone_url):
        return api_error("github_clone_url_invalid", 400)
    repo_name = clone_url.rstrip("/").rsplit("/", 1)[-1][:-4]
    if repo_name in {".", ".."} or ".." in repo_name or repo_name.endswith("."):
        return api_error("github_clone_url_invalid", 400)
    try:
        parent = open_folder_dialog("GitFlow Manager - Select clone destination")
        if not parent:
            return api_error("folder_selection_cancelled", 400)
        parent_path = Path(parent).expanduser().resolve(strict=True)
        if not parent_path.is_dir():
            return api_error("clone_target_invalid", 400)
        target = parent_path / repo_name
        if target.exists():
            return api_error("clone_target_exists", 409)
        try:
            result = subprocess.run(
                ["git", "clone", "--no-checkout", "--", clone_url, str(target)],
                cwd=str(parent_path),
                env=github_clone_environment(),
                stdin=subprocess.DEVNULL,
                stdout=subprocess.PIPE,
                stderr=subprocess.PIPE,
                text=True,
                encoding="utf-8",
                errors="replace",
                timeout=180,
                shell=False,
                check=False,
            )
        except (OSError, subprocess.TimeoutExpired) as exc:
            return api_error("git_clone_failed", 502, str(exc))
        if result.returncode != 0:
            import shutil
            shutil.rmtree(target, ignore_errors=True)
            return api_error("git_clone_failed", 502, result.stderr or result.stdout)
        repo = resolve_repo(str(target))
        remote_head = run_git(repo, ["symbolic-ref", "--quiet", "--short", "refs/remotes/origin/HEAD"], check=False)
        branch_name = remote_head.stdout.strip().removeprefix("origin/") if remote_head.returncode == 0 else ""
        if not branch_name:
            head_branch = run_git(repo, ["symbolic-ref", "--quiet", "--short", "HEAD"], check=False)
            candidate = head_branch.stdout.strip()
            if candidate and run_git(repo, ["show-ref", "--verify", f"refs/remotes/origin/{candidate}"], check=False).returncode == 0:
                branch_name = candidate
        if not branch_name:
            branch_refs = run_git(repo, ["for-each-ref", "--format=%(refname:short)", "refs/remotes/origin"], check=False)
            branches = [item.removeprefix("origin/") for item in branch_refs.stdout.splitlines() if item.startswith("origin/") and item != "origin/HEAD"]
            if len(branches) == 1:
                branch_name = branches[0]
        if branch_name:
            checkout_args = ["checkout", "--force", "-B", branch_name, "--track", f"origin/{branch_name}"]
        else:
            import shutil
            shutil.rmtree(target, ignore_errors=True)
            return api_error("git_clone_failed", 502, "The remote repository does not advertise a default branch.")
        checkout = run_git(repo, checkout_args, timeout=90, check=False)
        if checkout.returncode != 0:
            import shutil
            shutil.rmtree(target, ignore_errors=True)
            return api_error("git_clone_failed", 502, checkout.stderr or checkout.stdout)
        session["repo_path"] = str(repo)
        session.pop("repo_disconnected", None)
        remember_repository(repo)
        write_active_repository(str(repo))
        return jsonify({"ok": True, "status": repo_status(repo), "repositories": recent_repository_list(str(repo))})
    except GitCommandError as exc:
        return api_error(str(exc), 400, exc.detail)
    except OSError as exc:
        return api_error("clone_target_invalid", 400, str(exc))


if __name__ == "__main__":
    port = int(os.environ.get("GITFLOW_PORT", "5000"))
    app.run(host="127.0.0.1", port=port, debug=False, threaded=True)
