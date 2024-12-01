import express, { Request, Response } from "express";
import cors from "cors";
import multer from "multer";
import { exec } from "child_process";
import util from "util";
import path from "path";
import databaseGest from "./database.js";
import AppDataSource from "./AppDataSource.js";
import { fetchAllTablesData } from "./databaseFunctions.js";

const app = express();
const upload = multer({ dest: "uploads/" });
const execPromise = util.promisify(exec);

AppDataSource.initialize()
  .then(() => {
    console.log("Base de données connectée");
  })
  .catch((error) =>
    console.error("Erreur de connexion à la base de données :", error)
  );

// Configuration CORS pour que le fetch avec un localhost fonctionne
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST"], // Autorise les méthodes HTTP nécessaires
  })
);

// Route pour télécharger et traiter le fichier audio
app.post("/upload-audio", upload.single("audio"), async (req, res) => {
  try {
    // Access the uploaded file using req.file
    const uploadedFilePath = req.file!.path;
    console.log("Uploaded file:", uploadedFilePath);

    try {
      // Exécuter la commande whisper dans l'environnement virtuel
      const command = `bash -c "source ../python_stt/bin/activate && cd ./files && whisper ../${uploadedFilePath} --model turbo --output_format txt"`;

      const { stdout, stderr } = await execPromise(command);

      if (stderr) {
        console.error("Error processing audio:", stderr);
        throw new Error(stderr);
      }

      console.log("Command output:", stdout);
    } catch (error) {
      console.error("Error processing audio:", error);
      //throw error;
    }

    // Chemin vers un fichier de sortie (par exemple, un fichier texte)
    const outputFilePath = path.join(
      "uploads",
      `processed_${req.file!.filename}.txt`
    );

    console.log("Audio processing complete:", outputFilePath);

    // Répondre avec le chemin du fichier traité
    res.json({ success: true, outputFilePath });
  } catch (error) {
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
});

// Route /ping
app.get("/ping", (req: Request, res: Response) => {
  console.log("Ping route called");
  res.send("pong\n");
});

// Route /database
app.get("/database-create", (req: Request, res: Response) => {
  console.log("DataBase Creation launch");
  databaseGest();
  res.send("database created\n");
});

// fetch toutes les donnes de la base de données
app.get("/database", async (req: Request, res: Response) => {
  console.log("DataBase function launch");
  try {
    const data = await fetchAllTablesData();
    /* 
      Permet de voir tous le contenue de la bdd
    */

    // Générer le tableau HTML pour les villes
    const villesTable = `
      <table border="1">
        <thead>
          <tr>
            <th>Code</th>
            <th>Nom</th>
          </tr>
        </thead>
        <tbody>
          ${data.villes
            .map(
              (ville) => `
            <tr>
              <td>${ville.codV}</td>
              <td>${ville.nomV}</td>
            </tr>
          `
            )
            .join("")}
        </tbody>
      </table>`;

    // Générer le tableau HTML pour les personnes
    const personnesTable = `
      <table border="1">
        <thead>
          <tr>
            <th>Code</th>
            <th>Nom</th>
            <th>Prénom</th>
            <th>Ville</th>
            <th>Adresse</th>
            <th>Téléphone</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          ${data.personnes
            .map(
              (personne) => `
            <tr>
              <td>${personne.codP}</td>
              <td>${personne.nom}</td>
              <td>${personne.prenom}</td>
              <td>${personne.ville?.nomV || "Non spécifiée"}</td>
              <td>${personne.numAdd} ${personne.nomRue}, ${personne.codePos}</td>
              <td>${personne.tel}</td>
              <td>${personne.mail}</td>
            </tr>
          `
            )
            .join("")}
        </tbody>
      </table>`;

    // Générer le tableau HTML pour les compétences
    const competencesTable = `
      <table border="1">
        <thead>
          <tr>
            <th>Code</th>
            <th>Intitulé</th>
          </tr>
        </thead>
        <tbody>
          ${data.competences
            .map(
              (competence) => `
            <tr>
              <td>${competence.codC}</td>
              <td>${competence.intitule}</td>
            </tr>
          `
            )
            .join("")}
        </tbody>
      </table>`;

    // Générer la réponse HTML complète
    const htmlResponse = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Données de la Base</title>
        <style>
          table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 20px;
          }
          th, td {
            padding: 8px;
            text-align: left;
            border: 1px solid #ddd;
          }
          th {
            background-color: #f4f4f4;
          }
        </style>
      </head>
      <body>
        <h1>Villes</h1>
        ${villesTable}

        <h1>Personnes</h1>
        ${personnesTable}

        <h1>Compétences</h1>
        ${competencesTable}
      </body>
      </html>`;

    // Envoyer la réponse HTML
    res.send(htmlResponse);
  } catch (error) {
    console.error("Erreur lors de la récupération des données :", error);
    res.status(500).send("<h1>Erreur lors de la récupération des données</h1>");
  }
});


// Lancement du serveur
const PORT = 8080;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

interface api_response {
  scope: string;
  expires_in: string;
  token_type: string;
  access_token: string;
}

// Gestion de Roméo
async function getAccessToken(): Promise<api_response> {
  let client_id: string =
    "PAR_projetanalysecv_74d1f244e9ee006caa6f515e5d58b48fc47230e0230a234302146b184257bf1e";
  let client_secret: string =
    "f9c068ddb822c9a758dd12c0ca98e0f8511336032ea36d91ca8ebf1031d4c652";

  const headers: Headers = new Headers();

  const request: RequestInfo = new Request(
    "https://entreprise.francetravail.fr/connexion/oauth2/access_token?realm=%2Fpartenaire",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body:
        "grant_type=client_credentials&client_id=" +
        client_id +
        "&client_secret=" +
        client_secret +
        "&scope=api_romeov2",
    }
  );

  const result = await fetch(request)
    // the JSON body is taken from the response
    .then((res) => res.json())
    .then((res) => {
      // The response has an `any` type, so we need to cast
      // it to the `api_response` type, and return it from the promise
      return res as api_response;
    });
  return result;
}

const fetch_auth: api_response = await getAccessToken();
const access_token: string = fetch_auth.access_token;
console.log("Access token: " + access_token);
