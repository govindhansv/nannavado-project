"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Home() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [plantStage, setPlantStage] = useState(0);
  const [revealedEmojis, setRevealedEmojis] = useState(new Set());
  const [lastInteraction, setLastInteraction] = useState(0);
  const [moonPhase, setMoonPhase] = useState(0);

  const moonPhases = ['🌑', '🌒', '🌓', '🌔', '🌕', '🌖', '🌗', '🌘'];
  const plantStages = ['🌱', '🌿', '🌸', '🌺', '🌳'];
  
  const hiddenEmojis = [
    { emoji: '🦋', x: 20, y: 30 },
    { emoji: '🐝', x: 70, y: 40 },
    { emoji: '🐞', x: 40, y: 60 },
    { emoji: '🌸', x: 80, y: 70 },
    { emoji: '🍄', x: 30, y: 80 },
    { emoji: '🐛', x: 60, y: 20 },
    { emoji: '🦎', x: 90, y: 50 },
    { emoji: '🐌', x: 10, y: 90 }
  ];

  // Moon phase animation
  useEffect(() => {
    const moonInterval = setInterval(() => {
      setMoonPhase((prev) => (prev + 1) % moonPhases.length);
    }, 3000); // Change phase every 3 seconds

    return () => clearInterval(moonInterval);
  }, []);

  useEffect(() => {
    const handleMouseMove = (event) => {
      setMousePosition({ x: event.clientX, y: event.clientY });
      
      hiddenEmojis.forEach((emoji, index) => {
        const emojiX = (window.innerWidth * emoji.x) / 100;
        const emojiY = (window.innerHeight * emoji.y) / 100;
        const distance = Math.hypot(event.clientX - emojiX, event.clientY - emojiY);
        
        if (distance < 100 && !revealedEmojis.has(index)) {
          setRevealedEmojis(prev => new Set([...prev, index]));
          setLastInteraction(Date.now());
          setPlantStage(prev => Math.min(prev + 1, plantStages.length - 1));
        }
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [revealedEmojis]);

  return (
    <div className="relative min-h-screen bg-black overflow-hidden">
      {/* Animated Moon */}
      <motion.div
        className="fixed top-10 left-1/2 transform -translate-x-1/2 z-50"
        animate={{
          y: [0, -10, 0],
          rotate: [0, 5, -5, 0],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          repeatType: "reverse",
        }}
      >
        <div className="relative">
          {/* Moon glow effect */}
          <div 
            className="absolute inset-0 rounded-full blur-xl"
            style={{
              background: 'radial-gradient(circle, rgba(255,255,255,0.2) 0%, transparent 70%)',
              width: '100px',
              height: '100px',
              transform: 'translate(-25%, -25%) scale(1.5)',
            }}
          />
          {/* Moon emoji */}
          <motion.div 
            className="text-6xl"
            animate={{ scale: [1, 1.1, 1] }}
            transition={{
              duration: 4,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          >
            {moonPhases[moonPhase]}
          </motion.div>
        </div>
      </motion.div>

      {/* Stars around moon */}
      {Array.from({ length: 30 }).map((_, i) => (
        <motion.div
          key={`star-${i}`}
          className="fixed w-1 h-1 bg-white rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 30}%`,
          }}
          animate={{
            scale: [0, 1, 0],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            delay: Math.random() * 2,
          }}
        />
      ))}

      {/* Light beam */}
      <motion.div
        className="fixed pointer-events-none"
        animate={{
          x: mousePosition.x - 150,
          y: mousePosition.y - 150,
        }}
        transition={{ type: "spring", damping: 30 }}
      >
        <div className="w-[300px] h-[300px] rounded-full radial-gradient opacity-20" />
      </motion.div>

      {/* Spotlight */}
      <div
        className="fixed w-[200px] h-[200px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(255,255,255,0.2) 0%, transparent 70%)',
          left: mousePosition.x - 100,
          top: mousePosition.y - 100,
        }}
      />

      {/* Hidden emojis */}
      {hiddenEmojis.map((item, index) => (
        <AnimatePresence key={index}>
          {revealedEmojis.has(index) && (
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              className="absolute text-4xl"
              style={{
                left: `${item.x}%`,
                top: `${item.y}%`,
                transform: 'translate(-50%, -50%)'
              }}
            >
              {item.emoji}
            </motion.div>
          )}
        </AnimatePresence>
      ))}

      {/* Growing plant */}
      <motion.div
        className="fixed bottom-10 left-1/2 transform -translate-x-1/2 text-6xl"
        animate={{
          scale: [1, 1.1, 1],
          rotate: [0, 5, -5, 0]
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          repeatType: "reverse"
        }}
      >
        {plantStages[plantStage]}
      </motion.div>

      {/* Progress indicator */}
      <div className="fixed top-5 left-5 text-white">
        Found: {revealedEmojis.size}/{hiddenEmojis.length}
      </div>

      {/* Instructions */}
      <AnimatePresence>
        {revealedEmojis.size === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-center"
          >
            Move your mouse to discover hidden creatures and help the plant grow! 🌱
          </motion.div>
        )}
      </AnimatePresence>

      {/* Completion celebration */}
      <AnimatePresence>
        {revealedEmojis.size === hiddenEmojis.length && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center"
          >
            <div className="text-4xl mb-4">🎉 Congratulations! 🎉</div>
            <div className="text-white">You've found all the creatures and grown a beautiful tree!</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}