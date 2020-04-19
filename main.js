const {app, BrowserWindow, ipcMain} = require('../electron')
const path = require('path')
const countdown = require(path.join(__dirname, '/countdown.js'))
require(path.join(__dirname, '/menu.js'))
let window

function createWindow() {

    // const menu = require('menu.js')
    // Create the browser window.
    window = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true
        }
    })

    // and load the index.html of the app.
    window.loadURL(path.join('file://', __dirname, 'src/index.html'))
    // window.loadFile('src/index.html')

}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', () => {
    // On macOS it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('activate', () => {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow()
    }
})

ipcMain.on('demo-start', _ => {
    countdown(count => {
        window.webContents.send('countdown', count)
    })
})