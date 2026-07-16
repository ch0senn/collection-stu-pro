// src/main.js

const {
    app,
    BrowserWindow,
    ipcMain,
    dialog,
    Menu
} = require("electron");

const fs = require("fs");
const path = require("path");

let mainWindow;
let currentProject = null;
let dirty = false;

function updateTitle() {

    let title = "Collection Studio Pro";

    if (currentProject)
        title += " - " + path.basename(currentProject);

    if (dirty)
        title += " *";

    if (mainWindow)
        mainWindow.setTitle(title);

}

function saveProject(file) {

    if (!global.projectData)
        return false;

    fs.writeFileSync(
        file,
        JSON.stringify(global.projectData, null, 4),
        "utf8"
    );

    currentProject = file;
    dirty = false;

    updateTitle();

    return true;

}

function loadProject(file) {

    const json = JSON.parse(
        fs.readFileSync(file, "utf8")
    );

    currentProject = file;

    global.projectData = json;

    dirty = false;

    updateTitle();

    return json;

}

async function createWindow() {

    mainWindow = new BrowserWindow({

        width: 1500,

        height: 900,

        backgroundColor: "#1d1f22",

        webPreferences: {

            preload: path.join(__dirname, "preload.js"),

            contextIsolation: true,

            nodeIntegration: false

        }

    });

    await mainWindow.loadFile("src/index.html");

    buildMenu();

    updateTitle();

}

function buildMenu() {

    const template = [

        {

            label: "File",

            submenu: [

                {

                    label: "New Project",

                    accelerator: "CmdOrCtrl+N",

                    click() {

                        currentProject = null;

                        global.projectData = {

                            version: 1,

                            name: "Untitled Project",

                            created: new Date().toISOString(),

                            modified: new Date().toISOString(),

                            collections: []

                        };

                        dirty = false;

                        updateTitle();

                        mainWindow.webContents.send(
                            "project-created",
                            global.projectData
                        );

                    }

                },

                {

                    label: "Open...",

                    accelerator: "CmdOrCtrl+O",

                    async click() {

                        const result =
                            await dialog.showOpenDialog({

                                filters: [

                                    {

                                        name: "Collection Studio",

                                        extensions: ["csp"]

                                    }

                                ],

                                properties: [

                                    "openFile"

                                ]

                            });

                        if (result.canceled)
                            return;

                        const project =
                            loadProject(result.filePaths[0]);

                        mainWindow.webContents.send(
                            "project-opened",
                            project
                        );

                    }

                },

                {

                    label: "Save",

                    accelerator: "CmdOrCtrl+S",

                    async click() {

                        if (!currentProject) {

                            const result =
                                await dialog.showSaveDialog({

                                    filters: [

                                        {

                                            name: "Collection Studio",

                                            extensions: ["csp"]

                                        }

                                    ]

                                });

                            if (result.canceled)
                                return;

                            saveProject(result.filePath);

                            return;

                        }

                        saveProject(currentProject);

                    }

                },

                {

                    label: "Save As...",

                    accelerator: "CmdOrCtrl+Shift+S",

                    async click() {

                        const result =
                            await dialog.showSaveDialog({

                                filters: [

                                    {

                                        name: "Collection Studio",

                                        extensions: ["csp"]

                                    }

                                ]

                            });

                        if (result.canceled)
                            return;

                        saveProject(result.filePath);

                    }

                },

                {

                    type: "separator"

                },

                {

                    role: "quit"

                }

            ]

        }

    ];

    Menu.setApplicationMenu(
        Menu.buildFromTemplate(template)
    );

}

ipcMain.handle("set-project", (_, project) => {

    global.projectData = project;

    dirty = true;

    updateTitle();

});

ipcMain.handle("get-project", () => {

    return global.projectData;

});

app.whenReady().then(() => {

    global.projectData = {

        version: 1,

        name: "Untitled Project",

        created: new Date().toISOString(),

        modified: new Date().toISOString(),

        collections: []

    };

    createWindow();

});

app.on("window-all-closed", () => {

    if (process.platform !== "darwin")
        app.quit();

});
