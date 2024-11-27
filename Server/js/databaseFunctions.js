import AppDataSource from "./AppDataSource.js"; // Importez votre DataSource
import Ville from "./Entity/villes.js";
import Personne from "./Entity/personnes.js";
// Fonction pour récupérer toutes les données des tables
export const fetchAllTablesData = async () => {
    try {
        const villeRepository = AppDataSource.getRepository(Ville);
        const personneRepository = AppDataSource.getRepository(Personne);
        // Récupérer toutes les données des tables
        const villes = await villeRepository.find();
        const personnes = await personneRepository.find({ relations: ["ville"] });
        // Retourner les données sous forme d'objet
        return {
            villes,
            personnes,
        };
    }
    catch (error) {
        console.error("Erreur lors de la récupération des données :", error);
        throw error; // Renvoyer l'erreur pour que l'appelant puisse la gérer
    }
};
