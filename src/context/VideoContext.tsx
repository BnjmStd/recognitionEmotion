import { createContext, useContext, useState } from "react";

export interface VideoItem {
  id: string;
  url: string;
  createdAt: Date;
}

interface VideoContextType {
  videos: VideoItem[];
  addVideo: (url: string) => void;
  removeVideo: (id: string) => void;
}

const VideoContext = createContext<VideoContextType | undefined>(undefined);

export const VideoProvider = ({ children }: { children: React.ReactNode }) => {
  const [videos, setVideos] = useState<VideoItem[]>([]);

  const addVideo = (url: string) => {
    const newVideo: VideoItem = {
      id: crypto.randomUUID(),
      url,
      createdAt: new Date(),
    };
    setVideos((prev) => [newVideo, ...prev]);
  };

  const removeVideo = (id: string) => {
    setVideos((prev) => prev.filter((video) => video.id !== id));
  };

  return (
    <VideoContext.Provider value={{ videos, addVideo, removeVideo }}>
      {children}
    </VideoContext.Provider>
  );
};

export const useVideoContext = (): VideoContextType => {
  const context = useContext(VideoContext);
  if (!context) {
    throw new Error("useVideoContext must be used within a VideoProvider");
  }
  return context;
};
