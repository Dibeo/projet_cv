import ollama from 'ollama'
import * as fs from 'fs';
import path from "path";
import getMaxListeners from "events";
import CurriculumVitae from "./Entity/CurriculumVitae.js"
import ExtractedTermOrExpression from "./Entity/ExtractedTermOrExpression.js"
import Lien from "./Entity/Lien.js"

/**
 *  Structure for storage of ROMEO's API's response
 */
export interface api_response {
  scope: string;
  expires_in: string;
  token_type: string;
  access_token: string;
}

/**
 * Structure storing a term (word or expression) before its treatment
 */
export interface term {
  label: string;
  code: string;
  type: string;
  confidence: number;
}

export interface fileJSON {
  domainesExpertise: string[],
  Competences: string[],
  Diplomes: string[]
}


/**
 * Genere un token d'acces à ROMEO
 * @returns api_response
 */
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


// Ollama's prompt
const prompt: string = `Extract the terms linked to professionnal competences and Metiers from the following text. The text will contain descriptions, and your task is to output a in a structured JSON file with all the information extracted. The JSON file's content must be organized in the following fields :
1. domainesExpertise
2. Competences
3. Diplomes
Respond only with the JSON as requested, without adding comments or explanations. Your response must be readable by a JSON parser`;


/**
 * utilise ollama pour obtenir un fichier JSON contenant les informations importantes du texte
 * @param file fichier texte non traité
 * @returns chemin d'acces du fichier traité
 */
