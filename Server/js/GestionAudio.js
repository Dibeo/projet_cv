import ollama from 'ollama';
import * as fs from 'fs';
import path from "path";
// Gestion de Roméo
export async function getAccessToken() {
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
export async function summarizeText(file) {
    let content = fs.readFileSync("uploads/" + file, "utf-8");
    const message = {
        role: "user",
        content: `Extract keywords (competences, places, skills, work experience, fields of experience...) from this text: ${content}`,
    };
    const response = await ollama.chat({
        model: "llama3.2",
        messages: [message],
    });
    const outputFilePath = path.join("uploads", `${"summary_" + file}`);
    fs.writeFileSync(outputFilePath, response.message.content);
    return outputFilePath;
}
