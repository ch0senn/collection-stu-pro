import { Database } from "./database.js";

const database = new Database();

export function initialiseFeature001() {

    const tbody = document.querySelector("#collectionTable tbody");

    const version = document.getElementById("version");

    version.textContent =
        "Version " + window.collectionStudio.version();

    function refresh() {

        tbody.innerHTML = "";

        database.all().forEach((collection,index)=>{

            const row=document.createElement("tr");

            row.innerHTML=`
                <td>${collection.name}</td>
                <td>${collection.images}</td>
            `;

            row.onclick=()=>{

                document.getElementById("collectionName").value=collection.name;
                document.getElementById("collectionDescription").value=collection.description;
                tbody.dataset.selected=index;

            };

            tbody.appendChild(row);

        });

    }

    document
        .getElementById("newCollection")
        .onclick=()=>{

            database.add({

                name:"New Collection",
                description:"",
                images:0

            });

            refresh();

        };

    document
        .getElementById("saveCollection")
        .onclick=()=>{

            const selected=tbody.dataset.selected;

            if(selected===undefined)
                return;

            database.collections[selected].name=
                document.getElementById("collectionName").value;

            database.collections[selected].description=
                document.getElementById("collectionDescription").value;

            refresh();

        };

    document
        .getElementById("deleteCollection")
        .onclick=()=>{

            const selected=tbody.dataset.selected;

            if(selected===undefined)
                return;

            database.remove(selected);

            tbody.dataset.selected="";

            document.getElementById("collectionName").value="";
            document.getElementById("collectionDescription").value="";

            refresh();

        };

    refresh();

}
