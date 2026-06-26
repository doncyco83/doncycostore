"use client";

import React, { useEffect, useRef, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";

export default function AudioPlayer() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    // 1. Initialize audio element volume (15% - nice and low)
    if (audioRef.current) {
      audioRef.current.volume = 0.15;
    }

    // 2. Play on first user interaction due to browser autoplay policies
    const handleFirstInteraction = () => {
      if (audioRef.current && !isPlaying) {
        audioRef.current.play()
          .then(() => {
            setIsPlaying(true);
          })
          .catch((err) => {
            console.log("Autoplay blocked or audio interrupted:", err);
          });
      }
      // Remove listeners after first interaction
      removeListeners();
    };

    const addListeners = () => {
      window.addEventListener("click", handleFirstInteraction);
      window.addEventListener("keydown", handleFirstInteraction);
      window.addEventListener("touchstart", handleFirstInteraction);
    };

    const removeListeners = () => {
      window.removeEventListener("click", handleFirstInteraction);
      window.removeEventListener("keydown", handleFirstInteraction);
      window.removeEventListener("touchstart", handleFirstInteraction);
    };

    addListeners();

    return () => {
      removeListeners();
    };
  }, [isPlaying]);

  const toggleMute = () => {
    if (audioRef.current) {
      if (isMuted) {
        audioRef.current.muted = false;
        setIsMuted(false);
        // Ensure it is playing
        if (audioRef.current.paused) {
          audioRef.current.play().then(() => setIsPlaying(true));
        }
      } else {
        audioRef.current.muted = true;
        setIsMuted(true);
      }
    }
  };

  return (
    <>
      <audio
        ref={audioRef}
        src="/music.mp3"
        loop
        preload="auto"
        className="hidden"
      />
      
      {/* Floating Speaker Control Icon */}
      <button
        onClick={toggleMute}
        id="bg-music-toggle"
        className={`fixed bottom-6 right-6 z-50 w-11 h-11 rounded-full flex items-center justify-center border transition-all duration-500 ${
          isPlaying && !isMuted
            ? "bg-brand-magenta border-brand-magenta text-white shadow-[0_0_15px_rgba(183,19,113,0.6)] animate-pulse"
            : "bg-black/80 border-white/20 text-white/50 hover:text-white"
        }`}
        title={isMuted ? "Aktifkan Musik Latar" : "Senyapkan Musik Latar"}
      >
        {isMuted || !isPlaying ? (
          <VolumeX size={18} />
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="animate-pulse"
          >
            <path d="M12.5 5 L7.5 9 H3.5 V15 H7.5 L12.5 19 V5z" />
            <path d="M17.04 8.46a5 5 0 0 1 0 7.07" />
            <path d="M20.57 4.93a10 10 0 0 1 0 14.14" />
          </svg>
        )}
      </button>
    </>
  );
}
