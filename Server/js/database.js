import AppDataSource from "./AppDataSource.js";
import CurriculumVitae from "./Entity/CurriculumVitae.js";
import ExtractedTermOrExpression from "./Entity/ExtractedTermOrExpression.js";
import Lien from "./Entity/Lien.js";
const databaseGest = async () => {
    try {
        // Repositories
        const curriculumVitaeRepository = AppDataSource.getRepository(CurriculumVitae);
        const extractedTermRepository = AppDataSource.getRepository(ExtractedTermOrExpression);
        const lienRepository = AppDataSource.getRepository(Lien);
        // Création de CVs
        const cvJean = curriculumVitaeRepository.create({
            production_date: new Date("2024-09-14"),
            production_place: "Paris",
            surname: "Dupont",
            forname: "Jean",
            mobile_phone: "1234567890",
            e_mail: "jean.dupont@example.com",
            audio: Buffer.from(""), // Exemple vide
            video: Buffer.from(""), // Exemple vide
        });
        const cvMarie = curriculumVitaeRepository.create({
            production_date: new Date("2024-09-14"),
            production_place: "Lyon",
            surname: "Durand",
            forname: "Marie",
            mobile_phone: "0987654321",
            e_mail: "marie.durand@example.com",
            audio: Buffer.from(""), // Exemple vide
            video: Buffer.from(""), // Exemple vide
        });
        await curriculumVitaeRepository.save([cvJean, cvMarie]);
        // Création de termes ou expressions extraits
        const termJS = extractedTermRepository.create({
            extracted_term_or_expression: "JavaScript",
            is_term: true,
            from: "00:01:00",
            to: "00:01:10",
            curriculumVitae: cvJean,
        });
        const termDB = extractedTermRepository.create({
            extracted_term_or_expression: "Database Management",
            is_term: true,
            from: "00:02:00",
            to: "00:02:15",
            curriculumVitae: cvJean,
        });
        const termTS = extractedTermRepository.create({
            extracted_term_or_expression: "TypeScript",
            is_term: true,
            from: "00:03:00",
            to: "00:03:15",
            curriculumVitae: cvMarie,
        });
        await extractedTermRepository.save([termJS, termDB, termTS]);
        // Création des liens entre termes extraits et compétences
        const lien1 = lienRepository.create({
            extractedTermOrExpression: termJS,
            skill_or_job: "JavaScript",
            is_skill: true,
        });
        const lien2 = lienRepository.create({
            extractedTermOrExpression: termDB,
            skill_or_job: "Database Management",
            is_skill: true,
        });
        const lien3 = lienRepository.create({
            extractedTermOrExpression: termTS,
            skill_or_job: "TypeScript",
            is_skill: true,
        });
        await lienRepository.save([lien1, lien2, lien3]);
        console.log("Données insérées avec succès !");
    }
    catch (error) {
        console.error("Erreur lors de l'initialisation de la base de données :", error);
    }
};
export default databaseGest;
