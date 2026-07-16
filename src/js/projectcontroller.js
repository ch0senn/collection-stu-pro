// src/js/projectController.js

import { Project } from "./project.js";

export let project = new Project();

export async function save() {

    await window.studio.setProject(project);

}

window.studio.onProjectCreated(data => {

    Object.assign(project, data);

    document.dispatchEvent(
        new CustomEvent("projectChanged")
    );

});

window.studio.onProjectOpened(data => {

    Object.assign(project, data);

    document.dispatchEvent(
        new CustomEvent("projectChanged")
    );

});
