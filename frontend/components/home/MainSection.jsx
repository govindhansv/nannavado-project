"use client";

// components/MainSection.js
import { Button } from "@/components/ui/button";
import { Sparkles, Music, XCircle, Sun, Brain, Newspaper, Quote, Rocket, Info } from "lucide-react";
import Image from "next/image";
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { useState } from "react";

export default function MainSection() {

  const [message, setMessage] = useState("Welcome! Don't press the button!");
  const [pressCount, setPressCount] = useState(0);
  const [buttonColor, setButtonColor] = useState('#0070f3');
  const [backgroundColor, setBackgroundColor] = useState('#f0f0f0');
  const [buttonSize, setButtonSize] = useState(1);
  const [isShaking, setIsShaking] = useState(false);
  const [floatingEmojis, setFloatingEmojis] = useState([]);

  const handleClick = () => {
    // Trigger confetti
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });

    // Random message
    const randomMessage = messages[Math.floor(Math.random() * messages.length)];
    setMessage(randomMessage.text);
    
    // Add floating emoji
    addFloatingEmoji(randomMessage.emoji);

    // Update counts and colors
    setPressCount(pressCount + 1);
    setButtonColor(`hsl(${Math.random() * 360}, 80%, 60%)`);
    setBackgroundColor(`hsl(${Math.random() * 360}, 70%, 95%)`);

    // Button animations
    setButtonSize(0.9);
    setTimeout(() => setButtonSize(1), 100);
    
    // Shake effect
    setIsShaking(true);
    setTimeout(() => setIsShaking(false), 500);
  };

  
  return (
    <section className="min-h-screen w-full py-6 md:py-12 lg:py-16 xl:py-20 bg-gradient-to-b from-purple-100 to-pink-100 dark:from-purple-900 dark:to-pink-900">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center space-y-8 text-center">
          {/* Fun Header Section */}
          {/* <div className="animate-bounce">
            <Image
              src="https://media.tenor.com/01-nfVtwVAgAAAAi/joy-bunny.gif" // Add a fun party popper gif
              alt="Party Popper"
              width={350}
              height={350}
            />
          </div> */}
            <motion.button
        className="text-3xl p-8 rounded-full cursor-pointer text-white shadow-lg hover:shadow-xl transform transition-all duration-200 ease-in-out"
        style={{ backgroundColor: buttonColor }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        animate={{
          scale: buttonSize,
          rotate: isShaking ? [-5, 5, -5, 5, 0] : 0,
        }}
        onClick={handleClick}
      >
        <div className="animate-bounce">
            <Image
              src="https://media.tenor.com/01-nfVtwVAgAAAAi/joy-bunny.gif" // Add a fun party popper gif
              alt="Party Popper"
              width={350}
              height={350}
            />
          </div>

      </motion.button>

          <div className="space-y-4">
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl/none bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600 animate-pulse">
              🎮 PRoJEcT CHill CHaSM 🎮
            </h1>
            <p className="mx-auto max-w-[700px] text-gray-600 md:text-xl dark:text-gray-300 font-semibold">
              Welcome to the most entertaining waste of time on the internet! 🎉
            </p>
          </div>

          {/* Fun Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8 w-full max-w-4xl">
            <FunCard
              href="/soundboard"
              icon={<Music className="w-8 h-8 text-purple-500" />}
              title="Sound Board 🔊"
              description="Make some noise!"
            />
            
            <FunCard
              href="/dontpressthebutton"
              icon={<XCircle className="w-8 h-8 text-red-500" />}
              title="The Forbidden Button 🚫"
              description="You know you want to..."
            />
            
            <FunCard
              href="/sun"
              icon={<Sun className="w-8 h-8 text-yellow-500" />}
              title="Sun ☀️"
              description="Bring some light to your day"
            />
            
            <FunCard
              href="/decisionmaker"
              icon={<Brain className="w-8 h-8 text-blue-500" />}
              title="Decision Maker 🎲"
              description="Let fate decide!"
            />
            
            <FunCard
              href="/fakenews"
              icon={<Newspaper className="w-8 h-8 text-green-500" />}
              title="Today News 📰"
              description="News that probably didn't happen"
            />
            
            <FunCard
              href="/quotes"
              icon={<Quote className="w-8 h-8 text-pink-500" />}
              title="Quotes ✨"
              description="Words of questionable wisdom"
            />
          </div>

          {/* Action Buttons */}
          {/* <div className="space-x-4 mt-8">
            <Button 
              className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold py-3 px-6 rounded-full transform hover:scale-105 transition-all"
            >
              <Rocket className="w-5 h-5 mr-2" />
              Get Started
            </Button>
            
            <Button 
              variant="outline"
              className="border-2 border-purple-500 text-purple-500 font-bold py-3 px-6 rounded-full hover:bg-purple-50 transform hover:scale-105 transition-all"
            >
              <Info className="w-5 h-5 mr-2" />
              Learn More
            </Button>
          </div> */}
        </div>
      </div>
      
      {/* Fun floating elements */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-0 overflow-hidden">
        <FloatingEmoji emoji="🎮" />
        <FloatingEmoji emoji="🎪" />
        <FloatingEmoji emoji="🎨" />
        <FloatingEmoji emoji="🎭" />
        <FloatingEmoji emoji="🎪" />
      </div>
    </section>
  );
}

// Card component for each fun section
function FunCard({ href, icon, title, description }) {
  return (
    <a 
      href={href}
      className="group p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 hover:bg-purple-50 dark:hover:bg-purple-900"
    >
      <div className="flex flex-col items-center space-y-3">
        <div className="p-3 bg-purple-100 dark:bg-purple-800 rounded-full group-hover:animate-bounce">
          {icon}
        </div>
        <h3 className="text-xl font-bold text-gray-800 dark:text-white">{title}</h3>
        <p className="text-gray-500 dark:text-gray-300">{description}</p>
      </div>
    </a>
  );
}

// Floating emoji animation component
function FloatingEmoji({ emoji }) {
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
}