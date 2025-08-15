import { useRef, useState } from "react";
import "./CaptureAudio.css";
import { useAudioContext } from "../context/AudioContext";

export const CaptureAudio = () => {
  const { addAudio } = useAudioContext();

  const [recording, setRecording] = useState(false);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(
    null
  );

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const chunksRef = useRef<Blob[]>([]);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);

      recorder.ondataavailable = (e: BlobEvent) => {
        chunksRef.current.push(e.data);
      };

      recorder.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: "audio/webm" });
        chunksRef.current = [];

        const url = URL.createObjectURL(blob);
        setAudioUrl(url); // lo usamos en este componente
        addAudio(url); // y lo guardamos globalmente
      };

      recorder.start();
      setMediaRecorder(recorder);
      setRecording(true);
    } catch (error) {
      console.error("Error al iniciar grabación:", error);
    }
  };

  const stopRecordingAndSave = () => {
    if (mediaRecorder) {
      mediaRecorder.stop();
      setRecording(false);
    }
  };

  const handlePlay = () => {
    if (audioRef.current) {
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  const handlePause = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };

  return (
    <article className="capture-audio">
      <div className="capture-audio--aux">
        <div className="capture-audio--container">
          <header>
            <h2>Audio Recording</h2>
            <ul>
              <li>
                <button className="button-primary">Analyze Recording</button>
              </li>
            </ul>
          </header>
        </div>

        <div className="capture-audio--preview-container">
          <div className="capture-audio--preview">
            <figure>
              <img src="./figure.png" alt="" />
            </figure>
                    <div className="audio-info">
          <div>
            <h2>{recording ? "Grabando..." : "Listo para grabar"}</h2>
            <small>Tap the record</small>
          </div>
          <ul className="audio-controls">
            {!recording ? (
              <li>
                <button onClick={startRecording} aria-label="Iniciar grabación">
                  ⏺️
                </button>
              </li>
            ) : (
              <li>
                <button
                  onClick={stopRecordingAndSave}
                  aria-label="Detener grabación y guardar"
                >
                  ⏹️
                </button>
              </li>
            )}

            {audioUrl && !isPlaying && (
              <li>
                <button onClick={handlePlay} aria-label="Reproducir audio">
                  ▶️
                </button>
              </li>
            )}

            {audioUrl && isPlaying && (
              <li>
                <button onClick={handlePause} aria-label="Pausar audio">
                  ⏸️
                </button>
              </li>
            )}
          </ul>
        </div>
          </div>
        </div>


      </div>

      {audioUrl && (
        <audio
          ref={audioRef}
          src={audioUrl}
          onEnded={() => setIsPlaying(false)}
          preload="auto"
          hidden
        />
      )}
    </article>
  );
};

// {" "}
// <li>
//   {" "}
//   <button onClick={startRecording} aria-label="Iniciar grabación">
//     ⏺️
//   </button>{" "}
// </li>{" "}
// <li>
//   {" "}
//   <button aria-label="Pausar grabación">⏸️</button>{" "}
// </li>{" "}
// <li>
//   {" "}
//   <button aria-label="Reanudar grabación">▶️</button>{" "}
// </li>{" "}
// <li>
//   {" "}
//   <button
//     onClick={stopRecordingAndSave}
//     aria-label="Detener grabación y guardar"
//   >
//     ⏹️
//   </button>{" "}
// </li>{" "}
// <li>
//   {" "}
//   <button aria-label="Reproducir video grabado">🎬</button>{" "}
// </li>{" "}
// <li>
//   {" "}
//   <button aria-label="Guardar video">💾</button>{" "}
// </li>{" "}
// <li>
//   {" "}
//   <button aria-label="Eliminar video">🗑️</button>{" "}
// </li>{" "}
// <li>
//   {" "}
//   <button aria-label="Descartar cambios">❌</button>{" "}
// </li>{" "}
// <li>
//   {" "}
//   <button aria-label="Regrabar video">🔁</button>{" "}
// </li>{" "}
// <li>
//   {" "}
//   <button aria-label="Silenciar micrófono">🎙️🚫</button>{" "}
// </li>{" "}
// <li>
//   {" "}
//   <button aria-label="Cambiar cámara">🔄📷</button>{" "}
// </li>{" "}
