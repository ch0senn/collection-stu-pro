import Store from "electron-store";
import { Project } from "./Project.js";

const store = new Store({

    name: "collection-studio-pro",

    defaults: {

        currentProject: null,

        recentProjects: []

    }

});

export class ProjectStore {

    constructor() {

        this.project = null;

    }

    createProject() {

        this.project = new Project();

        this.save();

        return this.project;

    }

    load() {

        const data = store.get("currentProject");

        if (!data) {

            this.project = new Project();

            this.save();

            return this.project;

        }

        this.project = data;

        return this.project;

    }

    save() {

        if (!this.project)
            return;

        this.project.modified = new Date().toISOString();

        store.set("currentProject", this.project);

    }

    getProject() {

        return this.project;

    }

    addCollection(collection) {

        this.project.collections.push(collection);

        this.save();

    }

    updateCollection(index, collection) {

        this.project.collections[index] = collection;

        this.save();

    }

    removeCollection(index) {

        this.project.collections.splice(index, 1);

        this.save();

    }

}
