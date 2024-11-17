"use client";

import React, { useState, useEffect } from 'react';
import { Volume2, Keyboard, Music, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

const dramaticSounds = [
  {
    name: "Dramatic Piano",
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" // Example URL - replace with your actual sound URLs
  },
  {
    name: "Epic Impact",
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3"
  },
  {
    name: "Dramatic Sting",
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3"
  }
];

const DramaticSoundboard = () => {
  const [soundDisplay, setSoundDisplay] = useState('Press any key for DRAMA! 🎭');
  const [isPlaying, setIsPlaying] = useState(false);
  const [lastKeyPressed, setLastKeyPressed] = useState('');
  const [audioElements, setAudioElements] = useState([]);

  useEffect(() => {
    // Pre-load audio elements
    const loadedAudio = dramaticSounds.map(sound => {
      const audio = new Audio(sound.url);
      audio.preload = 'auto';
      return audio;
    });
    setAudioElements(loadedAudio);

    return () => {
      loadedAudio.forEach(audio => {
        audio.pause();
        audio.src = '';
      });
    };
  }, []);

  const playRandomSound = () => {
    const randomIndex = Math.floor(Math.random() * audioElements.length);
    const selectedSound = audioElements[randomIndex];
    
    // Stop all currently playing sounds
    audioElements.forEach(audio => {
      audio.pause();
      audio.currentTime = 0;
    });

    // Play new sound
    selectedSound.currentTime = 0;
    selectedSound.play()
      .then(() => {
        setIsPlaying(true);
        setSoundDisplay(`Now Playing: ${dramaticSounds[randomIndex].name} 🎵`);
      })
      .catch(error => {
        console.error('Audio playback failed:', error);
        setSoundDisplay('Sound failed to play 😢');
      });

    // Reset playing state after sound finishes
    selectedSound.onended = () => {
      setIsPlaying(false);
      setSoundDisplay('Press any key for more DRAMA! 🎭');
    };
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      setLastKeyPressed(event.key);
      playRandomSound();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [audioElements]);

  return (
    <section className="min-h-screen w-full py-6 md:py-12 bg-gradient-to-b from-purple-100 to-pink-100 dark:from-purple-900 dark:to-pink-900">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center space-y-8 text-center">
          {/* Header */}
          <div className="animate-bounce">
            <Music className="w-16 h-16 text-purple-500" />
          </div>

          <div className="space-y-4">
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600 animate-pulse">
              ✨ Dramatic Typing Soundboard ✨
            </h1>
            <p className="mx-auto max-w-[700px] text-gray-600 md:text-xl dark:text-gray-300">
              Make every keystroke an EPIC moment! 🎹
            </p>
          </div>

          {/* Main Card */}
          <Card className="w-full max-w-2xl transform hover:scale-105 transition-all duration-300">
            <CardContent className="p-8">
              <textarea
                className="w-full h-40 p-4 mb-4 text-lg border-2 border-purple-300 rounded-lg focus:border-purple-500 focus:ring-2 focus:ring-purple-200 resize-none dark:bg-gray-800 dark:border-purple-700 dark:text-white"
                placeholder="Type something DRAMATIC..."
                autoFocus
              />
              
              <div className={`flex items-center justify-center space-x-2 ${isPlaying ? 'animate-pulse' : ''}`}>
                <Volume2 className="w-6 h-6 text-purple-500" />
                <span className="text-xl font-semibold text-purple-600 dark:text-purple-400">
                  {soundDisplay}
                </span>
              </div>

              {lastKeyPressed && (
                <div className="mt-4 text-center">
                  <span className="inline-block px-4 py-2 bg-purple-100 dark:bg-purple-800 rounded-full text-purple-600 dark:text-purple-300">
                    Last Key: {lastKeyPressed === ' ' ? 'Space' : lastKeyPressed} 🎯
                  </span>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Instructions */}
          <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-300">
            <Keyboard className="w-5 h-5" />
            <span>Just start typing to unleash the drama!</span>
          </div>

          {/* Floating Elements */}
          <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-0 overflow-hidden">
            <FloatingEmoji emoji="🎵" />
            <FloatingEmoji emoji="🎹" />
            <FloatingEmoji emoji="🎭" />
            <FloatingEmoji emoji="✨" />
            <FloatingEmoji emoji="🎼" />
          </div>
        </div>
      </div>
    </section>
  );
};

// Floating emoji animation component
const FloatingEmoji = ({ emoji }) => {
  const randomPosition = () => ({
    top: `${Math.random() * 100}%`,
    left: `${Math.random() * 100}%`,
    animationDuration: `${Math.random() * 10 + 10}s`,
  });

  return (
    <div
      className="absolute animate-float opacity-20"
      style={randomPosition()}
    >
      <span className="text-4xl">{emoji}</span>
    </div>
  );
};

export default DramaticSoundboard;