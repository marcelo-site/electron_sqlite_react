import { Menu, BrowserWindow, app } from "electron";
import path from "path";

import "../src/controllers/product/main.js";
import "../src/controllers/order/main.js";

import templateMenu from "./menu.js";

const isDev = !app.isPackaged;

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 900,
    height: 680,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

  const filePath = `file://${path.join(app.getAppPath(), "/build/index.html")}`;
  mainWindow.loadURL(isDev ? "http://localhost:3000" : filePath);

  mainWindow.on("closed", () => {
    mainWindow = null;
  });

  if (isDev) {
    mainWindow.webContents.openDevTools();
  }
}

// app.on("ready", createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

const menu = Menu.buildFromTemplate(templateMenu);
Menu.setApplicationMenu(menu);
app.whenReady().then(createWindow);

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
