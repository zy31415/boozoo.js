/**
 * Created by zy on 7/3/17.
 */

const electron = require('electron');
const BrowserWindow = electron.BrowserWindow;

const path = require('path');
const url = require('url');

function addBook(item, focusedWindow) {

    let settings = new BrowserWindow(
        {
            parent: focusedWindow,
            title: "Settings",
            width: 400,
            height: 500,
        }
    );

    settings.loadURL(url.format({
        pathname: path.join(__dirname, './addBook.html'),
        protocol: 'file:',
        slashes: true
    }));

    settings.show();
}

module.exports.addBook = addBook;