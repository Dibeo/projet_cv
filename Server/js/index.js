var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import fastify from "fastify";
import cors from "@fastify/cors";
import fs from "fs";
import { exec } from "child_process";
import util from "util";
import path from "path";
import fastifyMultipart from "@fastify/multipart";
const server = fastify();
const execPromise = util.promisify(exec);
// Configuration CORS pour que le fecth avec un loclhost fonctionne
server.register(cors, {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"], // Autorise les méthodes HTTP nécessaires
});
server.register(fastifyMultipart);
// Route pour télécharger et traiter le fichier audio
server.post("/upload-audio", (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
    // Utilisation de .file() pour obtenir le fichier téléchargé
    const data = yield request.file();
    if (!data) {
        return reply.status(400).send({
            success: false,
            message: "Aucun fichier reçu",
        });
    }
    console.log("reception de demande d'upload");
    const audioFilePath = path.join(__dirname, "uploads", data.filename);
    // Utilisation de fs.createWriteStream pour écrire le fichier sur disque
    const writeStream = fs.createWriteStream(audioFilePath);
    data.file.pipe(writeStream);
    // Attendez que le fichier soit complètement écrit sur le disque
    writeStream.on("finish", () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            // Exécute une commande bash sur le fichier audio (exemple avec ffmpeg)
            const outputFilePath = path.join(__dirname, "uploads", `output_${data.filename}`);
            console.log(audioFilePath);
            //await execPromise(`ffmpeg -i ${audioFilePath} ${outputFilePath}`); // Remplacez la commande par celle de votre choix
            return reply.status(200).send({
                success: true,
                message: "Fichier audio traité avec succès",
            });
        }
        catch (error) {
            console.error("Erreur lors du traitement de l'audio:", error);
            return reply.status(500).send({
                success: false,
                message: "Erreur lors du traitement du fichier audio",
            });
        }
        finally {
            // Suppression du fichier d'origine car plus nécessaire
            fs.unlink(audioFilePath, (err) => {
                if (err)
                    console.error("Erreur lors de la suppression du fichier:", err);
            });
        }
    }));
    // Gestion d'erreur
    writeStream.on("error", (err) => {
        console.error("Erreur lors de l'enregistrement du fichier:", err);
        return reply.status(500).send({
            success: false,
            message: "Erreur lors de l'enregistrement du fichier audio",
        });
    });
}));
// Route /ping
server.get("/ping", (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Ping route called");
    return "pong\n";
}));
// Route /auth
server.get("/auth", {
    preValidation: (request, reply, done) => {
        const { username, password } = request.query;
        if (username !== "admin") {
            console.log("Unauthorized access attempt on /auth");
            done(new Error("Must be admin"));
        }
        else {
            done();
        }
    },
}, (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Auth route called");
    const customerHeader = request.headers["h-Custom"];
    // do something with request data
    reply.status(200).send({ success: true });
}));
// Lancement du serveur
server.listen({ port: 8080 }, (err, address) => {
    if (err) {
        console.error(err);
        process.exit(1);
    }
    console.log(`Server listening at ${address}`);
});
