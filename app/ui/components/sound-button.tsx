"use client";

import { audios } from "@/app/lib/data";
import * as LucideIcons from "lucide-react";
import { useEffect, useRef, useState } from "react";

interface SoundButtonProps {
  children: string;
  iconName: keyof typeof LucideIcons;
  size?: number;
}

export default function SoundButton({
  children,
  iconName,
  size,
}: SoundButtonProps) {
  const Icon = LucideIcons[iconName] as React.ComponentType<{ size?: number }>;

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [volume, setVolume] = useState<number>(0.5);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const audio = new Audio(selectAudio());
      audio.loop = true;
      audioRef.current = audio;
      audioRef.current.volume = 0.5
    }
  }, []);

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play();
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  if (!Icon) {
    return null;
  }

  function selectAudio() {
    const iconDisplayName = (Icon as { displayName?: string }).displayName;
    const found = audios.find((audio) => audio.name === iconDisplayName);
    return found?.url || "";
  }

  return (
    <div className="flex flex-col items-center gap-2">
      <button
        onClick={() => setIsPlaying(!isPlaying)}
        className={`flex flex-col items-center gap-2 hover:text-blue-600 ${isPlaying? "text-blue-600" : ""
          }`}
      >
        <Icon size={size} />
        {children}
      </button>
      <div className="flex gap-2">
        <input
          type="range"
          min="0"
          max="1"
          step="0.1"
          className="cursor-pointer accent-slate-700 w-24"
          onChange={(e) => setVolume(parseFloat(e.target.value))}
        />
      </div>
    </div>
  );
}