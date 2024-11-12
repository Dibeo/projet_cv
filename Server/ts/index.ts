import express from "express";
import cors from "cors";
import multer from "multer";
import fs from "fs";
import { exec } from "child_process";
import util from "util";
import path from "path";

const app = express();
const upload = multer({ dest: "uploads/" });
const execPromise = util.promisify(exec);

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
      exec("virtualenv -p python3.10 python_stt");
      exec(`whisper ${uploadedFilePath} --model turbo --output_format txt`);

      // Exécuter la commande
      //await execPromise(command);
    } catch {
      console.log("Erreur lors du traitement");
    }
    //path vers un json ou un txt pour le traitement
    const outputFilePath = path.join(
      "uploads",
      `processed_${req.file!.filename}.mp3`
    );

    console.log("Audio processing complete:", outputFilePath);

    // Répondre avec le chemin du fichier traité
    res.json({ success: true, outputFilePath });
  } catch (error) {
    console.error("Error uploading audio:", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
});

// Route /ping
app.get("/ping", (req: any, res: any) => {
  console.log("Ping route called");
  return res.send("pong\n");
});

// Lancement du serveur
const PORT = 8080;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
