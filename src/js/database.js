export class Database {

    constructor() {

        this.collections = [];

    }

    add(collection) {

        this.collections.push(collection);

    }

    remove(index) {

        this.collections.splice(index,1);

    }

    all() {

        return this.collections;

    }

}
