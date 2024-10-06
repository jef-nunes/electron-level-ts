// main.ts

import { app, BrowserWindow, ipcMain } from 'electron';
import { DatabaseManager } from './db_manager';
import path from 'path';

/* Electron Browser Window Initializer */
function createWindow(): void
{
    const mainWindow = new BrowserWindow({
        width: 740,
        height: 680,
        resizable: false,
        webPreferences: {
            nodeIntegration: false,
            contextIsolation: true,
            sandbox: false,
            preload: path.join(path.join(__dirname, '../', 'preload', 'preload.js'))
        },
    });

    mainWindow.loadFile(path.join(__dirname, '../../', 'static', 'index.html'));
    mainWindow.setTitle(" ");
}

/* IPC Main handlers for database methods */
// Inserts a new key-value pair into the database
// with the provided key and value arguments
ipcMain.handle('db:put', 
    async function(event, key: string, value: string)
    {
        const success = await DatabaseManager.put(key, value);
        return success;
    }
);
// Retrieves a value from the database
// with the provided key name
ipcMain.handle('db:get', 
    async function(event, key: string)
    {
        const value = await DatabaseManager.get(key);
        return value;
    }
);
// Deletes a key-value pair in the database
// with the provided key name
ipcMain.handle('db:del', 
    async function(event, key: string)
    {
        const success = await DatabaseManager.del(key);
        return success;
    }
);
/* Electron App Lifecycle */
app.whenReady().then(async () => {
    await DatabaseManager.open(); // Opens the database when the app is ready
    createWindow();
});
app.on("window-all-closed", 
    async function(): Promise<void>
    {
        await DatabaseManager.close(); // Closes the database when all windows are closed
        if (process.platform !== "darwin") app.quit();
    }
);
app.on("activate", 
    function(): void
    {
        if (BrowserWindow.getAllWindows().length === 0) createWindow();
    });
