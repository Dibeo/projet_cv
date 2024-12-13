import express from "express";
import cors from "cors";
import multer from "multer";
import { exec } from "child_process";
import util from "util";
import path from "path";
import databaseGest from "./database.js";
import AppDataSource from "./AppDataSource.js";
import { dataToHTML, fetchAllTablesData } from "./databaseFunctions.js";
import ollama from 'ollama';
import * as fs from 'fs';
const app = express();
const upload = multer({ dest: "uploads/" });
const execPromise = util.promisify(exec);
AppDataSource.initialize()
    .then(() => {
    console.log("Base de données connectée");
})
    .catch((error) => console.error("Erreur de connexion à la base de données :", error));
// Configuration CORS pour que le fetch avec un localhost fonctionne
app.use(cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST"], // Autorise les méthodes HTTP nécessaires
}));
// Route pour télécharger et traiter le fichier audio
app.post("/upload-audio", upload.single("audio"), async (req, res) => {
    try {
        // Access the uploaded file using req.file
        const uploadedFilePath = req.file.path;
        console.log("Uploaded file:", uploadedFilePath);
        // try {
        // Exécuter la commande whisper dans l'environnement virtuel
        const command = `bash -c "source ../venv/bin/activate && mkdir -p uploads &&  cd ./uploads && whisper ../${uploadedFilePath} --model turbo --output_format txt"`;
        const { stdout, stderr } = await execPromise(command);
        /* if (stderr) {
          console.error("Error processing audio:", stderr);
          throw new Error(stderr);
        }
  
        console.log("Command output:", stdout);
      } catch (error) {
        console.error("Error processing audio:", error);
        //throw error;
      } */ // Il y a un problème avec pytorch qui renvoie une erreur alors que la conversion a lieu normallement, j'essaierai de résoudre ça plus tard
        // Chemin vers un fichier de sortie (par exemple, un fichier texte)
        const outputFilePath = path.join("uploads", `${req.file.filename}.txt`);
        console.log("Audio processing complete:", outputFilePath);
        summarizeText(outputFilePath);
        // Répondre avec le chemin du fichier traité
        res.json({ success: true, outputFilePath });
    }
    catch (error) {
        res.status(500).json({ success: false, error: "Internal Server Error" });
    }
});
// Route /ping
app.get("/ping", (req, res) => {
    console.log("Ping route called");
    res.send("pong\n");
});
// Route /database
app.get("/database-create", (req, res) => {
    console.log("DataBase Creation launch \n\t\t /!\ attention detruit tous\n");
    databaseGest();
    res.send("database created\n");
});
// fetch toutes les donnes de la base de données
app.get("/database", async (req, res) => {
    try {
        const data = await fetchAllTablesData(); // Récupérer les données
        const html = dataToHTML(data);
        res.send(html); // Renvoyer le HTML
    }
    catch (error) {
        res.status(500).json({ error: "Erreur lors de la récupération des données" });
    }
});
// Lancement du serveur
const PORT = 8080;
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
// Gestion de Roméo
async function getAccessToken() {
    let client_id = "PAR_projetanalysecv_74d1f244e9ee006caa6f515e5d58b48fc47230e0230a234302146b184257bf1e";
    let client_secret = "f9c068ddb822c9a758dd12c0ca98e0f8511336032ea36d91ca8ebf1031d4c652";
    const headers = new Headers();
    const request = new Request("https://entreprise.francetravail.fr/connexion/oauth2/access_token?realm=%2Fpartenaire", {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: "grant_type=client_credentials&client_id=" +
            client_id +
            "&client_secret=" +
            client_secret +
            "&scope=api_romeov2",
    });
    const result = await fetch(request)
        // the JSON body is taken from the response
        .then((res) => res.json())
        .then((res) => {
        // The response has an `any` type, so we need to cast
        // it to the `api_response` type, and return it from the promise
        return res;
    });
    return result;
}
const fetch_auth = await getAccessToken();
const access_token = fetch_auth.access_token;
async function summarizeText(file) {
    let content = fs.readFileSync(file, 'utf-8');
    const message = { role: 'user', content: `Extract keywords (competences, places, skills, work experience, fields of experience...) from this text: ${content}` };
    const response = await ollama.chat({ model: 'llama3.2', messages: [message], stream: true });
    for await (const part of response) {
        process.stdout.write(part.message.content);
    }
    console.log(response);
}
