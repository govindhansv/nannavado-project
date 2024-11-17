"use client";

import React, { useState } from 'react';
import { Quote, Sparkles, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

const funnyQuotes = [
  { text: "I'm not lazy, I'm just conserving energy", author: "Every Sloth Ever" },
  { text: "I don't need Google, my wife knows everything", author: "Anonymous Husband" },
  { text: "I put my phone in airplane mode, but it's not flying", author: "Tech Support Nightmare" },
  { text: "I'm not clumsy. It's just the floor hates me", author: "Gravity Enthusiast" },
  { text: "I don't need a hair stylist, my pillow gives me a new hairstyle every morning", author: "Bed Head Champion" },
  { text: "I'm not short, I'm concentrated awesome", author: "Vertical Challenger" },
  { text: "My bed is a magical place where I suddenly remember everything I was supposed to do", author: "Professional Procrastinator" },
  { text: "I don't need a personal trainer, I run away from my problems", author: "Fitness Philosophy" }
];

const getRandomQuote = (current) => {
  let newQuote;
  do {
    newQuote = funnyQuotes[Math.floor(Math.random() * funnyQuotes.length)];
  } while (newQuote === current);
  return newQuote;
};

const QuotesDisplay = () => {
  const [currentQuote, setCurrentQuote] = useState(getRandomQuote());
  const [isRotating, setIsRotating] = useState(false);

  const handleNewQuote = () => {
    setIsRotating(true);
    setTimeout(() => {
      setCurrentQuote(getRandomQuote(currentQuote));
      setIsRotating(false);
    }, 500);
  };

  return (
    <section className="min-h-screen w-full py-6 md:py-12 lg:py-16 xl:py-20 bg-gradient-to-b from-purple-100 to-pink-100 dark:from-purple-900 dark:to-pink-900">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center space-y-8 text-center">
          {/* Fun Header */}
          <div className="animate-bounce w-24 h-24 md:w-32 md:h-32">
            <img
              src="https://media.tenor.com/wdSa9pzk9_gAAAAi/saxophone-party-popper.gif"
              alt="Funny Quote"
              className="rounded-full w-full h-full object-cover"
            />
          </div>

          <div className="space-y-4">
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl/none bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600 animate-pulse">
              ✨ Quote of the Moment ✨
            </h1>
            <p className="mx-auto max-w-[700px] text-gray-600 md:text-xl dark:text-gray-300">
              Prepare to question your life choices! 🤔
            </p>
          </div>

          {/* Quote Card */}
          <Card className="w-full max-w-2xl transform hover:scale-105 transition-all duration-300">
            <CardContent className="p-8">
              <div className={`space-y-6 ${isRotating ? 'animate-spin-slow' : ''}`}>
                <Quote className="w-12 h-12 mx-auto text-purple-500 animate-pulse" />
                <p className="text-2xl font-semibold text-gray-700 dark:text-gray-200">
                  "{currentQuote.text}"
                </p>
                <p className="text-lg text-gray-500 dark:text-gray-400">
                  - {currentQuote.author} 😎
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Action Button */}
          <Button
            onClick={handleNewQuote}
            className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold py-3 px-6 rounded-full transform hover:scale-110 transition-all"
          >
            <RefreshCw className={`w-5 h-5 mr-2 ${isRotating ? 'animate-spin' : ''}`} />
            Another Quote Please!
          </Button>

          {/* Floating Elements */}
          <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-0 overflow-hidden">
            <FloatingEmoji emoji="🤪" />
            <FloatingEmoji emoji="😂" />
            <FloatingEmoji emoji="🤓" />
            <FloatingEmoji emoji="🎭" />
            <FloatingEmoji emoji="✨" />
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

export default QuotesDisplay;