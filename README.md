<div align="center">

# GitFlow Manager

### Your local Git command center — from project switching to safer commits.

**Projelerini tek bir yerden yönet. Değişikliklerini incele. Göndermeden önce kalite kontrolünden geçir.**

<p>
  <img alt="Python 3.10+" src="https://img.shields.io/badge/Python-3.10%2B-3776AB?logo=python&logoColor=white">
  <img alt="Flask 3.0.0" src="https://img.shields.io/badge/Flask-3.0.0-000000?logo=flask&logoColor=white">
  <img alt="Git" src="https://img.shields.io/badge/Git-integrated-F05032?logo=git&logoColor=white">
  <img alt="Languages Turkish and English" src="https://img.shields.io/badge/Languages-TR%20%2F%20EN-6C5CE7">
  <img alt="License MIT" src="https://img.shields.io/badge/License-MIT-2EA44F.svg">
</p>

**Türkçe** · [English](#english)

</div>

---

## 🇹🇷 Türkçe

GitFlow Manager, yerel Git depolarını ve GitHub iş akışlarını modern, çok sayfalı bir web yönetim panelinden yönetmeye yardımcı olan açık kaynaklı bir geliştirici aracıdır. Sık kullanılan işlemleri terminal komutlarını ezberlemeden yürütürken değişiklikleri incelemeyi ve commit öncesi temel kalite kontrollerini tek bir akışta bir araya getirir.

> **Temel yaklaşım:** Git projen bilgisayarında kalır. GitFlow Manager yerel çalışma alanını yönetir; GitHub özellikleri yalnızca sen hesabını bağladığında ve gerekli erişim izinleri bulunduğunda etkinleşir.

### ✨ Öne çıkanlar

- **Çok sayfalı yönetim paneli:** Kontrol Paneli, Projeler, Çalışma Alanı, Aktivite, Proje Ortakları, Git Hesabı ve Ayarlar.
- **Birden fazla depo:** Yerel Git depolarını işletim sisteminin klasör seçicisiyle bağla, kayıtlı projeler arasında geçiş yap ve aktif projeyi görüntüle.
- **Git durumunu görsel takip:** Aktif dal, son commit, remote bağlantıları ve değiştirilen/eklenen/silinen dosyalar.
- **Commit öncesi kalite kontrolü:** Diff ve yeni dosyalar üzerinde yaygın debug kalıntılarını ve bilinen hassas veri biçimlerini tarama.
- **Standart commit mesajları:** `feat`, `fix`, `refactor`, `docs` ve `chore` türleriyle kontrollü commit mesajı oluşturma.
- **Commit & Push paneli:** Kontroller başarılı olduğunda stage, commit ve push işlemlerini sırayla yürütme; hata sonucunu panelde gösterme.
- **Remote yönetimi:** Uzak depo bağlantılarını görüntüleme, ekleme, güncelleme ve kaldırma.
- **GitHub hesabı entegrasyonu:** Profil bilgileri ve erişilebilir depoları görüntüleme, depoları arama ve yerel klasöre klonlama.
- **Ortak yönetimi:** Bağlı GitHub deposunda ortakları görüntüleme, davet etme/erişim seviyesini ayarlama ve erişimi kaldırma — GitHub yetkileri elverdiği ölçüde.
- **Uzak ve yerel commit geçmişi:** Yerel commit bilgileriyle GitHub üzerinden alınabilen uzak commit akışını ayrı ayrı inceleme.
- **Kişiselleştirme:** Türkçe/İngilizce dil seçimi, açık/koyu tema ve dar ekranlara uyumlu tasarım.
- **Yerel çalışma:** Flask sunucusu varsayılan olarak yalnızca `127.0.0.1` adresinde dinler.

### 🧭 Yönetim paneli

| Sayfa | Ne işe yarar? |
| --- | --- |
| **Kontrol Paneli** | Aktif projeyi, dalı, değişiklik sayısını, kayıtlı projeleri ve mevcut hesap bağlantısını özetler. |
| **Projeler** | Yerel depoları klasör seçerek bağlar; projeler arasında geçiş yapar veya eski kayıtları listeden kaldırır. |
| **Çalışma Alanı** | Git durumunu, dosyaları, remote bağlantılarını ve commit/push işlemlerini yönetir. |
| **Aktivite** | Yerel commit geçmişini ve uygun GitHub bağlantısı bulunduğunda uzak commit geçmişini inceler. |
| **Proje Ortakları** | Aktif deponun GitHub ortaklarını ve API'nin sunduğu erişim bilgilerini gösterir; izinli işlemleri yürütür. |
| **Git Hesabı** | GitHub Personal Access Token ile bağlantı kurar, profil ve erişilebilir depoları gösterir. |
| **Ayarlar** | Tema, dil ve arayüz tercihlerini yönetir. |

### 🚀 Hızlı başlangıç

#### Gereksinimler

- **Python 3.10 veya üzeri**
- **Git** komut satırı aracı
- Klasör penceresinin açılabilmesi için Tk desteği içeren bir masaüstü Python kurulumu
- GitHub özellikleri için internet bağlantısı ve uygun izinlere sahip bir Personal Access Token
- Arayüzde Tailwind CSS ve Lucide simgelerinin CDN üzerinden yüklenmesi nedeniyle ilk sayfa görünümü için internet bağlantısı önerilir

#### Windows

1. ZIP arşivini bir klasöre çıkar.
2. `start.bat` dosyasına çift tıkla.
3. Kurulum tamamlanıp yerel sunucu açıldığında tarayıcıdan [`http://127.0.0.1:5000`](http://127.0.0.1:5000) adresine git.
4. **Projeler** sayfasında klasör seçiciyle mevcut bir Git deposunu bağla.
5. Birden fazla depo ekleyip listeden aktif projeyi değiştirebilirsin.

Başlatıcı `.venv` sanal ortamını oluşturur, `requirements.txt` içindeki bağımlılıkları kurar ve uygulamayı başlatır.

#### macOS / Linux

Proje klasöründe terminal açıp çalıştır:

```bash
chmod +x start.sh
./start.sh
```

Betik `.venv` oluşturur, bağımlılıkları kurar ve desteklenen masaüstü ortamlarda tarayıcıyı açmayı dener. Tarayıcı otomatik açılmazsa [`http://127.0.0.1:5000`](http://127.0.0.1:5000) adresini kendin aç.

Debian/Ubuntu üzerinde Python kurulumunda Tk eksikse dağıtımının uygun paket yöneticisiyle `python3-tk` kurman gerekebilir.

#### İlk projeyi bağlama

1. **Projeler → Klasör seçerek bağla** yolunu aç.
2. Yerel bir Git deposunun klasörünü seç. Git deposu olmayan bir klasör kabul edilmez.
3. Bağlantı sonrası aktif depo ve dal bilgilerini kontrol et.
4. **Çalışma Alanı** sayfasında değişiklik listesini ve remote adreslerini incele.
5. Commit/push işleminden önce kalite kontrolünü çalıştır ve dosyaları gözden geçir.

> İsteğe bağlı olarak başlangıç deposunu `GITFLOW_REPO` ortam değişkeniyle belirtebilirsin. Örnekler aşağıda.

**PowerShell**

```powershell
$env:GITFLOW_REPO = 'C:\Projects\my-repository'
.\start.bat
```

**Windows CMD**

```bat
set GITFLOW_REPO=C:\Projects\my-repository
start.bat
```

**macOS / Linux**

```bash
GITFLOW_REPO="$HOME/Projects/my-repository" ./start.sh
```

Portu değiştirmek için `GITFLOW_PORT` ortam değişkeni kullanılabilir:

```bash
GITFLOW_PORT=5050 ./start.sh
```

Windows CMD:

```bat
set GITFLOW_PORT=5050
start.bat
```

Bu değişkenleri uygulamayı başlatmadan önce tanımla.

### 🔗 GitHub hesabını bağlama

1. **Git Hesabı** sayfasını aç.
2. GitHub için bir Personal Access Token oluştur. Token'ı yalnızca ihtiyaç duyduğun depolar ve işlemler için yetkilendir.
3. Token'ı bağlantı formuna gir ve doğrulamayı tamamla.
4. **Git Hesabı** sayfasında profilini ve erişebildiğin depoları incele.
5. Bir depoyu yerel bilgisayara indirmek için listeden klonlama akışını başlatıp hedef üst klasörü seç.

#### İzinler hakkında

Gerekli token izinleri, yapacağın işleme ve deponun sahibi/kurum politikalarına göre değişir. Genel olarak:

- Profil ve depo listeleme için token'ın ilgili kullanıcı/depo metadatasına erişebilmesi gerekir.
- Özel depoyu klonlamak için depoya okuma erişimi gerekir.
- Ortak listesini görüntüleme ve özellikle ortak ekleme/kaldırma için depo üzerinde yeterli yetki gerekir. Fine-grained token'larda ortak yönetimi uçları **Administration: Read and write** izni isteyebilir.
- Organizasyon politikaları, sahip olduğun rolden bağımsız ek kısıtlamalar uygulayabilir.

İlgili resmi belgeler: [Kullanıcının depolarını listeleme](https://docs.github.com/en/rest/repos/repos#list-repositories-for-the-authenticated-user) · [Depo ortaklarını yönetme](https://docs.github.com/en/rest/collaborators/collaborators).

Token bağlantısı kesildiğinde uygulamada saklanan token dosyası kaldırılır. Token'ı paylaşma, ekran görüntülerine koyma veya kaynak koduna ekleme.

### 🛡️ Commit & Push ve kalite kontrolü

Commit & Push paneli yaygın hataları azaltmak için ek bir kontrol katmanı sağlar. Genel akış şöyledir:

1. Seçilen commit türü ve açıklama doğrulanır.
2. Değişiklik diff'leri ve yeni, Git tarafından izlenmeyen dosyalar bilinen kalıplara karşı taranır.
3. Kontroller temizse `git add .` çalıştırılır.
4. Stage edilmiş değişiklikler tekrar taranır.
5. Commit oluşturulur ve ardından `git push` çalıştırılır.
6. Push başarısız olursa arayüz yerel commit'in oluşmuş olabileceğini ayrıca bildirir.

Kullanılan commit türleri: `feat`, `fix`, `refactor`, `docs`, `chore`.

Tarama; `console.log`, `print()`, `debugger`, `dd()` ve `TODO` gibi yaygın izleri, bilinen bazı token biçimlerini, JWT benzeri değerleri, özel anahtar işaretçilerini ve olası parola/API anahtarı atamalarını bulmaya çalışır. Bu kontrol **tam kapsamlı bir güvenlik tarayıcısı değildir**; bütün gizli bilgileri yakalayacağı veya her yanlış pozitiften kaçınacağı garanti edilmez.

> **Göndermeden önce incele:** `git add .`, `.gitignore` tarafından dışlanmayan diğer değişiklikleri de stage edebilir. Dosya tablosunu kontrol et, gerekirse hassas dosyaları `.gitignore` içine al ve commit işleminden önce diff'i gözden geçir.

### 📁 Proje yapısı

```text
GitFlow-Manager/
├── app.py
├── requirements.txt
├── start.bat
├── start.sh
├── LICENSE
├── README.md
├── TEST_REPORT.md
├── static/
│   ├── app.js
│   └── styles.css
└── templates/
    ├── base.html
    ├── dashboard.html
    ├── projects.html
    ├── workspace.html
    ├── activity.html
    ├── collaborators.html
    ├── account.html
    └── settings.html
```

### 🗃️ Yerel veriler nerede tutulur?

Uygulama, işletim sistemi kullanıcı hesabının home klasörü altındaki `~/.gitflow-manager/` dizinini kullanır:

| Dosya | Amaç |
| --- | --- |
| `repositories.json` | Kayıtlı yerel Git depoları |
| `active_repository.json` | Kalıcı aktif depo seçimi |
| `secret.key` | Flask oturum/imzalama anahtarı |
| `github.json` | Bağlantı kurulduysa GitHub token yapılandırması |

POSIX sistemlerinde uygulama bu dizin ve hassas yapılandırma dosyaları için kısıtlayıcı dosya izinleri ayarlamayı dener. Bu koruma tek başına işletim sistemi hesabını, cihazı veya diski şifrelemez. Uygulama verilerini sıfırlamadan önce gerekirse bu dizini yedekle.

### 🔐 Güvenlik modeli ve sınırlar

- Flask geliştirme sunucusu varsayılan olarak yalnızca `127.0.0.1` üzerinde çalışır; ağ üzerinden çok kullanıcılı dağıtım için tasarlanmamıştır.
- POST isteklerinde oturum bazlı CSRF doğrulaması uygulanır.
- Git komutları `shell=False` ve argüman listeleriyle çalıştırılır.
- Gösterilen remote adreslerinde kimlik bilgileri maskelenir.
- GitHub token'ı kaynak koda veya clone URL'sine yerleştirilmez; klonlama sırasında alt süreç ortamındaki geçici Git yapılandırması üzerinden aktarılır.
- Git commit işlemi deponun Git hook'larını çalıştırabilir. Yalnızca güvendiğin depolarda çalıştır.
- Tema ve dil tercihi tarayıcının `localStorage` alanında saklanır.
- Uygulamayı internete açık bir sunucuya doğrudan taşımayın. Uzak erişim gerekiyorsa ayrıca kimlik doğrulama, HTTPS, erişim kontrolü ve üretim sunucusu tasarımı gerekir.

### 🧰 Sorun giderme

| Sorun | Kontrol et |
| --- | --- |
| Python sürümü hatası | Python 3.10+ kurulu mu? `python --version` veya `python3 --version` ile kontrol et. |
| `git` bulunamadı | Git'i kur ve terminalde `git --version` komutunu doğrula. Ardından terminali/başlatıcıyı yeniden aç. |
| Klasör seçici açılmıyor | Masaüstü Python kurulumunda Tk desteğinin bulunduğunu doğrula. Linux'ta gerekirse `python3-tk` kur. |
| Port zaten kullanılıyor | Başlatmadan önce `GITFLOW_PORT` değerini boşta olan farklı bir porta ayarla. |
| Depo bağlanmıyor | Seçtiğin klasörün içinde veya üst yolunda geçerli `.git` deposu olduğundan emin ol. |
| Push başarısız | `git remote -v`, yerel Git kimlik doğrulaması, dalın upstream ayarı ve uzak depoya yazma iznini kontrol et. Yerel commit oluşturulmuş olabilir. |
| GitHub'da `401` | Token'ın geçerli ve süresinin dolmamış olduğunu kontrol et; gerekiyorsa bağlantıyı yenile. |
| GitHub'da `403` | Token izinlerini, depo erişimini ve organizasyon politikasını kontrol et. |
| Tema/ikonlar eksik | İlk yükleme sırasında CDN erişimini ve tarayıcının ağ konsolunu kontrol et. |
| Bağımlılıklar kurulamıyor | İnternet bağlantısını, PyPI erişimini ve sanal ortamın doğru Python sürümüyle oluşturulduğunu kontrol et. |

### 🤝 Katkıda bulunma

Katkı göndermek için önerilen akış:

1. Depoyu fork'la veya kendi geliştirme dalını oluştur.
2. Tek bir amaca odaklanan, küçük ve açıklayıcı değişiklikler yap.
3. `python -m py_compile app.py` ve `node --check static/app.js` kontrollerini çalıştır.
4. Git akışlarını geçici bir test deposunda dene; gerçek projenin çalışma ağacını riske atma.
5. Değişikliğin kapsamını, testlerini ve bilinen sınırlamalarını açıklayan bir pull request aç.

Hata bildirimlerinde işletim sistemi, Python/Git sürümü, uygulama adımı ve gizli bilgileri temizlenmiş hata çıktısını paylaş. **Token, parola, özel anahtar veya özel depo bağlantısı içeren çıktıları yayımlama.**

### 📜 Lisans

GitFlow Manager, depodaki [MIT Lisansı](LICENSE) altında sunulur.

---

## English

GitFlow Manager is an open-source developer tool that brings local Git repositories and selected GitHub workflows into a modern, multi-page web dashboard. It reduces repetitive terminal work while keeping repository status, commit preparation, remote configuration, activity, and collaboration controls in one local workspace.

> **The idea:** Your working repositories stay on your computer. GitFlow Manager manages the local workflow; GitHub features become available only after you connect an account and the token has the required access.

### ✨ Highlights

- **Multi-page admin dashboard:** Overview, Projects, Workspace, Activity, Collaborators, Git Account, and Settings.
- **Multiple local repositories:** Select folders through the operating system dialog, switch between registered repositories, and review the active project.
- **Visual Git status:** Current branch, latest commit, remote configuration, and changed/added/deleted files.
- **Pre-commit checks:** Scan diffs and new files for common debugging leftovers and recognizable secret patterns.
- **Conventional commit-style messages:** Supported types are `feat`, `fix`, `refactor`, `docs`, and `chore`.
- **Commit & Push workflow:** Run checks, stage changes, create a commit, and push; show a separate result when pushing fails after a local commit was created.
- **Remote management:** View, add, update, and remove Git remote entries.
- **GitHub account integration:** View your profile and accessible repositories, browse repository details, and clone a repository to a local folder.
- **Collaborator management:** View collaborators, send invitations/set access levels, and remove access when GitHub permissions allow it.
- **Local and remote activity:** Review local commits and, when a matching GitHub remote and token are available, remote commit history.
- **Personalization:** Turkish and English UI, persistent light/dark theme preference, and responsive layouts.
- **Local-first by default:** The Flask server listens on `127.0.0.1` unless its launch configuration is intentionally changed in code.

### 🧭 Dashboard pages

| Page | Purpose |
| --- | --- |
| **Dashboard** | Summarizes the active repository, branch, change count, registered projects, and account connection state. |
| **Projects** | Connect local repositories through a folder picker, switch between them, or remove entries from the list. |
| **Workspace** | Review Git status, files, remotes, and the commit/push workflow. |
| **Activity** | Inspect local commits and, when available, remote GitHub commits. |
| **Collaborators** | View GitHub repository collaborators and perform permitted access-management actions. |
| **Git Account** | Connect a GitHub Personal Access Token and browse account and repository information. |
| **Settings** | Change theme, language, and interface preferences. |

### 🚀 Quick start

#### Requirements

- **Python 3.10 or newer**
- **Git** command-line tools
- A desktop Python installation with Tk support for folder dialogs
- Internet access and a suitably permissioned Personal Access Token for GitHub features
- Internet access is recommended for the initial UI load because Tailwind CSS and Lucide icons are loaded from CDNs

#### Windows

1. Extract the ZIP archive.
2. Double-click `start.bat`.
3. When the local server starts, open [`http://127.0.0.1:5000`](http://127.0.0.1:5000) in your browser.
4. Open **Projects** and use the folder picker to select an existing Git repository.
5. Register additional repositories and switch the active project from the list.

The launcher creates `.venv`, installs the dependency pinned in `requirements.txt`, and starts the application.

#### macOS / Linux

Open a terminal in the project directory and run:

```bash
chmod +x start.sh
./start.sh
```

The script creates `.venv`, installs dependencies, and attempts to open a browser in supported desktop environments. If the browser does not open automatically, visit [`http://127.0.0.1:5000`](http://127.0.0.1:5000) manually.

On Debian/Ubuntu, you may need to install `python3-tk` if your Python distribution does not include Tk support.

#### Connect your first repository

1. Go to **Projects → Connect using folder picker**.
2. Select a directory containing a valid Git repository. A plain folder without a Git repository is not accepted.
3. Confirm the active repository and branch.
4. Open **Workspace** to inspect file changes and remotes.
5. Run the quality checks and review the listed files before committing or pushing.

You can optionally set `GITFLOW_REPO` before launching the app.

**PowerShell**

```powershell
$env:GITFLOW_REPO = 'C:\Projects\my-repository'
.\start.bat
```

**Windows CMD**

```bat
set GITFLOW_REPO=C:\Projects\my-repository
start.bat
```

**macOS / Linux**

```bash
GITFLOW_REPO="$HOME/Projects/my-repository" ./start.sh
```

Set a custom port with `GITFLOW_PORT` before launching:

```bash
GITFLOW_PORT=5050 ./start.sh
```

Windows CMD:

```bat
set GITFLOW_PORT=5050
start.bat
```

### 🔗 Connect GitHub

1. Open **Git Account**.
2. Create a GitHub Personal Access Token and grant access only to the repositories and operations you need.
3. Enter the token in the connection form and complete validation.
4. Browse your profile and repositories from the Git Account page.
5. To clone a repository, start the clone workflow from the list and select the parent folder in which its directory should be created.

#### Token permissions

Required permissions depend on the operation and on the repository owner's or organization's policies. In general:

- Profile and repository listing require access to the relevant account/repository metadata.
- Cloning a private repository requires read access to that repository.
- Listing collaborators and, in particular, adding/removing collaborators requires sufficient repository permissions. Fine-grained tokens may need **Administration: Read and write** for collaborator-management endpoints.
- Organization policies can impose additional restrictions even when your personal role appears sufficient.

Official references: [List repositories for the authenticated user](https://docs.github.com/en/rest/repos/repos#list-repositories-for-the-authenticated-user) · [Collaborators REST API](https://docs.github.com/en/rest/collaborators/collaborators).

Disconnecting GitHub removes the stored token configuration. Never share your token or commit it to a repository.

### 🛡️ Commit & Push and quality checks

The Commit & Push panel adds a lightweight guardrail around common mistakes. The sequence is:

1. Validate the selected commit type and description.
2. Scan diffs and new, untracked files for known patterns.
3. Run `git add .` if the first scan passes.
4. Scan staged changes again.
5. Create the commit, then run `git push`.
6. If pushing fails, report that the local commit may already exist.

Supported commit types: `feat`, `fix`, `refactor`, `docs`, and `chore`.

The scanner checks for common markers such as `console.log`, `print()`, `debugger`, `dd()`, and `TODO`, plus recognizable token formats, JWT-like strings, private-key headers, and likely password/API-key assignments. It is **not a comprehensive security scanner** and cannot guarantee that every secret is detected or that every finding is a true positive.

> **Review before sending:** `git add .` can stage other changes that are not excluded by `.gitignore`. Review the file table and diff, and ignore sensitive files before running the commit workflow.

### 📁 Project structure

```text
GitFlow-Manager/
├── app.py
├── requirements.txt
├── start.bat
├── start.sh
├── LICENSE
├── README.md
├── TEST_REPORT.md
├── static/
│   ├── app.js
│   └── styles.css
└── templates/
    ├── base.html
    ├── dashboard.html
    ├── projects.html
    ├── workspace.html
    ├── activity.html
    ├── collaborators.html
    ├── account.html
    └── settings.html
```

### 🗃️ Local data storage

The app uses `~/.gitflow-manager/` in the current operating system user's home directory:

| File | Purpose |
| --- | --- |
| `repositories.json` | Registered local repositories |
| `active_repository.json` | Persistent active repository selection |
| `secret.key` | Flask session/signing key |
| `github.json` | GitHub token configuration, when connected |

On POSIX systems, the application attempts to apply restrictive permissions to this directory and its sensitive configuration files. This does not encrypt your disk or protect data from a compromised operating-system account. Back up the directory before resetting local app data.

### 🔐 Security model and limitations

- The Flask development server listens on `127.0.0.1` by default; the app is not designed as a multi-user network service.
- Session-based CSRF validation is applied to POST requests.
- Git commands use argument lists with `shell=False`.
- Credentials embedded in remote display strings are masked.
- The GitHub token is not embedded into source code or a clone URL. During cloning, it is passed through temporary Git configuration in the child process environment.
- A Git commit can execute hooks configured by the repository. Use this application only with repositories you trust.
- Theme and language preferences are stored in browser `localStorage`.
- Do not expose the app directly to the public internet. Remote access would require a separate design for authentication, HTTPS, access control, and a production-grade server.

### 🧰 Troubleshooting

| Problem | What to check |
| --- | --- |
| Python version error | Install Python 3.10+ and verify with `python --version` or `python3 --version`. |
| `git` command not found | Install Git, verify `git --version`, and restart your terminal/launcher. |
| Folder picker does not open | Verify that your desktop Python includes Tk support. On Linux, install `python3-tk` if needed. |
| Port is already in use | Set `GITFLOW_PORT` to a free port before launch. |
| Repository cannot be connected | Make sure the selected directory contains a valid `.git` repository. |
| Push fails | Check `git remote -v`, Git credentials, upstream branch configuration, and write access. A local commit may already have been created. |
| GitHub `401` | Verify that the token is valid and has not expired; reconnect if necessary. |
| GitHub `403` | Review token permissions, repository access, and organization policy. |
| Theme/icons are missing | Check CDN connectivity and your browser's network console during the first load. |
| Dependencies cannot be installed | Check internet/PyPI access and ensure the virtual environment uses a supported Python version. |

### 🤝 Contributing

A recommended contribution workflow:

1. Fork the repository or create a dedicated development branch.
2. Keep changes focused and describe their purpose clearly.
3. Run `python -m py_compile app.py` and `node --check static/app.js`.
4. Exercise Git workflows in a temporary test repository instead of risking a real project's working tree.
5. Open a pull request describing the change, tests performed, and known limitations.

When reporting a bug, include your OS, Python/Git versions, the steps taken, and a sanitized error message. **Do not publish tokens, passwords, private keys, or private repository URLs.**

### 📜 License

GitFlow Manager is distributed under the [MIT License](LICENSE) included in this repository.

---

<div align="center">

**dbmatik**  

</div>
