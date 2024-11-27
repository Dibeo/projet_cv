import AppDataSource from "./AppDataSource.js";
import Personne from "./Entity/personnes.js";
import Ville from "./Entity/villes.js";
const databaseGest = async () => {
    try {
        const repositoryVille = AppDataSource.getRepository(Ville);
        const newVille = repositoryVille.create({
            codV: "V0123456",
            nomV: "Paris",
        });
        await repositoryVille.save(newVille);
        const repositoryPersonne = AppDataSource.getRepository(Personne);
        const newPerson = repositoryPersonne.create({
            codP: "P1234567",
            nom: "Dupont",
            prenom: "Jean",
            tel: "1234567890",
            mail: "jean.dupont@example.com",
            nomRue: "Rue de Paris",
            codePos: "75000",
            numAdd: 12,
            ville: newVille, // Associe la ville
        });
        await repositoryPersonne.save(newPerson);
        console.log("Nouvelle personne ajoutée :", newPerson);
    }
    catch (error) {
        console.error("Erreur lors de l'initialisation de la base de données :", error);
    }
    finally {
        //await AppDataSource.destroy();
        //console.log("Connexion fermée");
    }
};
export default databaseGest;
