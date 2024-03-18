import { shell } from "electron";
import { openBackup, saveBackup } from "./backup.js";

const templateMenu = [
  {
    label: "Backup",
    submenu: [
      {
        label: "Exportar Backup",
        accelerator: "CmdOrCtrl+shift+s",
        click() {
          saveBackup();
        },
      },
      {
        label: "Importar Backup",
        accelerator: "CmdOrCtrl+shift+A",
        click() {
          openBackup();
        },
      },
    ],
  },
  {
    label: "Vizualizar",
    submenu: [
      {
        label: "Zoom +",
        role: "zoomin",
      },
      {
        label: "Zoom -",
        role: "zoomout",
      },
      {
        label: "Tamanho padrão",
        role: "resetzoom",
      },
      {
        label: "Alternar tela cheia",
        role: "togglefullscreen",
      },
      {
        label: "Fechar app",
        role: process.platform === "darwin" ? "close" : "quit",
        accelerator: "CmdOrCtrl+Shift+Q",
      },
    ],
  },
  {
    label: "Ajuda",
    submenu: [
      {
        label: "Facebook",
        click() {
          shell.openExternal(
            "https://www.facebook.com/profile.php?id=100015225941991"
          );
        },
      },
      {
        label: "Instagram",
        click() {
          shell.openExternal("https://www.instagram.com/marcelosouza5224/");
        },
      },
    ],
  },
  {
    label: "Autor",
    submenu: [
      {
        label: "Marcelo-Site",

        click() {
          shell.openExternal("https://marcelo-site.github.io/portifolio/");
        },
      },
      {
        label: "Marcelo-Facebook",
        click() {
          shell.openExternal(
            "https://www.facebook.com/profile.php?id=100015225941991"
          );
        },
      },
      {
        label: "Marcelo-Instagram",
        click() {
          shell.openExternal("https://www.instagram.com/marcelosouza5224/");
        },
      },
    ],
  },
];

export default templateMenu;
