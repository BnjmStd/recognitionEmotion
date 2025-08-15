import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { AudioProvider } from "./context/AudioContext.tsx";
import { VideoProvider } from "./context/VideoContext.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <VideoProvider>
      <AudioProvider>
        <App />
      </AudioProvider>
    </VideoProvider>
  </StrictMode>
);
