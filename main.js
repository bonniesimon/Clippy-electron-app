/**
 * TODO: add an authentication page; ie, add a page to login and then only can someone access this clipboard.
 */

const electron = require('electron');
const url = require('url');
const path = require('path');

const {app, BrowserWindow, ipcMain} = require('electron');
require('electron-reload')(__dirname);

let win, child;
function createWindow(){
    win = new BrowserWindow({
        title: 'ClippY',
        show : false,
        height:400,
        width:600,
        maxHeight:500,
        maxWidth:600,
        webPreferences:{
            nodeIntegration:true
        }
    });

    child = new BrowserWindow({
        parent:win,
        height:400,
        width:600,
        maxHeight:500,
        maxWidth:600,
        webPreferences:{
            nodeIntegration:true
        }
    })


    //Open DevTools
    // win.webContents.openDevTools();
    child.webContents.openDevTools();

    // win.loadURL(url.format({
    //     pathname : path.join('file://',__dirname, 'index.html'),
    //     protocol: 'file',
    //     slashes : true
    // }))

    /**
     * *To use live reload
     */
    win.loadURL(`file://${__dirname}/index.html`);
    child.loadURL(`file://${__dirname}/login.html`);

    // win.on('ready-to-show', ()=>{
        //     win.show();
        //     win.focus();
        // });
        
    //When WIndow closed
    win.on('closed', () => {
        // Dereference the window object, usually you would store windows
        // in an array if your app supports multi windows, this is the time
        // when you should delete the corresponding element.
        win = null
      })
}

ipcMain.on('entry-accepted',(event, arg)=>{
    if(arg == 'ping'){
        win.show();
        child.hide();
    }
})


app.on('ready',createWindow);


/**COde needed for windows app to close */
app.on('window-all-closed', () => {
    if(process.platform != 'darwin'){
        app.quit();
    }
});

/**Code for mac apps to close in addition to above code */
app.on('activate', () => {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (win === null) {
      createWindow()
    }
  })

