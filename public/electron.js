import electron, { Menu } from "electron";

const { app } = electron;
const { BrowserWindow } = electron;

import path from "path";
import isDev from "electron-is-dev";

import "../src/controllers/product/main.js";
import "../src/controllers/order/main.js";

import { templateMenu } from "./menu.js";

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
  mainWindow.loadURL(
    isDev
      ? "http://localhost:3000"
      : `file://${path.join(__dirname, "../build/index.html")}`
  );
  mainWindow.on("closed", () => {
    mainWindow = null;
  });
  if (isDev) {
    mainWindow.webContents.openDevTools();
  }
}

const pathDate = (paramName, paramExtension) => {
  const date = new Date();
  const pathDateAdd = date.toLocaleDateString("pt-br").replace(/\//g, "-");
  return `/${paramName}-${pathDateAdd}.${paramExtension}`;
};

app.on("ready", createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

const menu = Menu.buildFromTemplate(templateMenu);
Menu.setApplicationMenu(menu);
app.whenReady().then(createWindow);

app.on("activate", () => {
  if (mainWindow === null) {
    createWindow();
  }
});
