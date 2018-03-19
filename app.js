const electron = require('electron');
var url = require('url');
var path = require('path');

const { app, BrowserWindow, Menu, ipcMain } = electron;

let indexWindow;
let addWindow;
let listStudentwindow;

//process.env.NODE_ENV = 'production';

// Listen for app to be ready
app.on('ready', function() {
    //create new window
    indexWindow = new BrowserWindow({});
    // load html into window
    indexWindow.loadURL(url.format({
        pathname: path.join(__dirname, '/views/index.html'),
        protocol: 'file:',
        slashes: true
    }));
    //Closes both windows
    indexWindow.on('closed', function() {
        app.quit();
    });
    //build menu from template
    const mainMenu = Menu.buildFromTemplate(mainMenuTemplate);
    //Insert menu
    Menu.setApplicationMenu(mainMenu);
});

function signIn() {
    // load html into window
    indexWindow.loadURL(url.format({
        pathname: path.join(__dirname, '/views/index.html'),
        protocol: 'file:',
        slashes: true
    }));
    //Closes both windows
    indexWindow.on('closed', function() {
        app.quit();
    });
    //build menu from template
    const mainMenu = Menu.buildFromTemplate(mainMenuTemplate);
    //Insert menu
    Menu.setApplicationMenu(mainMenu);
}

//Handles create add window 
function createAddWindow() {
    indexWindow.loadURL(url.format({
        pathname: path.join(__dirname, '/views/new.html'),
        protocol: 'file:',
        slashes: true
    }));
    //Garbage collection handles 
    indexWindow.on('close', function() {
        indexWindow = null;
    });
}
// List student window
function createStdList() {
    // load html into window
    indexWindow.loadURL(url.format({
        pathname: path.join(__dirname, '/views/students.html'),
        protocol: 'file:',
        slashes: true
    }));
    //Garbage collection handles 
    indexWindow.on('close', function() {
        indexWindow = null;
    });
}

// Create menu template
const mainMenuTemplate = [{
        label: 'Admin Panel',
        accelerator: process.platform == 'darwin' ? 'Command+F' : 'Ctrl+F',
        click() {
            signIn();
        }
    },
    {
        label: 'Add Member',
        accelerator: process.platform == 'darwin' ? 'Command+N' : 'Ctrl+N',
        click() {
            createAddWindow();
        }
    },
    {
        label: 'Member List',
        click() {
            createStdList();
        }
    },
    {
        label: 'Quit',
        accelerator: process.platform == 'darwin' ? 'Command+Q' : 'Ctrl+Q',
        click() {
            app.quit();
        }
    }
];

//If mac add space
if (process.platform == 'darwin') {
    mainMenuTemplate.unshift({});
}

//Add developer tools if not in prod
if (process.env.NODE_ENV !== 'production') {
    mainMenuTemplate.push({
        label: 'Developer tools',
        submenu: [{
                label: 'Developer tool',
                click(item, focusedWindow) {
                    focusedWindow.toggleDevTools();
                },
                accelerator: process.platform == 'darwin' ? 'Command+I' : 'Ctrl+I',
            },
            {
                role: 'reload'
            }
        ]
    });
}