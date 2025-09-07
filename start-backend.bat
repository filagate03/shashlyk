@echo off
echo Installing backend dependencies...
cd backend
call npm install
echo.
echo Starting backend server...
echo The server will be available at http://localhost:3000
echo.
npm start