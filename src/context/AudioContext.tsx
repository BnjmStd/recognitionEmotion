import { createContext, useContext, useState } from "react";

export interface AudioItem {
  id: string;
  url: string;
  createdAt: Date;
}

interface AudioContextType {
  audios: AudioItem[];
  addAudio: (url: string) => void;
  removeAudio: (id: string) => void;
}

const AudioContext = createContext<AudioContextType | undefined>(undefined);

export const AudioProvider = ({ children }: { children: React.ReactNode }) => {
  const [audios, setAudios] = useState<AudioItem[]>([]);

  const addAudio = (url: string) => {
    const newAudio: AudioItem = {
      id: crypto.randomUUID(),
      url,
      createdAt: new Date(),
    };
    setAudios((prev) => [newAudio, ...prev]);
  };

  const removeAudio = (id: string) => {
    setAudios((prev) => prev.filter((audio) => audio.id !== id));
  };

  return (
    <AudioContext.Provider value={{ audios, addAudio, removeAudio }}>
      {children}
    </AudioContext.Provider>
  );
};

export const useAudioContext = (): AudioContextType => {
  const context = useContext(AudioContext);
  if (!context) {
    throw new Error("useAudioContext must be used within an AudioProvider");
  }
  return context;
};
