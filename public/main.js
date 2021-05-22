const { app, BrowserWindow, ipcMain } = require('electron');
const { Sequelize } = require('sequelize');

let seq = undefined;

// Create the browser window
function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      enableRemoteModule: true,
      contextIsolation: false,
      preload: __dirname + '/preload.js',
    },
  });

  win.webContents.loadDevTools();
  win.loadURL('http://localhost:3000');

  //win.webContents.openDevTools();
}

// Connect to the database
async function connectDatabase() {
  seq = new Sequelize({
    dialect: 'sqlite',
    storage: 'db.sqlite',
  });

  try {
    await seq.authenticate();
    console.log('[Database] Connected succesfully.');
  } catch (error) {
    console.error('[Database] Connection failed.');
  }
}

// This runs when Electron has finished initialization
app.whenReady().then(() => {
  createWindow();
  connectDatabase();
});

// Quit when all windows are closed
app.on('window-all-closed', () => {
  // Close db connection
  seq.close().then(() => console.log('[Database] Connection closed.'));
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// Event handler for async incoming messages
ipcMain.on('async-ping-1', (event, arg) => {
  console.log('[IPC_Main] (ASYNC) Received', arg);

  // Send response
  event.sender.send('async-pong-1', 'ASYNC PONG 1');
});

// Event handler for sync incoming messages
ipcMain.on('sync-ping-1', (event, arg) => {
  console.log('[IPC_Main] (SYNC) Recieved', arg);

  // Send response
  event.returnValue = 'SYNC PONG 1';
});
