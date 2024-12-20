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

const prompt: string = `You are an artificial intelligence designed to extract structured information from descriptive text and convert it into a JSON format compatible with a database. Below are the entities and their respective fields you must identify in the text:

1. Curriculum Vitae (CV)
- curriculum_vitae_identity: Unique identifier for the CV (if not provided, generate a unique numeric identifier).
- production_date: Date the CV was produced (format: YYYY-MM-DD).
- production_place: Place where the CV was produced.
- surname: Last name of the person.
- forname: First name of the person.
- birth_date: Date of birth (format: YYYY-MM-DD, optional).
- identity_number: Identity number (13 characters, optional).
- checksum: Verification code (2 characters, optional).
- mobile_phone: Phone number.
- e_mail: Email address.
- audio: Link or identifier of an associated audio file.
- video: Link or identifier of an associated video file.

2. Extracted Terms or Expressions
- extracted_term_or_expression_identity: Unique identifier for the term or expression.
- extracted_term_or_expression: Content of the term or expression.
- is_term: Indicates if it is a term (true) or an expression (false).
- from: Start time in the audio file (format: HH:MM:SS).
- to: End time in the audio file (format: HH:MM:SS).
- curriculum_vitae_identity: Reference to the associated CV identifier.

3. Links
- match_identity: Unique identifier for the link.
- extracted_term_or_expression_identity: Reference to an extracted term or expression.
- skill_or_job: Name of the related skill or job.
- is_skill: Indicates if it is a skill (true) or a job (false).

Input Text:  
The text will contain descriptions, and your task is to output a structured JSON object with all the information extracted. Respond only with the JSON object as requested, without adding comments or explanations.`;

export async function summarizeText(file: string): Promise<string> {
  let content: string = fs.readFileSync("uploads/" + file, "utf-8");
  const message = {
    role: "user",
    content: `${prompt} From this text: ${content}`,
  };
  const response = await ollama.chat({
    model: "llama3.2",
    messages: [message],
  });
  const outputFilePath = path.join("uploads", `${"summary_" + file}`);
  fs.writeFileSync(outputFilePath, response.message.content);
  return outputFilePath;
}
