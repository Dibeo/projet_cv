var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import "reflect-metadata";
import { DataSource } from "typeorm";
import Personne from "./Entity/personnes.js";
import Ville from "./Entity/villes.js";
// Configurer la connexion à la base de données
const AppDataSource = new DataSource({
    type: "sqlite",
    database: "database/result_cv.db",
    synchronize: true, // Auto-crée les tables définies dans les entités
    logging: true,
    entities: [Personne],
});
// Fonction principale pour initialiser la base de données
const databaseGest = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Initialiser la connexion
        yield AppDataSource.initialize();
        console.log("Base de données initialisée et connectée");
        // Vérifier si des opérations supplémentaires sont nécessaires
        const repositoryV = AppDataSource.getRepository(Ville);
        // Exemple : Ajouter une personne
        const newVille = repositoryV.create({
            codV: "P0120120",
            nomV: "Ville",
        });
        yield repositoryV.save(newVille);
        const repositoryP = AppDataSource.getRepository(Personne);
        const newPerson = repositoryP.create({
            codP: "12345678",
            nom: "Dupont",
            prenom: "Jean",
            ville: "P0120120",
        });
        yield repositoryP.save(newPerson);
        console.log("Nouvelle personne ajoutée :", newPerson);
    }
    catch (error) {
        console.error("Erreur lors de l'initialisation de la base de données :", error);
    }
    finally {
        // Fermer la connexion (facultatif dans TypeORM car elle reste gérée par le DataSource)
        yield AppDataSource.destroy();
        console.log("Connexion fermée");
    }
});
export default databaseGest;
