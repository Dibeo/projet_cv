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
const databaseGest = async () => {
  try {
    // Initialiser la connexion
    await AppDataSource.initialize();
    console.log("Base de données initialisée et connectée");

    // Vérifier si des opérations supplémentaires sont nécessaires
    const repositoryV = AppDataSource.getRepository(Ville);

    // Exemple : Ajouter une personne
    const newVille = repositoryV.create({
      codV: "P0120120",
      nomV: "Ville",
    });
    await repositoryV.save(newVille);

    const repositoryP = AppDataSource.getRepository(Personne);
    const newPerson = repositoryP.create({
      codP: "12345678",
      nom: "Dupont",
      prenom: "Jean",
      ville: newVille,
    });
    await repositoryP.save(newPerson);
    console.log("Nouvelle personne ajoutée :", newPerson);
  } catch (error) {
    console.error(
      "Erreur lors de l'initialisation de la base de données :",
      error
    );
  } finally {
    // Fermer la connexion (facultatif dans TypeORM car elle reste gérée par le DataSource)
    await AppDataSource.destroy();
    console.log("Connexion fermée");
  }
};

export default databaseGest;
