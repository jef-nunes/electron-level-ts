// preload.ts
import { contextBridge, ipcRenderer } from 'electron';

console.log("[Preload script executed]")

// Exposes the 'db' variable to the renderer process
// From this, it's possible to request the 'db_manager'
// in the 'node' process layer to perform operations 
// on the LevelDB database.
contextBridge.exposeInMainWorld('db', {
    putData: (key: string, value: any) => ipcRenderer.invoke('db:put', key, value),
    getData: (key: string) => ipcRenderer.invoke('db:get', key),
    deleteData: (key: string) => ipcRenderer.invoke('db:del', key),
});

// Exposes the 'proj_versions' variable to the renderer process,
// which contains the versions of Chromium, Node.js, and Electron
// used in the project.
contextBridge.exposeInMainWorld('proj_versions', {
    node: () => process.versions.node,
    chrome: () => process.versions.chrome,
    electron: () => process.versions.electron,
});
