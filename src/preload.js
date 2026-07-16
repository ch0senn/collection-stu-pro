const { contextBridge } = require("electron");

contextBridge.exposeInMainWorld("collectionStudio", {

    version() {
        return "0.1.0";
    }

});
