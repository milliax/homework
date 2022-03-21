"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const electron_1 = require("electron");
electron_1.contextBridge.exposeInMainWorld('myAPI', {
    update: (count) => electron_1.ipcRenderer.send('update-title', count),
});
