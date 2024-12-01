import AppDataSource from "./AppDataSource.js";
import Personne from "./Entity/personnes.js";
import Ville from "./Entity/villes.js";
import Competence from "./Entity/competences.js";
import PersonneCompetence from "./Entity/personnes-competences.js";
import { dropTables } from "./databaseFunctions.js";
const databaseGest = async () => {
    try {
        // Supprimer les tables existantes
        console.log("Suppression des tables...");
        await dropTables();
        console.log("Tables supprimées avec succès.");
        // Repositories
        const villeRepository = AppDataSource.getRepository(Ville);
        const personneRepository = AppDataSource.getRepository(Personne);
        const competenceRepository = AppDataSource.getRepository(Competence);
        const personneCompetenceRepository = AppDataSource.getRepository(PersonneCompetence);
        // Création de villes
        const villeParis = villeRepository.create({ codV: "V0123456", nomV: "Paris" });
        const villeLyon = villeRepository.create({ codV: "V1234567", nomV: "Lyon" });
        await villeRepository.save([villeParis, villeLyon]);
        // Création de personnes
        const personneJean = personneRepository.create({
            codP: "P1234567",
            nom: "Dupont",
            prenom: "Jean",
            tel: "1234567890",
            mail: "jean.dupont@example.com",
            nomRue: "Rue de Paris",
            codePos: "75000",
            numAdd: 12,
            ville: villeParis,
        });
        const personneMarie = personneRepository.create({
            codP: "P7654321",
            nom: "Durand",
            prenom: "Marie",
            tel: "0987654321",
            mail: "marie.durand@example.com",
            nomRue: "Rue de Lyon",
            codePos: "69000",
            numAdd: 34,
            ville: villeLyon,
        });
        await personneRepository.save([personneJean, personneMarie]);
        // Création de compétences
        const competenceJS = competenceRepository.create({ codC: "C001", intitule: "JavaScript" });
        const competenceTS = competenceRepository.create({ codC: "C002", intitule: "TypeScript" });
        const competenceDB = competenceRepository.create({ codC: "C003", intitule: "Database Management" });
        await competenceRepository.save([competenceJS, competenceTS, competenceDB]);
        // Lier les personnes et leurs compétences via PersonneCompetence
        const pc1 = personneCompetenceRepository.create({
            personne: personneJean,
            competence: competenceJS,
            timecode: 124, // en secondes
        });
        const pc2 = personneCompetenceRepository.create({
            personne: personneJean,
            competence: competenceDB,
            timecode: 64,
        });
        const pc3 = personneCompetenceRepository.create({
            personne: personneMarie,
            competence: competenceTS,
            timecode: 180,
        });
        await personneCompetenceRepository.save([pc1, pc2, pc3]);
        console.log("Données insérées avec succès !");
    }
    catch (error) {
        console.error("Erreur lors de l'initialisation de la base de données :", error);
    }
};
export default databaseGest;
