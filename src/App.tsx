import "./App.css";
import AppStepper from "./MainContent/Stepper";


interface IAudioUploadResponse {
  success: boolean;
  message: string;
}

function App() {
  //utiliser unstepper mui pour suivre les etapes
  return (
    <div className="App">
      <header className="App-header">Projet 1</header>
      <AppStepper />
    </div>
  );
}

export default App;
