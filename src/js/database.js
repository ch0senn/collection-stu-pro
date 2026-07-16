import { ProjectStore } from "../data/ProjectStore.js";

export const database = new ProjectStore();

database.load();
