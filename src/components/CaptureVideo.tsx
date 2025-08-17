import { useEffect, useRef, useState } from "react";
import { useVideoContext } from "../context/VideoContext"; 
import "./CaptureVideo.css";

export const CaptureVideo = () => {
  const { addVideo } = useVideoContext();
  const videoRef = useRef<HTMLVideoElement>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [recording, setRecording] = useState(false);
  const chunks = useRef<Blob[]>([]);

  useEffect(() => {
    // pedir permiso a la cámara
    const initCamera = async () => {
      try {
        const userStream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true,
        });
        setStream(userStream);
        if (videoRef.current) {
          videoRef.current.srcObject = userStream;
        }
      } catch (err) {
        console.error("Error accediendo a la cámara:", err);
      }
    };

    initCamera();

    return () => {
      // limpiar stream cuando se desmonta
      stream?.getTracks().forEach((track) => track.stop());
    };
  }, []);

  const startRecording = () => {
    if (!stream) return;
    chunks.current = [];
    const recorder = new MediaRecorder(stream);
    mediaRecorderRef.current = recorder;

    recorder.ondataavailable = (e) => {
      if (e.data.size > 0) {
        chunks.current.push(e.data);
      }
    };

    recorder.onstop = () => {
      const blob = new Blob(chunks.current, { type: "video/webm" });
      const url = URL.createObjectURL(blob);

      // guardar en el contexto
      addVideo(url);
    };

    recorder.start();
    setRecording(true);
  };

  const stopRecording = () => {
    mediaRecorderRef.current?.stop();
    setRecording(false);
  };

  return (
    <article className="capture-video">
      <div className="capture-video--container">
        <header>
          <h2>Video Recording</h2>
        </header>

        <div className="capture-video--preview">
          <video ref={videoRef} autoPlay playsInline muted />
        </div>

        <div className="capture-video--controls">
          {!recording ? (
            <button onClick={startRecording}>🎥 Start</button>
          ) : (
            <button onClick={stopRecording}>⏹ Stop</button>
          )}
        </div>
      </div>
    </article>
  );
};
