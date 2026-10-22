@echo off
chcp 65001 > nul
title مكتبة الشعلة - ربط ورفع المستودع إلى GitHub
echo ================================================================
echo   مكتبة الشعلة - ربط ورفع المشروع إلى مستودع GitHub
echo   المستودع المستهدف: https://github.com/yousif-alsamawi/fun-education
echo ================================================================
echo.

set REPO_URL=https://github.com/yousif-alsamawi/fun-education.git

:: فحص ما إذا كان Git متوفراً في مسارات النظام أو البرامج
where git >nul 2>&1
if %errorlevel% neq 0 (
    if exist "C:\Program Files\Git\cmd\git.exe" (
        set "PATH=C:\Program Files\Git\cmd;%PATH%"
    ) else if exist "%LOCALAPPDATA%\Programs\Git\cmd\git.exe" (
        set "PATH=%LOCALAPPDATA%\Programs\Git\cmd;%PATH%"
    ) else (
        echo [تنبيه] برنامج Git غير مثبت على جهازك حالياً.
        echo لقد قمنا بتنزيل ملف التثبيت مسبقاً وجعله جاهزاً في مجلد المشروع!
        echo جاري تشغيل مثبت Git الآن (يرجى النقر على Next حتى الانتهاء)...
        echo.
        if exist "%~dp0Git-Setup.exe" (
            start /wait "" "%~dp0Git-Setup.exe"
            if exist "C:\Program Files\Git\cmd\git.exe" (
                set "PATH=C:\Program Files\Git\cmd;%PATH%"
            ) else if exist "%LOCALAPPDATA%\Programs\Git\cmd\git.exe" (
                set "PATH=%LOCALAPPDATA%\Programs\Git\cmd;%PATH%"
            )
        ) else (
            echo لم يتم العثور على Git-Setup.exe، يرجى تثبيت Git وإعادة المحاولة.
            pause
            exit /b 1
        )
    )
)

echo [1/4] فحص حالة المستودع المحلي...
git rev-parse --is-inside-work-tree >nul 2>&1
if %errorlevel% neq 0 (
    git init -b main
)

echo [2/4] إضافة وتجهيز كافة ملفات المشروع...
git config user.name "Yousif Alsamawi"
git config user.email "yousif-alsamawi@users.noreply.github.com"
git branch -M main
git add .
git commit -m "feat: initial commit of personalized stories & booklet monorepo" >nul 2>&1

echo [3/4] ربط المستودع البعيد (Remote Origin)...
git remote remove origin >nul 2>&1
git remote add origin %REPO_URL%

echo [4/4] رفع ملفات المشروع إلى GitHub (Push to main)...
echo.
git push -u origin main --force

if %errorlevel% equ 0 (
    echo.
    echo ================================================================
    echo   [تم بنجاح!] تم ربط ورفع مشروعك بالكامل إلى GitHub!
    echo   الرابط: https://github.com/yousif-alsamawi/fun-education
    echo ================================================================
) else (
    echo.
    echo [ملاحظة] إذا طلب منك GitHub تسجيل الدخول، اختر Sign in with Browser
    echo لإتمام صلاحيات الرفع.
)

echo.
pause
