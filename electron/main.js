const { app, BrowserWindow } = require('electron');
const path = require('path');
const { spawn } = require('child_process');
const waitOn = require('wait-on');

let mainWindow;
let backendProcess;

// Backend server configuration
const BACKEND_PORT = 8001;
const FRONTEND_PORT = 3000;

function startBackend() {
    return new Promise((resolve, reject) => {
        console.log('Starting FastAPI backend...');
        
        const pythonPath = process.platform === 'win32' ? 'python' : 'python3';
        const backendPath = path.join(__dirname, '..', 'backend');
        
        backendProcess = spawn(pythonPath, [
            '-m', 'uvicorn',
            'server:app',
            '--host', '0.0.0.0',
            '--port', BACKEND_PORT.toString(),
            '--log-level', 'warning'
        ], {
            cwd: backendPath,
            env: {
                ...process.env,
                CORS_ORIGINS: `http://localhost:${FRONTEND_PORT},http://127.0.0.1:${FRONTEND_PORT}`,
                PYTHONUNBUFFERED: '1'
            }
        });

        backendProcess.stdout.on('data', (data) => {
            console.log(`Backend: ${data}`);
        });

        backendProcess.stderr.on('data', (data) => {
            console.error(`Backend Error: ${data}`);
        });

        backendProcess.on('error', (error) => {
            console.error('Failed to start backend:', error);
            reject(error);
        });

        // Wait for backend to be ready
        setTimeout(() => {
            waitOn({
                resources: [`http://localhost:${BACKEND_PORT}/api`],
                timeout: 30000,
                interval: 500
            }).then(() => {
                console.log('Backend is ready!');
                resolve();
            }).catch((err) => {
                console.error('Backend failed to start:', err);
                reject(err);
            });
        }, 2000);
    });
}

function createWindow() {
    mainWindow = new BrowserWindow({
        width: 1400,
        height: 900,
        minWidth: 1024,
        minHeight: 768,
        backgroundColor: '#ffffff',
        icon: path.join(__dirname, 'icon.png'),
        webPreferences: {
            nodeIntegration: false,
            contextIsolation: true,
            enableRemoteModule: false,
            webSecurity: true
        },
        show: false,
        autoHideMenuBar: true
    });

    // Load frontend
    const frontendUrl = `http://localhost:${FRONTEND_PORT}`;
    
    mainWindow.loadURL(frontendUrl).catch((err) => {
        console.error('Failed to load frontend:', err);
    });

    // Show window when ready
    mainWindow.once('ready-to-show', () => {
        mainWindow.show();
        console.log('AXXO Builder is ready!');
    });

    mainWindow.on('closed', () => {
        mainWindow = null;
    });

    // Open DevTools in development
    if (process.env.NODE_ENV === 'development') {
        mainWindow.webContents.openDevTools();
    }
}

async function startApp() {
    try {
        // Start backend first
        await startBackend();
        
        // Wait a bit for frontend to be ready
        await new Promise(resolve => setTimeout(resolve, 3000));
        
        // Create Electron window
        createWindow();
    } catch (error) {
        console.error('Failed to start application:', error);
        app.quit();
    }
}

app.whenReady().then(startApp);

app.on('window-all-closed', () => {
    // Kill backend process
    if (backendProcess) {
        backendProcess.kill();
    }
    
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (mainWindow === null) {
        createWindow();
    }
});

app.on('quit', () => {
    // Ensure backend is killed
    if (backendProcess) {
        backendProcess.kill();
    }
});

// Handle errors
process.on('uncaughtException', (error) => {
    console.error('Uncaught exception:', error);
});

process.on('unhandledRejection', (error) => {
    console.error('Unhandled rejection:', error);
});
