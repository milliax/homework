const { app } = require("electron")

const BrowserWindow = electron.BrowserWindow

const path = require("path")
const url = require("url")

let mainWindow = null

const createWindow = () => {
    mainWindow = new BrowserWindow({ width: 800, height: 600 })

    mainWindow.loadFile(`${__dirname}/index.html`)
}

app.on('ready', () => {

})