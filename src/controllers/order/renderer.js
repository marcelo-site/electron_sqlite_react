const electron = window.require("electron");
const { ipcRenderer } = electron;

export function createOrder(data) {
  return new Promise((resolve) => {
    ipcRenderer.once("createOrder-reply", (_, arg) => {
      resolve(arg);
    });
    ipcRenderer.send("createOrder", data);
  });
}

export function getAllOrder(period) {
  return new Promise((resolve) => {
    ipcRenderer.once("getAllOrder-reply", (_, arg) => {
      resolve(arg);
    });
    ipcRenderer.send("getAllOrder", period);
  });
}

export function getAllProductsOrder(data) {
  return new Promise((resolve) => {
    ipcRenderer.once("getAllProductsOrder-reply", (_, arg) => {
      resolve(arg);
    });
    ipcRenderer.send("getAllProductsOrder", data);
  });
}

export function deleteOrder(data) {
  return new Promise((resolve) => {
    ipcRenderer.once("deleteOrder-reply", (_, arg) => {
      resolve(arg);
    });
    ipcRenderer.send("deleteOrder", data);
  });
}

export function editOrder(data) {
  return new Promise((resolve) => {
    ipcRenderer.once("editOrder-reply", (_, arg) => {
      console.log("arg", arg);
      resolve(arg);
    });
    ipcRenderer.send("editOrder", data);
  });
}
export function deleteProductOrder(data) {
  return new Promise((resolve) => {
    ipcRenderer.once("deleteProductOrder-reply", (_, arg) => {
      resolve(arg);
    });
    ipcRenderer.send("deleteProductOrder", data);
  });
}
