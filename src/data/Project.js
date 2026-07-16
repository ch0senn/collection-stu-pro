import { randomUUID } from "uuid";

export class Project {

    constructor() {

        this.id = randomUUID();

        this.name = "Untitled Project";

        this.description = "";

        this.created = new Date().toISOString();

        this.modified = this.created;

        this.collections = [];

    }

}
