import "./App.css";
import { CaptureAudio } from "./components/CaptureAudio";
import { CaptureVideo } from "./components/CaptureVideo";
import { SaveRecording } from "./components/SavedRecording";
import { SaveVideos } from "./components/SavedVideos";

function App() {
  return (
    <main className="landing-layout main-section">
      <div className="capture-container">
        <CaptureVideo />
        <CaptureAudio />
        <SaveRecording />
        <SaveVideos />
      </div> 
    </main>
  );
}

export default App;
