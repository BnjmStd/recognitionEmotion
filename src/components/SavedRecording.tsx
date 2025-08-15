  import { useRef, useState } from "react";
  import { useAudioContext } from "../context/AudioContext";
  import "./SavedRecording.css";

  export const SaveRecording = () => {
    const { audios } = useAudioContext();
    const [playingId, setPlayingId] = useState<string | null>(null);

    const audioRefs = useRef<Record<string, HTMLAudioElement | null>>({});

    const handlePlayPause = (id: string, url: string) => {
      const audio = audioRefs.current[id];

      if (!audio) return;

      if (playingId === id) {
        audio.pause();
        setPlayingId(null);
      } else {
        if (playingId && audioRefs.current[playingId]) {
          audioRefs.current[playingId]?.pause();
        }
        audio.play();
        setPlayingId(id);
      }
    };

    return (
      <article className="saved-audios">
        <header>
          <h2>Saved Recordings</h2>
        </header>

        <div className="saved-audios-list">
          {audios.map((audio) => (
            <div
              key={audio.id}
              className={`audio-card ${playingId === audio.id ? "playing" : ""}`}
              onClick={() => handlePlayPause(audio.id, audio.url)}
            >
              <audio
                ref={(el) => (audioRefs.current[audio.id] = el)}
                src={audio.url}
                onEnded={() => setPlayingId(null)}
                preload="auto"
              />
              🎵
            </div>
          ))}
        </div>
      </article>
    );
  };
