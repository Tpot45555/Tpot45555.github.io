@echo off
title Crear el instalador de Atlas de mi PC
cd /d "%~dp0"
echo ==========================================
echo   Instalador de Atlas de mi PC
echo ==========================================
echo.

echo [1/3] Construyendo la aplicacion...
py -3 -m pip install --upgrade pyinstaller
if errorlevel 1 goto fallo
py -3 -m PyInstaller --noconfirm --clean --windowed --icon "atlas.ico" --name "Atlas de mi PC" --distpath "dist-app" --workpath "build-inst" --specpath "build-inst" --add-data "index.html;." --add-data "procesos.html;." --add-data "menu.js;." --add-data "Line2.js;." --add-data "three.min.js;." --add-data "OrbitControls.js;." ciudad.py
if errorlevel 1 goto fallo
if not exist "dist-app\Atlas de mi PC\Atlas de mi PC.exe" goto fallo

echo.
echo [2/3] Buscando Inno Setup...
set "ISCC="
call :buscar
if defined ISCC goto compilar
echo    No esta. Lo instalo con winget (puede tardar un par de minutos)...
winget install -e --id JRSoftware.InnoSetup --accept-source-agreements --accept-package-agreements
call :buscar
if not defined ISCC goto sininno

:compilar
echo    Encontrado: %ISCC%
echo.
echo [3/3] Creando el instalador...
"%ISCC%" "Atlas de mi PC.iss"
if errorlevel 1 goto fallo
echo.
echo ==========================================
echo   Listo: "Atlas de mi PC - Instalador.exe"
echo   esta en esta misma carpeta.
echo ==========================================
echo.
echo Ese es el archivo que se reparte. Al ejecutarlo instala la
echo aplicacion para tu usuario, crea el acceso directo y la deja
echo en "Aplicaciones instaladas" de Windows para desinstalarla.
pause
exit /b 0

:buscar
for %%p in (
  "%ProgramFiles(x86)%\Inno Setup 6\ISCC.exe"
  "%ProgramFiles%\Inno Setup 6\ISCC.exe"
  "%LocalAppData%\Programs\Inno Setup 6\ISCC.exe"
) do if exist %%p set "ISCC=%%~p"
exit /b 0

:sininno
echo.
echo No encontre Inno Setup y winget no pudo instalarlo.
echo Descargalo de https://jrsoftware.org/isdl.php, instalalo
echo y vuelve a ejecutar este archivo.
pause
exit /b 1

:fallo
echo.
echo Algo fallo. Copia el texto de esta ventana y pasaselo a Claude.
pause
exit /b 1
