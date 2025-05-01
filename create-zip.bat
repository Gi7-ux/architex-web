@echo off
echo Creating Architex Website ZIP archive...

:: Create dist directory if it doesn't exist
if not exist dist mkdir dist

:: Define the output zip file
set OUTPUT_FILE=dist\architex-website.zip

:: Remove the zip file if it already exists
if exist %OUTPUT_FILE% del %OUTPUT_FILE%

:: Check if PowerShell is available
where powershell >nul 2>&1
if %ERRORLEVEL% equ 0 (
    :: Use PowerShell to create the zip file
    powershell -Command "Compress-Archive -Path *.html, *.css, *.js, assets, fonts, *.ico, *.txt, *.xml, .htaccess, nginx.conf, README.md -DestinationPath %OUTPUT_FILE% -Force"
    echo Archive created at %OUTPUT_FILE%
) else (
    :: Fallback to Node.js script if PowerShell is not available
    echo PowerShell not found. Trying Node.js script...
    node create-zip.js
)

echo Done!
