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
  const Icon = LucideIcons[iconName] as React.ElementType;

  // Alteração 1: Inicialize o useRef com null e crie o objeto Audio dentro de um useEffect
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [volume, setVolume] = useState<number>(0.5);

  // Alteração 2: Crie o objeto Audio apenas no lado do cliente
  useEffect(() => {
    if (typeof window !== "undefined") {
      audioRef.current = new Audio(selectAudio());
      audioRef.current.loop = true; // Configura o loop aqui
    }
  }, []);

  // Alteração 3: Use o audioRef.current dentro de useEffect para evitar erros de referência
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

  // Alteração 4: A função selectAudio agora retorna a URL do áudio, não um objeto Audio
  function selectAudio() {
    const found = audios.find((audio) => audio.name === Icon.displayName);
    return found?.url || ""; // Retorna a URL ou uma string vazia se não encontrar
  }

  return (
    <div className="flex flex-col items-center gap-2">
      <button
        onClick={() => setIsPlaying(!isPlaying)}
        className={
          !isPlaying
            ? "flex flex-col items-center gap-2 hover:text-blue-600"
            : "flex flex-col items-center gap-2 text-blue-600"
        }
      >
        <Icon size={size} />
        {children}
      </button>
      <div className="flex gap-2">
        <input
          type="range"
          max="1"
          step="0.1"
          className="cursor-pointer accent-slate-700 w-24"
          onChange={(e) => setVolume(Number(e.target.value))}
        />
      </div>
    </div>
  );
}