import "./App.css";
import RecordComponent from "./AudioContent/RecordComponent";
import Footer from "./MainContent/Footer";
import Header from "./MainContent/Header";


interface IAudioUploadResponse {
  success: boolean;
  message: string;
}

function App() {
  //utiliser unstepper mui pour suivre les etapes
  return (
    <div className="App">
      <Header />
      <RecordComponent />
      <Footer />
    </div>
  );
}

export default App;
