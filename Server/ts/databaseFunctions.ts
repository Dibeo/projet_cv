import AppDataSource from "./AppDataSource.js"; // Importez votre DataSource
import Ville from "./Entity/villes.js";
import Personne from "./Entity/personnes.js";
import Competence from "./Entity/competences.js";

// Fonction pour récupérer toutes les données des tables
export const fetchAllTablesData = async () => {
  try {
    const villeRepository = AppDataSource.getRepository(Ville);
    const personneRepository = AppDataSource.getRepository(Personne);
    const competenceRepository = AppDataSource.getRepository(Competence);

    // Récupérer toutes les données des tables
    const villes = await villeRepository.find();
    const personnes = await personneRepository.find({ relations: ["ville"] });
    const competences = await competenceRepository.find();

    // Retourner les données sous forme d'objet
    return {
      villes,
      personnes,
      competences,
    };
  } catch (error) {
    console.error("Erreur lors de la récupération des données :", error);
    throw error; // Renvoyer l'erreur pour que l'appelant puisse la gérer
  }
};