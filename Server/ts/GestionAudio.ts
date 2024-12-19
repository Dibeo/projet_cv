import ollama from 'ollama'
import * as fs from 'fs';
import path from "path";
import { getMaxListeners } from "events";

export interface api_response {
  scope: string;
  expires_in: string;
  token_type: string;
  access_token: string;
}

// Gestion de Roméo
export async function getAccessToken(): Promise<api_response> {
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

export async function summarizeText(file: string): Promise<string> {
  let content: string = fs.readFileSync("uploads/" + file, "utf-8");
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
