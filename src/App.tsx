import "./App.css";
import { CaptureAudio } from "./components/CaptureAudio";
import { CaptureVideo } from "./components/CaptureVideo";
import { SaveRecording } from "./components/SavedRecording";

function App() {
  return (
    <main className="landing-layout main-section">
      <div className="capture-container">
        <CaptureVideo />
        <CaptureAudio />
        <SaveRecording />
      </div> 
    </main>
  );
}

export default App;
