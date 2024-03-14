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

export function getAllOrder() {
  return new Promise((resolve) => {
    ipcRenderer.once("getAllOrder-reply", (_, arg) => {
      resolve(arg);
    });
    ipcRenderer.send("getAllOrder", undefined);
  });
}

// export function editProduct(data) {
//   return new Promise((resolve) => {
//     ipcRenderer.once("editProduct-reply", (_, arg) => {
//       resolve(arg);
//     });
//     ipcRenderer.send("editProduct", data);
//   });
// }

// export function deleteProduct(data) {
//   return new Promise((resolve) => {
//     ipcRenderer.once("deleteProduct-reply", (_, arg) => {
//       resolve(arg);
//     });
//     ipcRenderer.send("deleteProduct", data);
//   });
// }
