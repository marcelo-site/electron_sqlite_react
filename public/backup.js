import { dialog, app } from "electron";
import path from "path";
import fs from "fs";

export const openBackup = async () => {
  try {
    let dialogFile = await dialog.showOpenDialog({
      title: "Procurando backup",
      buttonLabel: "Importar backup",
      message: "mensagem",
      properties: ["openFile"],
      filters: [
        {
          name: "Arquivos Backup",
          extensions: ["sqlite"],
        },
      ],
    });
    if (dialogFile.canceled) {
      return false;
    }

    const res = await dialog.showMessageBox({
      title: "Atenção!",
      message: "Tem certeza que deseja atualizar, toda a base de dados?",
      detail: "Se continuar vai subistituir os dados atuais pelo backup!",
      // icon: "./warning.png",
      buttons: ["ok", "cancel"],
    });

    if (res.response === 0) {
      fs.copyFile(dialogFile.filePaths[0], "./database.sqlite", (err) => {
        if (err) throw err;
        console.log("source.txt was copied to destination.txt");
      });
    }
  } catch (error) {
    console.log(error);
  }
};

export const saveBackup = async () => {
  try {
    let dialogFile = await dialog.showSaveDialog({
      title: "Importando Backup",
      buttonLabel: "Importar backup",
      defaultPath: "database.sqlite",
    });

    if (dialogFile.canceled) {
      return false;
    }
    fs.copyFile(
      path.join(app.getAppPath(), "/database.sqlite"),
      dialogFile.filePath,
      (err) => {
        if (err) throw err;
        console.log("source.txt was copied to destination.txt");
      }
    );
  } catch (error) {
    console.log(error);
  }
};
