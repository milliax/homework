import path from "path";
import {BrowserWindow,app} from "electron";

if (process.env.NODE_env === "development"){
    const execPath = process.platform === "win32" ?
        "../node_modules/electron/dist/electron.exe" :
        ".../node_modules/.bin/electron";
    require("electron-reload")(__dirname,{
        electron: path.resolve(__dirname,execPath),
    })
}

let mainWindow = null

const createWindow = () => {
    mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences:{
            preload: path.resolve(__dirname,"preload.js"),
        }
    })
    mainWindow.loadFile("index.html")
}

app.whenReady().then(() => {
    createWindow()
})

app.once("window-all-closed",()=> app.quit())