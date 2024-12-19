import "reflect-metadata";
import { DataSource } from "typeorm";
import Lien from "./Entity/Lien.js";
import CurriculumVitae from "./Entity/CurriculumVitae.js";
import ExtractedTermOrExpression from "./Entity/ExtractedTermOrExpression.js";

const AppDataSource = new DataSource({
  type: "sqlite",
  database: "database/result_cv.db",
  synchronize: true,
  logging: true,
  entities: [Lien, CurriculumVitae, ExtractedTermOrExpression],
});

export default AppDataSource;
