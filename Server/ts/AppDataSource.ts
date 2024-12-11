import "reflect-metadata";
import { DataSource } from "typeorm";
import Personne from "./Entity/personnes.js";
import Ville from "./Entity/villes.js";
import Competence from "./Entity/competences.js";
import PersonneCompetence from "./Entity/personnes-competences.js";

const AppDataSource = new DataSource({
  type: "sqlite",
  database: "database/result_cv.db",
  synchronize: true,
  logging: true,
  entities: [Personne, Ville, Competence, PersonneCompetence],
});

export default AppDataSource;
