import "./App.css";
import Header from "./MainContent/Header";
import AppStepper from "./MainContent/Stepper";


interface IAudioUploadResponse {
  success: boolean;
  message: string;
}

function App() {
  //utiliser unstepper mui pour suivre les etapes
  return (
    <div className="App">
      <Header />
      <AppStepper />
      <footer style={{color:'white'}}>2024&reg;</footer>
    </div>
  );
}

export default App;
