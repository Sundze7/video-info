const electron = require("electron");
// import electron from 'electron'
const { app } = electron;

// event-base programming.
// app.on - thing we're listening to
// 'ready' - event we're listening for
// () => {} - fxn to run when event occurs
app.on("ready", () => {
  console.log("App is now running");
});
