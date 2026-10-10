@echo off
setlocal
cd /d "%~dp0"
if not exist ".venv\Scripts\python.exe" (
    where py >nul 2>nul
    if not errorlevel 1 (
        py -3 -m venv .venv
    ) else (
        where python >nul 2>nul
        if errorlevel 1 (
            echo Python 3 bulunamadi. Python 3.10 veya ustunu yukleyin.
            pause
            exit /b 1
        )
        python -m venv .venv
    )
    if errorlevel 1 (
        echo Sanal ortam olusturulamadi.
        pause
        exit /b 1
    )
)
".venv\Scripts\python.exe" -c "import sys; raise SystemExit(sys.version_info < (3, 10))"
if errorlevel 1 (
    echo Python 3.10 veya ustu gerekli. Mevcut sanal ortami silip Python 3.10+ ile yeniden baslatin.
    pause
    exit /b 1
)
".venv\Scripts\python.exe" -m pip install -r requirements.txt
if errorlevel 1 (
    echo Bagimliliklar yuklenemedi.
    pause
    exit /b 1
)
start "GitFlow Manager" "http://127.0.0.1:5000"
".venv\Scripts\python.exe" app.py
