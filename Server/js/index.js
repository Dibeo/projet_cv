import express from "express";
import cors from "cors";
import multer from "multer";
import { exec } from "child_process";
import util from "util";
const app = express();
const upload = multer({ dest: "uploads/" });
const execPromise = util.promisify(exec);
// Configuration CORS pour que le fetch avec un localhost fonctionne
app.use(cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST"], // Autorise les méthodes HTTP nécessaires
}));
// Route pour télécharger et traiter le fichier audio
app.post('/upload-audio', upload.single('audio'), (req, res) => {
    try {
        // Access the uploaded file using req.file
        console.log('Uploaded file:', req.file);
        // Process the audio file (e.g., save it, transcribe it, etc.)
        res.json({ success: true });
    }
    catch (error) {
        console.error('Error uploading audio:', error);
        res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
});
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
