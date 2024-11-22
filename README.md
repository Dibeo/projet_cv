# Sujet 

Clicker [ici](https://franckbarbier.com/DMiNer/Curriculum_vitae.html) pour voir le sujet complet.

# Bibliothèques utilisées :
- **[Material UI](https://mui.com/)** : Style de la page
- **[SweetAlert 2](https://sweetalert2.github.io/)** : Gestion des alertes
- **[Driver.JS](https://driverjs.com/)** : Les guided tour
- **[React](https://fr.react.dev/)** : framework React
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

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.