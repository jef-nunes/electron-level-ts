/*
contextBridge.exposeInMainWorld('db',
    {
    putData: (key: string, value: any) => ipcRenderer.invoke('db:put', key, value),
    getData: (key: string) => ipcRenderer.invoke('db:get', key),
    deleteData: (key: string) => ipcRenderer.invoke('db:del', key),
    }
); */

declare const db: {
    putData: (key: string, value: any) => Promise<boolean>;
    getData: (key: string) => Promise<any>;
    deleteData: (key: string) => Promise<boolean>;
};

/*
contextBridge.exposeInMainWorld('proj_versions', {
    node: () => process.versions.node,
    chrome: () => process.versions.chrome,
    electron: () => process.versions.electron
  }); */

  declare const proj_versions: {
    node: () => string;
    chrome: () => string;
    electron: () => string;
};