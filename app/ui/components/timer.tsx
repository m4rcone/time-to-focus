"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import MultimediaButton from "./multimedia-button";

export default function Timer() {
  const initialTime = 1500;
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const [timeLeft, setTimeLeft] = useState<number>(initialTime);
  const [isRunning, setIsRunning] = useState<boolean>(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      audioRef.current = new Audio("/assets/beep.wav");
      audioRef.current.volume = 0.5;
    }
  }, []);

  useEffect(() => {
    if (audioRef.current) {
      let interval: NodeJS.Timeout;

      if (timeLeft > 3600) {
        setTimeLeft(3600);
      }

      if (isRunning && timeLeft > 0) {
        interval = setInterval(() => {
          setTimeLeft((prevTime) => prevTime - 1);
        }, 1000);
      } else if (timeLeft === 0) {
        audioRef.current.play();
        setIsRunning(false);
      }

      return () => clearInterval(interval);
    }
  }, [isRunning, timeLeft]);

  const startTimer = useCallback(() => {
    setIsRunning(!isRunning);
  }, [isRunning]);

  const stopTimer = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      setIsRunning(false);
      setTimeLeft(initialTime);
    }
  }, []);

  const increaseTime = useCallback(() => {
    setTimeLeft((prevTime) => (prevTime <= 3600 ? prevTime + 300 : 3600));
  }, []);

  const decreaseTime = useCallback(() => {
    setTimeLeft((prevTime) => (prevTime >= 300 ? prevTime - 300 : 0));
  }, []);

  function formatTime() {
    if (timeLeft >= 3600) {
      return "60:00";
    }
    const time = new Date(timeLeft * 1000);
    const formattedTime = time.toLocaleTimeString("pt-br", {
      minute: "2-digit",
      second: "2-digit",
    });
    return formattedTime;
  }

  return (
    <div className="flex flex-col gap-8">
      <div className="text-8xl sm:text-9xl text-center">
        <span>{formatTime()}</span>
      </div>
      <div className="flex justify-center gap-8">
        {!isRunning ? (
          <MultimediaButton
            iconName="CirclePlay"
            size={48}
            onClick={startTimer}
          />
        ) : (
          <MultimediaButton
            iconName="CirclePause"
            size={48}
            onClick={startTimer}
          />
        )}
        {!isRunning ? (
          <MultimediaButton
            iconName="RefreshCw"
            size={48}
            onClick={stopTimer}
          />
        ) : (
          <MultimediaButton
            iconName="CircleStop"
            size={48}
            onClick={stopTimer}
          />
        )}
        <MultimediaButton
          iconName="CirclePlus"
          size={48}
          onClick={increaseTime}
        />
        <MultimediaButton
          iconName="CircleMinus"
          size={48}
          onClick={decreaseTime}
        />
      </div>
    </div>
  );
}
