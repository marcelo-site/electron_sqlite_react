import { shell } from "electron";

export const templateMenu = [
  {
    label: "Salvar",
    submenu: [
      {
        label: "Salvar PDF da planilha",
        accelerator: "CmdOrCtrl+shift+P",
        click() {
          savePDF();
        },
      },
      {
        label: "Exportar Modelo",
        accelerator: "CmdOrCtrl+shift+s",
        click() {
          saveFileAs(".txt");
        },
      },
      {
        label: "Importar Modelo",
        accelerator: "CmdOrCtrl+shift+A",
        click() {
          openFile();
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
