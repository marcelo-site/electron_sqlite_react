const electron = window.require("electron");
const { ipcRenderer } = electron;

export function send(message) {
  return new Promise((resolve) => {
    ipcRenderer.once("asynchronous-reply", (_, arg) => {
      resolve(arg);
    });
    ipcRenderer.send("asynchronous-message", message);
  });
}

export function createProduct(data) {
  return new Promise((resolve) => {
    ipcRenderer.once("createProduct-reply", (_, arg) => {
      resolve(arg);
    });
    ipcRenderer.send("createProduct", data);
  });
}

export function getAllProduct() {
  return new Promise((resolve) => {
    ipcRenderer.once("getAllProduct-reply", (_, arg) => {
      resolve(arg);
    });
    ipcRenderer.send("getAllProduct", undefined);
  });
}

export function editProduct(data) {
  return new Promise((resolve) => {
    ipcRenderer.once("editProduct-reply", (_, arg) => {
      resolve(arg);
    });
    ipcRenderer.send("editProduct", data);
  });
}

export function deleteProduct(data) {
  return new Promise((resolve) => {
    ipcRenderer.once("deleteProduct-reply", (_, arg) => {
      resolve(arg);
    });
    ipcRenderer.send("deleteProduct", data);
  });
}
