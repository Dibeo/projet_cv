# PROJET CV

EN: A prototype of a web app realized by two students from the UPPA that extracts essential information from an audio/video job appliance and puts that information in a database

FR: Un prototype d'application web réalisé par deux étudiants de l'UPPA qui extrait les informations d'un CV enregistré en audio/vidéo dans une base de donnée

# Subject 

EN: Click [here](https://franckbarbier.com/DMiNer/Curriculum_vitae.html) to access the complete subject.

FR: Clicker [ici](https://franckbarbier.com/DMiNer/Curriculum_vitae.html) pour voir le sujet complet.

# Bibliothèques utilisées :
- **[Material UI](https://mui.com/)** : Styling
- **[SweetAlert 2](https://sweetalert2.github.io/)** : Alerts management
- **[Driver.JS](https://driverjs.com/)** : Guided tours
- **[React](https://fr.react.dev/)** : framework React
- **[Vite](https://vite.dev/)** : Vite (project boostrap)
- **[Whisper](https://openai.com/index/whisper/)** : IA Speech-to-text
- **[LLama AI](https://www.llama.com)** : IA Text summarizing
- **[ROMEOv2](https://francetravail.io/data/api/romeo-2)** : FranceTravail API to extract skills

** mettre à jour la liste des bibliotheques utilisées **

# Installing server manually (to change):

### Requirements:
    
EN: To run the app, you need to install python 3.10 + dev toolkit + virtualenv:

FR: Pour utiliser l'application, vous dervrez installer python 3.10 + dev toolkit + virtualenv:

- **ubuntu/debian** : ``` sudo apt install -y python3-full python3-dev python3.10 python3.10-dev python3-virtualenv ```
- **fedora** : ``` sudo apt install -y python3-full python3-devel python3.10 python3.10-devel python3-virtualenv ```
- **windows** : ``` https://www.python.org/downloads/release/python-3100/ & pip install virtualenv ```

### Commands to install server:

``` chmod +x install_whisper.sh && ./installs_whisper.sh ``` in project root.

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