export async function summarizeText(file: string): Promise<string> {
  let content: string = fs.readFileSync("uploads/" + file, "utf-8");
  const message = {
    role: "user",
    content: `${prompt} This is the text: ${content}`,
  };
  const response = await ollama.chat({
    model: "llama3.2",
    messages: [message],
  });
  const outputFilePath = path.join("uploads", `${"summary_" + file}`);
  fs.writeFileSync(outputFilePath, response.message.content.replace(/[`']/g, ''));
  return outputFilePath;
}

/**
 * parses json file and calls RomeoTerm
 * WARNING: partially working
 */
export async function getSkill(filename: string): Promise<string> {
  const fetch_auth: api_response = await getAccessToken();
  const access_token: string = fetch_auth.access_token;
  const summarizedFile = await summarizeText(filename);

  let JSONterm: fileJSON = JSON.parse(fs.readFileSync(summarizedFile, "utf-8"));

  // Does not work, uncomment only for testing purposes
  /*
  console.log(JSONterm);
  console.log(JSONterm.Competences);
  let regex = new RegExp(/("[^"]+"|[^"\s]+)/g);
  // Envoie des données à ROMEO
  for (let tmp of JSONterm.Competences) {
    let exp = tmp.match(regex)
    if (exp != null) {
      for (let i = 0; i < exp.length; i++) {
        let word = exp[i].replace(/^"([^"]+)"$/, "$1").replace(/\s+/, " ");
        let romeo_term = new RomeoTerm(word, access_token);
        romeo_term.registerInDB;
      }
    }
  }
  for (let tmp of JSONterm.Diplomes) {
    let exp = tmp.match(regex)
    if (exp != null) {
      for (let i = 0; i < exp.length; i++) {
        let word = exp[i].replace(/^"([^"]+)"$/, "$1").replace(/\s+/, " ");
        let romeo_term = new RomeoTerm(word, access_token);
        romeo_term.registerInDB;
      }
    }
  }
  for (let tmp of JSONterm.domainesExpertise) {
    let exp = tmp.match(regex)
    if (exp != null) {
      for (let i = 0; i < exp.length; i++) {
        let word = exp[i].replace(/^"([^"]+)"$/, "$1").replace(/\s+/, " ");
        let romeo_term = new RomeoTerm(word, access_token);
        romeo_term.registerInDB;
      }
    }
  }
  */

  return summarizedFile;
}


/**
 * class in charge of all data parsing related to romeo
 * also puts the data in the database
 */
export default class RomeoTerm {
  /* -- WORK IN PROGRESS -- */

  private _Expression: string;
  private _Competences: term[];
  private _Metiers: string[];

  constructor(data: string, token: string) {
    this._Expression = data;
    this._Competences = [];
    this._Metiers = [];
    this.ask_api(token);
  }

  get_Expression(): string { return this._Expression }
  get_Competences(): term[] {
    return this._Competences;
  }

  public async ask_api(token: string) {
    // competences
    const url = "https://api.francetravail.io/partenaire/romeo/v2/predictionCompetences";

    const competences = {
      headers: {
        "Authorization": "Bearer " + token,
        'Content-Type': 'application/json; charset=utf-8',
        Accept: 'application/json; charset=utf-8, application/json'
      },
      body: '{\n  "competences": [\n  {\n  "intitule": "' + this._Expression + '",\n  "identifiant": "123"\n  }\n  ],\n  "options": {\n  "nomAppelant": "francetravail",\n  "nbResultats": 2,\n  "seuilScorePrediction": 0.7\n  }\n}',
      method: "POST",
    };
    try {
      const response = await fetch(url, competences);
      try {
        const data = await response.json();
        data[0].competencesRomeo.forEach((elt: any) => {
          console.log(elt);
          let term_competence: term = {
            code: elt.codeCompetence,
            label: elt.libelleCompetence,
            confidence: elt.scorePrediction,
            type: elt.typeCompetance
          }
          this._Competences.push(term_competence);
        });
        console.log("data[0].competencedRomeo : " + JSON.stringify(data[0].competencesRomeo));

      }
      catch (error) {
        console.error("Error while trying to read response: " + error);
        console.error(response);
      }

    } catch (error) {
      console.error(error);
    }

    await new Promise(resolve => setTimeout(resolve, 2000))

    // Metiers
    const url2 = "https://api.francetravail.io/partenaire/romeo/v2/predictionMetiers";

    const metiers = {
      headers: {
        "Authorization": "Bearer " + token,
        'Content-Type': 'application/json; charset=utf-8',
        Accept: 'application/json; charset=utf-8, application/json'
      },
      body: '{\n  "appellations": [\n  {\n  "intitule": "' + this._Expression + '",\n  "identifiant": "123"\n  }\n  ],\n  "options": {\n  "nomAppelant": "francetravail",\n  "nbResultats": 2,\n  "seuilScorePrediction": 0.7\n  }\n}',
      method: "POST",
    };
    try {
      const response = await fetch(url2, metiers);
      try {
        const data = await response.json();
        data[0].metiersRome.forEach((elt: any) => {
          console.log(elt);
          let term_metier: string = elt.libelleAppellation;
          this._Metiers.push(term_metier);
        });
        console.log("data[0].metiersRomeo : " + JSON.stringify(data[0].metiersRomeo));

      }
      catch (error) {
        console.error("Error while trying to read response: " + error);
        console.error(response);
      }

    } catch (error) {
      console.error(error);
    }

    await new Promise(resolve => setTimeout(resolve, 2000))

    console.log(competences);
  }

  public registerInDB(cv: CurriculumVitae): [ExtractedTermOrExpression, Lien[]] {
    let extract = new ExtractedTermOrExpression();
    extract.extracted_term_or_expression = this._Expression;
    extract.is_term = true;
    extract.curriculumVitae = cv;

    let match: Lien[] = [];
    this._Competences.forEach(e => {
      let tmp = new Lien();
      tmp.extractedTermOrExpression = extract;
      tmp.skill_or_job = e.label;
      tmp.is_skill = true;
      match.push(tmp);
    });

    this._Metiers.forEach(e => {
      let tmp = new Lien();
      tmp.extractedTermOrExpression = extract;
      tmp.skill_or_job = e;
      tmp.is_skill = false;
      match.push(tmp);
    })
    return [extract, match];
  }
}