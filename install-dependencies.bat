@echo off
echo Installing backend dependencies...
cd backend
call npm install
echo.
echo Installing mobile dependencies...
cd ..\mobile
call npm install
echo.
echo All dependencies installed successfully!
echo.
echo To start the backend server, run start-backend.bat
echo To start the mobile app, run start-mobile.bat
pause