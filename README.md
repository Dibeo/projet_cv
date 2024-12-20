# PROJET CV

EN: A prototype of a web app realized by two students from the UPPA that extracts essential information from an audio/video job appliance and puts that information in a database

FR: Un prototype d'application web réalisé par deux étudiants de l'UPPA qui extrait les informations d'un CV enregistré en audio/vidéo dans une base de donnée

# Subject 

EN: Click [here](https://franckbarbier.com/DMiNer/Curriculum_vitae.html) to access the complete subject.

FR: Clicker [ici](https://franckbarbier.com/DMiNer/Curriculum_vitae.html) pour voir le sujet complet.

# Liste des tâches fonctionnels

## Travail à faire
- [V] Extraire de l'audio les termes et expressions correspondant à :
  - [ ] Compétences et métiers reconnus accessibles via l'API de France Travail (ex. soudure, soudage à l'arc électrique, soudage au laser).
  - [ ] Notions relatives à la mobilité (ex. Pau, Auch, La Rochelle, Sud-Ouest).
- [ ] Indexer dans l'audio les termes et expressions extraits :
  - [ ] Repérer les points temporels.
  - [ ] Éliminer les phases audio/vidéo non pertinentes pour obtenir une vidéo de **1 min. 30 max**.
- [V] Sauvegarder le résultat dans une base de données :
  - [ ] MySQL ou MariaDB.
  - [V] Utiliser TypeORM (script SQL).

## Technologies
- [V] Enregistrer la vidéo et l'audio via une interface Web dans le navigateur :
  - [V] Gérer le format MP4 (audio intégré) ou des fichiers séparés (audio/vidéo synchronisés).
- [V] Choisir une technologie pour l'extraction de texte à partir de l'audio :
  - [ ] Librairies payantes : VoiceCue (Deepgram), AssemblyAI, Google AI, AWS Transcribe.
  - [ ] Librairies open source (ex. DeepSpeech).


# Used software/libraries :
- **[Material UI](https://mui.com/)** : Styling
- **[SweetAlert 2](https://sweetalert2.github.io/)** : Alerts management
- **[Driver.JS](https://driverjs.com/)** : Guided tours
- **[React](https://fr.react.dev/)** : framework React
- **[Vite](https://vite.dev/)** : Vite (project boostrap)
- **[Whisper](https://openai.com/index/whisper/)** : IA Speech-to-text
- **[Ollama JS](https://github.com/ollama/ollama-js)** : IA Text summarizing
- **[ROMEOv2](https://francetravail.io/data/api/romeo-2)** : FranceTravail API to extract skills
- **[SQLite](https://www.sqlite.org/)** : Database
- **[typeORM](https://typeorm.io/)** : ORM

# Installing server manually (to change):

### Requirements:
    
EN: To run the app, you need to install python >= 3.10 + virtualenv + ffmpeg:

FR: Pour utiliser l'application, vous dervrez installer python >= 3.9 <= 3.11 > + virtualenv:

- **ubuntu** : 
``` sudo add-apt-repository ppa:deadsnakes/ppa ```
``` sudo apt-get update ```
``` sudo apt install -y python3-full python3-dev python3.11 python3-virtualenv + ffmpeg ```
- **debian 12** : (ex for python 11): ``` sudo apt install -y python3-full python3-dev python3.11 python3.11-dev python3-virtualenv + ffmpeg ```
- **fedora 40/41** : (ex for python 10): ``` sudo apt install -y python3-full python3-devel python3.10 python3.10-devel python3-virtualenv + ffmpeg ```
- **windows** : (ex for python 12): ``` https://www.python.org/downloads/release/python-3120/ & pip3 install virtualenv ```

You also need to download llama3.2 with [ollama](https://ollama.com/download/)
``` ollama serve && ollama pull llama3.2 ```

### Commands to install server:

``` chmod +x install_whisper.sh && ./install_whisper.sh ``` or ```bash install_whisper.sh``` in project root.

# Commands to start server:

``` cd ./Server && npm run construction && npm run start ``` in project root.

# Commands to start client:

``` npm run start ``` in project root.

## Available Scripts

In the project directory, you can run:

### `npm start` to run the project

### `npm run build` to compile the project (essential in server, used for prod build in client)

# Notes

- EN: The first audio file conversion will take a long time due to Whisper initializing for the first time and downloading the model.
  FR: La première conversion de fichier audio prendra beaucoup de temps car Whisper doit s'initialiser pour la première fois et télécharger le model.
- EN: As this is prototype, it uses the free Romeo API so expect the app to be slow.
  FR: Etant donné que cette application est un prototype, elle utilise l'API gratuit de Romeo, attendez vous donc à ce qu'elle soit lente.
- EN: Every library/software other than Romeo is Open-source
  FR: Tous les logiciels/librairies utilisées sont Open-source
