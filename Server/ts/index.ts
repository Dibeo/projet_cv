import express from "express";
import cors from "cors";
import multer from "multer";
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
      // Créer un environnement virtuel
      await execPromise("bash -c 'virtualenv -p python3.10 python_stt'");

      // Exécuter la commande whisper dans l'environnement virtuel
      const command = `bash -c 'source python_stt/bin/activate && whisper ${uploadedFilePath} --model turbo --output_format txt'`;
      const { stdout, stderr } = await execPromise(command);

      if (stderr) {
        console.error("Error processing audio:", stderr);
        throw new Error(stderr);
      }

      console.log("Command output:", stdout);
    } catch (error) {
      console.error("Error processing audio:", error);
      throw error;
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
