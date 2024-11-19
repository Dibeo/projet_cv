var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
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
app.use(cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST"], // Autorise les méthodes HTTP nécessaires
}));
// Route pour télécharger et traiter le fichier audio
app.post("/upload-audio", upload.single("audio"), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Access the uploaded file using req.file
        const uploadedFilePath = req.file.path;
        console.log("Uploaded file:", uploadedFilePath);
        try {
            // Créer un environnement virtuel
            yield execPromise("bash -c 'virtualenv -p python3.10 python_stt'");
            // Exécuter la commande whisper dans l'environnement virtuel
            const command = `bash -c 'source python_stt/bin/activate && whisper ${uploadedFilePath} --model turbo --output_format txt'`;
            const { stdout, stderr } = yield execPromise(command);
            if (stderr) {
                console.error("Error processing audio:", stderr);
                throw new Error(stderr);
            }
            console.log("Command output:", stdout);
        }
        catch (error) {
            console.error("Error processing audio:", error);
            throw error;
        }
        // Chemin vers un fichier de sortie (par exemple, un fichier texte)
        const outputFilePath = path.join("uploads", `processed_${req.file.filename}.txt`);
        console.log("Audio processing complete:", outputFilePath);
        // Répondre avec le chemin du fichier traité
        res.json({ success: true, outputFilePath });
    }
    catch (error) {
        console.error("Error uploading audio:", error);
        res.status(500).json({ success: false, error: "Internal Server Error" });
    }
}));
// Route /ping
app.get("/ping", (req, res) => {
    console.log("Ping route called");
    return res.send("pong\n");
});
// Lancement du serveur
const PORT = 8080;
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
