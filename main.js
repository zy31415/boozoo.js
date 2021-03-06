const {app, BrowserWindow, Menu} = require('electron');
const path = require('path');
const url = require('url');


const Datastore = require('nedb');

let db = new Datastore({filename: './temp/boozoo.datafile.json'});


// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win;

app.on('ready', () => {
    createWindow();
});

// Quit when all windows are closed.
app.on('window-all-closed', () => {
    // On macOS it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
        app.quit()
    }
});

app.on('activate', () => {
    // On macOS it's common to re-create a window in the src when the
    // dock icon is clicked and there are no other windows open.
    if (win === null) {
        createWindow()
    }
});

function createWindow () {
    // Create the browser window.
    win = new BrowserWindow({width: 800, height: 600});

    // and load the index.html of the src.
    win.loadURL(url.format({
        pathname: path.join(__dirname, 'src/index.html'),
        protocol: 'file:',
        slashes: true
    }));

    win.once('ready-to-show', () => {
       win.show();
    });

    // Emitted when the window is closed.
    win.on('closed', () => {
        // Dereference the window object, usually you would store windows
        // in an array if your src supports multi windows, this is the time
        // when you should delete the corresponding element.
        win = null
    });

    Menu.setApplicationMenu(
        Menu.buildFromTemplate(require('./src/components/menu').template)
    );

    db.loadDatabase(function (err) {
        if (err !== null) {
            console.log("Database error!");
            console.log(err);
        }
    });

    let doc = { hello: 'world'
        , n: 5
        , today: new Date()
        , nedbIsAwesome: true
        , notthere: null
        , notToBeSaved: undefined  // Will not be saved
        , fruits: [ 'apple', 'orange', 'pear' ]
        , infos: { name: 'nedb' }
    };

    db.insert(doc, function (err, newDoc) {   // Callback is optional
        // newDoc is the newly inserted document, including its _id
        // newDoc has no key called notToBeSaved since its value was undefined
    });

}