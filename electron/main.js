const { app, BrowserWindow } = require('electron');
const path = require('path');
const { spawn } = require('child_process');
const waitOn = require('wait-on');

let mainWindow;
let backendProcess;
let frontendProcess;

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
            // Only show actual errors, not INFO logs
            const message = data.toString();
            if (message.includes('ERROR') || message.includes('CRITICAL')) {
                console.error(`Backend Error: ${message}`);
            }
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
                console.log('✓ Backend is ready!');
                resolve();
            }).catch((err) => {
                console.error('Backend failed to start:', err);
                reject(err);
            });
        }, 2000);
    });
}

function startFrontend() {
    return new Promise((resolve, reject) => {
        console.log('Starting frontend server...');
        
        const pythonPath = process.platform === 'win32' ? 'python' : 'python3';
        const backendPath = path.join(__dirname, '..', 'backend');
        
        frontendProcess = spawn(pythonPath, [
            'serve_frontend.py'
        ], {
            cwd: backendPath
        });

        frontendProcess.stdout.on('data', (data) => {
            console.log(`Frontend: ${data}`);
        });

        frontendProcess.stderr.on('data', (data) => {
            console.error(`Frontend Error: ${data}`);
        });

        frontendProcess.on('error', (error) => {
            console.error('Failed to start frontend:', error);
            reject(error);
        });

        // Wait for frontend to be ready
        setTimeout(() => {
            waitOn({
                resources: [`http://localhost:${FRONTEND_PORT}`],
                timeout: 30000,
                interval: 500
            }).then(() => {
                console.log('✓ Frontend is ready!');
                resolve();
            }).catch((err) => {
                console.error('Frontend failed to start:', err);
                reject(err);
            });
        }, 1000);
    });
}

function createWindow() {
    mainWindow = new BrowserWindow({
        width: 1400,
        height: 900,
        minWidth: 1024,
        minHeight: 768,
        backgroundColor: '#ffffff',
        webPreferences: {
            nodeIntegration: false,
            contextIsolation: true,
            enableRemoteModule: false,
            webSecurity: true
        },
        show: false,
        autoHideMenuBar: true,
        title: 'AXXO Builder'
    });

    // Load frontend
    const frontendUrl = `http://localhost:${FRONTEND_PORT}`;
    
    mainWindow.loadURL(frontendUrl).catch((err) => {
        console.error('Failed to load frontend:', err);
    });

    // Show window when ready
    mainWindow.once('ready-to-show', () => {
        mainWindow.show();
        console.log('\n========================================');
        console.log('  ✓ AXXO Builder is ready!');
        console.log('========================================\n');
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
    console.log('\n========================================');
    console.log('  Starting AXXO Builder...');
    console.log('========================================\n');
    
    try {
        // Start backend first
        await startBackend();
        
        // Start frontend server
        await startFrontend();
        
        // Small delay to ensure everything is stable
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Create Electron window
        createWindow();
    } catch (error) {
        console.error('Failed to start application:', error);
        app.quit();
    }
}

app.whenReady().then(startApp);

app.on('window-all-closed', () => {
    // Kill processes
    if (backendProcess) {
        backendProcess.kill();
    }
    if (frontendProcess) {
        frontendProcess.kill();
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
    // Ensure processes are killed
    if (backendProcess) {
        backendProcess.kill();
    }
    if (frontendProcess) {
        frontendProcess.kill();
    }
});

// Handle errors
process.on('uncaughtException', (error) => {
    console.error('Uncaught exception:', error);
});

process.on('unhandledRejection', (error) => {
    console.error('Unhandled rejection:', error);
});
