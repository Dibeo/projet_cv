import express, { Request, Response } from "express";
import cors from "cors";
import multer from "multer";
import { exec } from "child_process";
import util from "util";
import path from "path";

import databaseGest from "./database.js";
import AppDataSource from "./AppDataSource.js";
import { dataToHTML, fetchAllTablesData } from "./databaseFunctions.js";
import RomeoTerm, { getSkill } from "./GestionAudio.js";

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
    origin: true,
    methods: ["GET", "POST"], // Autorise les méthodes HTTP nécessaires
    credentials: true
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
      const command = `bash -c "source ../venv/bin/activate && mkdir -p uploads &&  cd ./uploads && whisper ../${uploadedFilePath} --model turbo --output_format txt"`;

      const { stdout, stderr } = await execPromise(command);

      if (stderr) {
        console.error("Error processing audio:", stderr);
        throw stderr;
      }

      console.log("Command output:", stdout);
    } catch (error) {
      console.error("Error processing audio:", error);
      throw error;
    }

    // Chemin vers un fichier de sortie (par exemple, un fichier texte)
    let outputFilePath = path.join(
      "uploads",
      `${req.file!.filename}.txt`
    );

    console.log("Audio processing complete:", outputFilePath);

    const summarizedFile = await getSkill(req.file!.filename + '.txt');

    console.log("Text summarizing complete:", summarizedFile);

    // Répondre avec le chemin du fichier traité
    res.json({ success: true, summarizedFile });
    res.status(200);
    console.log("succes");
  } catch (error) {
    console.log("echec");
    console.log(error);
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

  } catch (error) {
    res.status(500).json({ error: "Erreur lors de la récupération des données" });
  }
});



// Lancement du serveur
const PORT = 8080;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});