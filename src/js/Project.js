// src/js/project.js

export class Project {

    constructor() {

        this.version = 1;

        this.name = "Untitled Project";

        this.created = new Date().toISOString();

        this.modified = this.created;

        this.collections = [];

    }

    addCollection(name) {

        this.collections.push({

            id: crypto.randomUUID(),

            name,

            description: "",

            images: []

        });

    }

    removeCollection(index) {

        this.collections.splice(index, 1);

    }

    renameCollection(index, name) {

        this.collections[index].name = name;

    }

    setDescription(index, description) {

        this.collections[index].description =
            description;

    }

}// src/js/project.js

export class Project {

    constructor() {

        this.version = 1;

        this.name = "Untitled Project";

        this.created = new Date().toISOString();

        this.modified = this.created;

        this.collections = [];

    }

    addCollection(name) {

        this.collections.push({

            id: crypto.randomUUID(),

            name,

            description: "",

            images: []

        });

    }

    removeCollection(index) {

        this.collections.splice(index, 1);

    }

    renameCollection(index, name) {

        this.collections[index].name = name;

    }

    setDescription(index, description) {

        this.collections[index].description =
            description;

    }

}
