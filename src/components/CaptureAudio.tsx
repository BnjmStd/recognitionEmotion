import { useRef, useState } from "react";
import "./CaptureAudio.css";

export const CaptureAudio = () => {
  const [recording, setRecording] = useState(false);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(
    null
  );
  const [isPlaying, setIsPlaying] = useState(false);

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
        setAudioUrl(url);
      };

      recorder.start();
      setMediaRecorder(recorder);
      setRecording(true);
    } catch (error) {
      console.error("Error al iniciar grabación:", error);
    }
  };

  const stopRecording = () => {
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
              <img src="/figure.png" alt="" />
            </figure>

            <div className="audio-info">
              <div>
                <h2>
                  {recording
                    ? "Recording..."
                    : audioUrl
                    ? "Audio Ready"
                    : "No Audio"}
                </h2>
                <small>Tap the record</small>
              </div>

              <div className="buttons-audio">
                <div className="play-audio">
                  {/* Botón Play */}
                  <button
                    type="button"
                    onClick={handlePlay}
                    disabled={!audioUrl}
                    className={`${
                      !isPlaying ? "visible" : "hidden"
                    } button-primary`}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="white"
                      width={24}
                      height={24}
                    >
                      <path d="M19.376 12.4161L8.77735 19.4818C8.54759 19.635 8.23715 19.5729 8.08397 19.3432C8.02922 19.261 8 19.1645 8 19.0658V4.93433C8 4.65818 8.22386 4.43433 8.5 4.43433C8.59871 4.43433 8.69522 4.46355 8.77735 4.5183L19.376 11.584C19.6057 11.7372 19.6678 12.0477 19.5146 12.2774C19.478 12.3323 19.4309 12.3795 19.376 12.4161Z"></path>
                    </svg>
                  </button>

                  {/* Botón Pause */}
                  <button
                    type="button"
                    onClick={handlePause}
                    disabled={!audioUrl}
                    className={isPlaying ? "visible" : "hidden"}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      width={24}
                      height={24}
                    >
                      <path d="M15 7C15 6.44772 15.4477 6 16 6C16.5523 6 17 6.44772 17 7V17C17 17.5523 16.5523 18 16 18C15.4477 18 15 17.5523 15 17V7ZM7 7C7 6.44772 7.44772 6 8 6C8.55228 6 9 6.44772 9 7V17C9 17.5523 8.55228 18 8 18C7.44772 18 7 17.5523 7 17V7Z"></path>
                    </svg>
                  </button>
                </div>

                <button className="button-primary">start</button>
              </div>
            </div>
          </div>
        </div>

        {audioUrl && (
          <audio
            ref={audioRef}
            src={audioUrl}
            onEnded={() => setIsPlaying(false)}
            controls
            hidden
          ></audio>
        )}
      </div>
    </article>
  );
};
