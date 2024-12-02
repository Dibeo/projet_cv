import AppDataSource from "./AppDataSource.js";
import Ville from "./Entity/villes.js";
import Personne from "./Entity/personnes.js";
import Competence from "./Entity/competences.js";
import PersonneCompetence from "./Entity/personnes-competences.js";
// Fonction pour récupérer toutes les données des tables
export const fetchAllTablesData = async () => {
    try {
        const villeRepository = AppDataSource.getRepository(Ville);
        const personneRepository = AppDataSource.getRepository(Personne);
        const competenceRepository = AppDataSource.getRepository(Competence);
        const personneCompetenceRepository = AppDataSource.getRepository(PersonneCompetence);
        const villes = await villeRepository.find();
        const personnes = await personneRepository.find({ relations: ["ville"] });
        const competences = await competenceRepository.find();
        const personneCompetences = await personneCompetenceRepository.find({
            relations: ["personne", "competence"],
        });
        return {
            villes,
            personnes,
            competences,
            personneCompetences,
        };
    }
    catch (error) {
        console.error("Erreur lors de la récupération des données :", error);
        throw error;
    }
};
export const dataToHTML = (data) => {
    let html = `
    <h1>Base de données</h1>
    
    <h2>Villes</h2>
    <table border="1">
      <tr><th>Code Ville</th><th>Nom Ville</th></tr>`;
    data.villes.forEach((ville) => {
        html += `<tr><td>${ville.codV}</td><td>${ville.nomV}</td></tr>`;
    });
    html += `</table>`;
    html += `
    <h2>Personnes</h2>
    <table border="1">
      <tr><th>Code Personne</th><th>Nom</th><th>Prénom</th><th>Ville</th></tr>`;
    data.personnes.forEach((personne) => {
        html += `<tr><td>${personne.codP}</td><td>${personne.nom}</td><td>${personne.prenom}</td><td>${personne.ville.nomV}</td></tr>`;
    });
    html += `</table>`;
    html += `
    <h2>Compétences</h2>
    <table border="1">
      <tr><th>Code Compétence</th><th>Intitulé</th></tr>`;
    data.competences.forEach((competence) => {
        html += `<tr><td>${competence.codC}</td><td>${competence.intitule}</td></tr>`;
    });
    html += `</table>`;
    html += `
    <h2>Personnes et leurs Compétences</h2>
    <table border="1">
      <tr><th>Personne</th><th>Compétence</th><th>Timecode (s)</th></tr>`;
    data.personneCompetences.forEach((pc) => {
        html += `<tr><td>${pc.personne.nom} ${pc.personne.prenom}</td><td>${pc.competence.intitule}</td><td>${pc.timecode}</td></tr>`;
    });
    html += `</table>`;
    return html;
};
export const dropTables = async () => {
    const queryRunner = AppDataSource.createQueryRunner();
    await queryRunner.connect();
    try {
        await queryRunner.query(`DROP TABLE IF EXISTS personne_competence`);
        await queryRunner.query(`DROP TABLE IF EXISTS personnes`);
        await queryRunner.query(`DROP TABLE IF EXISTS competences`);
        await queryRunner.query(`DROP TABLE IF EXISTS villes`);
        console.log("Tables supprimées avec succès.");
    }
    catch (error) {
        console.error("Erreur lors de la suppression des tables :", error);
    }
    finally {
        await queryRunner.release();
    }
};
