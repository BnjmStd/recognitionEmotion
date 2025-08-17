import { useRef, useState } from "react";
import { useVideoContext } from "../context/VideoContext";
import "./SavedRecording.css"; 

export const SaveVideos = () => {
  const { videos } = useVideoContext();
  const [playingId, setPlayingId] = useState<string | null>(null);

  const videoRefs = useRef<Record<string, HTMLVideoElement | null>>({});

  const handlePlayPause = (id: string) => {
    const video = videoRefs.current[id];
    if (!video) return;

    if (playingId === id) {
      video.pause();
      setPlayingId(null);
    } else {
      if (playingId && videoRefs.current[playingId]) {
        videoRefs.current[playingId]?.pause();
      }
      video.play();
      setPlayingId(id);
    }
  };

  return (
    <article className="saved-videos">
      <header>
        <h2>Saved Videos</h2>
      </header>

      <div className="saved-videos-list">
        {videos.map((video) => (
          <div
            key={video.id}
            className={`video-card ${playingId === video.id ? "playing" : ""}`}
            onClick={() => handlePlayPause(video.id)}
          >
            <video
              ref={(el) => (videoRefs.current[video.id] = el)}
              src={video.url}
              onEnded={() => setPlayingId(null)}
              preload="auto"
            />
            🎥
          </div>
        ))}
      </div>
    </article>
  );
};
