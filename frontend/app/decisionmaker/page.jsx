"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';

const options = {
  food: [
    { text: 'Pizza with pineapple 🍕', emoji: '🍍' },
    { text: 'Chocolate-covered broccoli', emoji: '🥦🍫' },
    { text: 'Spaghetti tacos', emoji: '🌮🍝' },
    { text: 'Invisible sandwich', emoji: '👻🥪' },
    { text: 'Lasagna with jelly', emoji: '🍯' },
  ],
  clothes: [
    { text: 'Socks with sandals', emoji: '🧦👡' },
    { text: 'A clown costume', emoji: '🤡' },
    { text: 'Your pajamas', emoji: '🌙' },
    { text: 'Superhero cape', emoji: '🦸‍♂️' },
    { text: 'A banana suit', emoji: '🍌' },
  ],
  activities: [
    { text: 'Dance like no one is watching', emoji: '💃' },
    { text: 'Talk to your pet about politics', emoji: '🐱💭' },
    { text: 'Binge-watch a soap opera', emoji: '📺' },
    { text: 'Write a letter to a potato', emoji: '✉️🥔' },
    { text: 'Create a new dance move', emoji: '🕺' },
  ],
};

const DecisionMaker = () => {
  const [selectedOption, setSelectedOption] = useState('');
  const [isSpinning, setIsSpinning] = useState(false);
  const [category, setCategory] = useState('');
  const [showEmojis, setShowEmojis] = useState(true);

  const makeDecision = async (selectedCategory) => {
    setCategory(selectedCategory);
    setIsSpinning(true);
    setSelectedOption('');
    
    // Spinning animation duration
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const randomIndex = Math.floor(Math.random() * options[selectedCategory].length);
    setSelectedOption(options[selectedCategory][randomIndex]);
    setIsSpinning(false);
    
    // Celebrate!
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });
  };

  return (
    <motion.div 
      className="min-h-screen bg-gradient-to-b from-purple-600 to-blue-600 p-8 flex flex-col items-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      {/* Floating emojis background */}
      <div className="fixed inset-0 pointer-events-none">
        <AnimatePresence>
          {showEmojis && (
            Array.from({ length: 20 }).map((_, i) => (
              <motion.div
                key={i}
                initial={{ 
                  x: Math.random() * window.innerWidth,
                  y: -50,
                  opacity: 0
                }}
                animate={{
                  y: window.innerHeight + 50,
                  opacity: [0, 1, 0],
                  rotate: [0, 360]
                }}
                transition={{
                  duration: Math.random() * 5 + 5,
                  repeat: Infinity,
                  delay: Math.random() * 5
                }}
                className="absolute text-2xl"
              >
                {['🎲', '✨', '🎮', '🎯', '🎨'][Math.floor(Math.random() * 5)]}
              </motion.div>
            ))
          )}
        </AnimatePresence>
      </div>

      {/* Main content */}
      <motion.h1 
        className="text-5xl font-bold text-white mb-12 text-center"
        animate={{ scale: [1, 1.05, 1] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        🎲 Magic Decision Maker 🎲
      </motion.h1>

      {/* Category buttons */}
      <div className="grid gap-6 md:grid-cols-3 mb-12">
        {Object.keys(options).map((cat) => (
          <motion.button
            key={cat}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 bg-white rounded-full shadow-lg text-purple-600 font-bold text-xl transform transition-all hover:shadow-xl"
            onClick={() => makeDecision(cat)}
          >
            {cat === 'food' && '🍽️ '}
            {cat === 'clothes' && '👔 '}
            {cat === 'activities' && '🎯 '}
            What to {cat === 'clothes' ? 'wear' : cat}?
          </motion.button>
        ))}
      </div>

      {/* Decision display */}
      <AnimatePresence mode='wait'>
        {isSpinning ? (
          <motion.div
            key="spinner"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            className="text-white text-center"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              className="text-6xl mb-4"
            >
              🎲
            </motion.div>
            <p className="text-2xl">Making a decision...</p>
          </motion.div>
        ) : selectedOption && (
          <motion.div
            key="decision"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className="bg-white p-8 rounded-2xl shadow-xl text-center max-w-md w-full"
          >
            <motion.h2 
              className="text-2xl font-bold mb-4 text-purple-600"
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
            >
              Your Destiny Says:
            </motion.h2>
            <motion.div
              className="text-4xl mb-4"
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 0.5, repeat: 3 }}
            >
              {selectedOption.emoji}
            </motion.div>
            <p className="text-xl text-gray-700">{selectedOption.text}</p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Fun decorative elements */}
      <motion.div
        className="fixed bottom-10 right-10 text-6xl cursor-pointer"
        whileHover={{ scale: 1.2, rotate: 180 }}
        onClick={() => setShowEmojis(!showEmojis)}
      >
        🎮
      </motion.div>
    </motion.div>
  );
};

export default DecisionMaker;