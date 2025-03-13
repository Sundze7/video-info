const { app, BrowserWindow, ipcMain, dialog } = require("electron");
const path = require("path");
const fs = require("fs");
const ffmpeg = require("fluent-ffmpeg");

app.whenReady().then(() => {
  const mainWindow = new BrowserWindow({
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
  });

  mainWindow.loadFile("index.html");
});

ipcMain.handle("dialog:openFile", async () => {
  const result = await dialog.showOpenDialog({
    properties: ["openFile"],
    filters: [{ name: "Videos", extensions: ["mp4", "mov", "avi", "mkv"] }],
  });
  return result.canceled ? null : result.filePaths[0];
});

ipcMain.on("video:submit", (event, videoPath) => {
  ffmpeg.ffprobe(videoPath, (err, metadata) => {
    if (err) {
      console.error("Error reading video metadata:", err);
      return;
    }

    const duration = metadata.format.duration;
    const format = metadata.format.format_name;
    const stats = fs.statSync(videoPath);
    const size = stats.size;

    event.sender.send("video:info", {
      duration,
      format,
      size,
    });
  });
});
