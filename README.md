# Sujet 

Clicker [ici](https://franckbarbier.com/DMiNer/Curriculum_vitae.html) pour voir le sujet complet.

# Bibliothèques utilisées :
- **[Material UI](https://mui.com/)** : Style de la page
- **[SweetAlert 2](https://sweetalert2.github.io/)** : Gestion des alertes
- **[Driver.JS](https://driverjs.com/)** : Les guided tour
- **[React](https://fr.react.dev/)** : framework React
- **[Vite](https://vite.dev/)** : framework Vite
- **[Whisper](https://openai.com/index/whisper/)** : IA Speech-to-text

** mettre à jour la liste des bibliotheques utilisées **

# Installing server manually (to change):

### Requirements:
    
To run the app, you need to install python 3.10 + dev toolkit + virtualenv:

- **ubuntu/debian** : ``` sudo apt install -y python3-full python3-dev python3.10 python3.10-dev python3-virtualenv ```
- **fedora** : ``` sudo apt install -y python3-full python3-devel python3.10 python3.10-devel python3-virtualenv ```
- **windows** : ``` https://www.python.org/downloads/release/python-3100/ & pip install virtualenv ```

### Commands to install server:

``` chmod +x install_whisper.sh && ./installs_whisper.sh ``` in project root.

# Commands to start server:

``` cd ./Server && npm run construction && npm run start ``` in project root.

# Commands to start client:

``` npm run start ``` in project root.

# Getting Started

This project was bootstrapped with [Vite](https://vite.dev/).

## Available Scripts

In the project directory, you can run:

### `npm start` to run the project

### `npm run build` to compile the project (essential in server, used for prod build in client)