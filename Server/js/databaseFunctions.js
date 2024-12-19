import AppDataSource from "./AppDataSource.js";
import CurriculumVitae from "./Entity/CurriculumVitae.js";
import ExtractedTermOrExpression from "./Entity/ExtractedTermOrExpression.js";
import Lien from "./Entity/Lien.js";
// Fonction pour récupérer toutes les données des tables
export const fetchAllTablesData = async () => {
    try {
        const cvRepository = AppDataSource.getRepository(CurriculumVitae);
        const termRepository = AppDataSource.getRepository(ExtractedTermOrExpression);
        const lienRepository = AppDataSource.getRepository(Lien);
        const cvs = await cvRepository.find();
        const extractedTerms = await termRepository.find({
            relations: ["curriculumVitae"],
        });
        const liens = await lienRepository.find({
            relations: ["extractedTermOrExpression"],
        });
        return {
            cvs,
            extractedTerms,
            liens,
        };
    }
    catch (error) {
        console.error("Erreur lors de la récupération des données :", error);
        throw error;
    }
};
// Fonction pour générer du HTML à partir des données
export const dataToHTML = (data) => {
    let html = `
    <h1>Base de données</h1>
    
    <h2>Curriculum Vitae</h2>
    <table border="1">
      <tr>
        <th>CV ID</th>
        <th>Date de production</th>
        <th>Lieu de production</th>
        <th>Nom</th>
        <th>Prénom</th>
        <th>Téléphone</th>
        <th>Email</th>
      </tr>`;
    data.cvs.forEach((cv) => {
        html += `
      <tr>
        <td>${cv.curriculum_vitae_identity}</td>
        <td>${cv.production_date.toISOString().split("T")[0]}</td>
        <td>${cv.production_place}</td>
        <td>${cv.surname}</td>
        <td>${cv.forname}</td>
        <td>${cv.mobile_phone}</td>
        <td>${cv.e_mail}</td>
      </tr>`;
    });
    html += `</table>`;
    html += `
    <h2>Termes ou Expressions Extraites</h2>
    <table border="1">
      <tr>
        <th>Term ID</th>
        <th>Terme/Expression</th>
        <th>Est un terme</th>
        <th>Début (time)</th>
        <th>Fin (time)</th>
        <th>ID CV associé</th>
      </tr>`;
    data.extractedTerms.forEach((term) => {
        html += `
      <tr>
        <td>${term.extracted_term_or_expression_identity}</td>
        <td>${term.extracted_term_or_expression}</td>
        <td>${term.is_term ? "Oui" : "Non"}</td>
        <td>${term.from}</td>
        <td>${term.to}</td>
        <td>${term.curriculumVitae?.curriculum_vitae_identity}</td>
      </tr>`;
    });
    html += `</table>`;
    html += `
    <h2>Liens entre Termes et Compétences/Jobs</h2>
    <table border="1">
      <tr>
        <th>Lien ID</th>
        <th>Terme ID</th>
        <th>Compétence/Job</th>
        <th>Est une compétence</th>
      </tr>`;
    data.liens.forEach((lien) => {
        html += `
      <tr>
        <td>${lien.lien_identity}</td>
        <td>${lien.extractedTermOrExpression?.extracted_term_or_expression_identity}</td>
        <td>${lien.skill_or_job}</td>
        <td>${lien.is_skill ? "Oui" : "Non"}</td>
      </tr>`;
    });
    html += `</table>`;
    return html;
};
