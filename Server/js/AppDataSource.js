import "reflect-metadata";
import { DataSource } from "typeorm";
import Personne from "./Entity/personnes.js";
import Ville from "./Entity/villes.js";
import Competence from "./Entity/competences.js";
const AppDataSource = new DataSource({
    type: "sqlite",
    database: "database/result_cv.db",
    synchronize: true,
    logging: true,
    entities: [Personne, Ville, Competence],
});
export default AppDataSource;
