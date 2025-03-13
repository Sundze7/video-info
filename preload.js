const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("electronAPI", {
  openFile: () => ipcRenderer.invoke("dialog:openFile"),
  sendVideoPath: (filePath) => ipcRenderer.send("video:submit", filePath),
  receiveVideoInfo: (callback) =>
    ipcRenderer.on("video:info", (event, data) => callback(data)),
});
