# Sujet 

Clicker [ici](https://franckbarbier.com/DMiNer/Curriculum_vitae.html) pour voir le sujet complet.

# Bibliothèques utilisées :
- **[Material UI](https://mui.com/)** : Style de la page
- **[SweetAlert 2](https://sweetalert2.github.io/)** : Gestion des alertes
- **[Driver.JS](https://driverjs.com/)** : Les guided tour
- **[React](https://fr.react.dev/)** : framework React
- **[Whisper](https://openai.com/index/whisper/)** : IA Speech-to-text

# Installing server manually (to change):

### Requirements:
    
To run the app, you need to install python 3.10 + dev toolkit + virtualenv:

- **ubuntu/debian** : ''' sudo apt install -y python3-full python3-dev python3.10 python3.10-dev python3-virtualenv '''
- **fedora** : ''' sudo apt install -y python3-full python3-devel python3.10 python3.10-devel python3-virtualenv '''
- **windows** : ''' https://www.python.org/downloads/release/python-3100/ & pip install virtualenv '''

### Commands to install:

'''
virtualenv -p python3.10 python_stt && \
source python_stt/bin/activate && \
python -m pip install -U pip && \
pip install --upgrade wheel setuptools && \
pip install openai-whisper
'''

# Installing server with docker (not working yet):

read "docker stuff.txt" for instructions

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

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
