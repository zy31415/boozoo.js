/**
 * Created by zy on 7/3/17.
 */

const electron = require('electron');
const BrowserWindow = electron.BrowserWindow;

const path = require('path');
const url = require('url');

function settings (item, focusedWindow) {
    console.log("Settings..");
    // require('electron').dialog.showOpenDialog();

    let settings = new BrowserWindow(
        {
            parent: focusedWindow,
            title: "Settings",
            width: 400,
            height: 225
        }
    );

    console.log(path.join(__dirname, './settings.html'));

    settings.loadURL(url.format({
        pathname: path.join(__dirname, './settings.html'),
        protocol: 'file:',
        slashes: true
    }));

    settings.show();

}

module.exports.settings = settings;