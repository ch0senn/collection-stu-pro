import { database } from "./database.js";

export function initialiseFeature001() {

    const tbody = document.querySelector("#collectionTable tbody");

    const project = database.getProject();

    document.getElementById("version").textContent =
        "Version " + window.collectionStudio.version();

    function refresh() {

        tbody.innerHTML = "";

        project.collections.forEach((collection, index) => {

            const row = document.createElement("tr");

            row.innerHTML = `
                <td>${collection.name}</td>
                <td>${collection.images}</td>
            `;

            row.onclick = () => {

                tbody.dataset.selected = index;

                document.getElementById("collectionName").value =
                    collection.name;

                document.getElementById("collectionDescription").value =
                    collection.description;

            };

            tbody.appendChild(row);

        });

    }

    document.getElementById("newCollection").onclick = () => {

        database.addCollection({

            name: "New Collection",

            description: "",

            images: 0

        });

        refresh();

    };

    document.getElementById("saveCollection").onclick = () => {

        const index = Number(tbody.dataset.selected);

        if (isNaN(index))
            return;

        database.updateCollection(index, {

            ...project.collections[index],

            name: document.getElementById("collectionName").value,

            description:
                document.getElementById("collectionDescription").value

        });

        refresh();

    };

    document.getElementById("deleteCollection").onclick = () => {

        const index = Number(tbody.dataset.selected);

        if (isNaN(index))
            return;

        database.removeCollection(index);

        tbody.dataset.selected = "";

        document.getElementById("collectionName").value = "";

        document.getElementById("collectionDescription").value = "";

        refresh();

    };

    refresh();

}
