const electron = require("electron");
// import electron from 'electron'
const { app, BrowserWindow } = electron;

// event-based programming.
// app.on - thing we're listening to
// 'ready' - event we're listening for
// () => {} - fxn to run when event occurs
app.on("ready", () => {
  const mainWindow = new BrowserWindow({});
  // essentially says ... look at the current dir and find index.html
  mainWindow.loadURL(`file://${__dirname}/index.html`);
});
