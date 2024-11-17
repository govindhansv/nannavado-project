"use client";
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import Image from "next/image";


export default function Home() {
  const [message, setMessage] = useState("Welcome! Don't press the button!");
  const [pressCount, setPressCount] = useState(0);
  const [buttonColor, setButtonColor] = useState('#0070f3');
  const [backgroundColor, setBackgroundColor] = useState('#f0f0f0');
  const [buttonSize, setButtonSize] = useState(1);
  const [isShaking, setIsShaking] = useState(false);
  const [floatingEmojis, setFloatingEmojis] = useState([]);

  const messages = [
    { text: "Oops! You pressed the button! 😱", emoji: "😱" },
    { text: "Why did you press it? 🤔", emoji: "🤔" },
    { text: "You really shouldn't have done that! 😂", emoji: "😂" },
    { text: "That was a bad choice... 😅", emoji: "😅" },
    { text: "Congratulations! You broke it! 🙈", emoji: "🙈" },
    { text: "You know you were told not to press it! 🙃", emoji: "🙃" },
    { text: "Now what? You broke it! 😜", emoji: "😜" },
    { text: "Oh no, here we go again! 🎢", emoji: "🎢" },
    { text: "You just couldn't resist, could you? 🎯", emoji: "🎯" },
    { text: "BOOM! Just kidding... 💥", emoji: "💥" }
  ];

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

  const addFloatingEmoji = (emoji) => {
    const newEmoji = {
      id: Date.now(),
      emoji,
      x: Math.random() * window.innerWidth,
      y: window.innerHeight
    };
    setFloatingEmojis(prev => [...prev, newEmoji]);
    setTimeout(() => {
      setFloatingEmojis(prev => prev.filter(e => e.id !== newEmoji.id));
    }, 3000);
  };

  return (
    <motion.div
      style={{ backgroundColor }}
      className="min-h-screen flex flex-col items-center justify-center p-8 relative overflow-hidden"
      animate={{ backgroundColor }}
      transition={{ duration: 0.5 }}
    >
      {/* Floating emojis */}
      <AnimatePresence>
        {floatingEmojis.map((emojiObj) => (
          <motion.div
            key={emojiObj.id}
            initial={{ x: emojiObj.x, y: emojiObj.y, opacity: 1, scale: 1 }}
            animate={{ y: -200, opacity: 0, scale: 2 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 3, ease: "easeOut" }}
            className="absolute text-4xl pointer-events-none"
          >
            {emojiObj.emoji}
          </motion.div>
        ))}
      </AnimatePresence>

      <motion.h1
        className="text-5xl md:text-6xl font-bold mb-8 text-center"
        animate={{ scale: isShaking ? [1, 1.02, 0.98, 1] : 1 }}
        transition={{ duration: 0.5 }}
      >
        Don't Press the Button!
      </motion.h1>

      <motion.div
        className="text-2xl mb-6 font-semibold"
        animate={{ scale: pressCount % 10 === 0 && pressCount !== 0 ? [1, 1.2, 1] : 1 }}
      >
        You've pressed the button{" "}
        <span className="text-3xl font-bold text-primary">
          {pressCount}
        </span>{" "}
        {pressCount === 1 ? 'time' : 'times'}!
      </motion.div>

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
        Press Me
        <div className="animate-bounce">
            <Image
              src="https://media.tenor.com/01-nfVtwVAgAAAAi/joy-bunny.gif" // Add a fun party popper gif
              alt="Party Popper"
              width={350}
              height={350}
            />
          </div>

      </motion.button>

      <motion.p
        className="mt-8 text-2xl text-center max-w-2xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        key={message}
      >
        {message}
      </motion.p>

      {/* Achievement badges */}
      {pressCount >= 10 && (
        <motion.div
          className="mt-8 p-4 bg-yellow-100 rounded-lg shadow-md"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          🏆 Achievement Unlocked: Certified Button Presser!
        </motion.div>
      )}

      {/* Background decorative elements */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              width: Math.random() * 20 + 10,
              height: Math.random() * 20 + 10,
              backgroundColor: `hsla(${Math.random() * 360}, 70%, 70%, 0.2)`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [-20, 20],
              x: [-20, 20],
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              repeatType: "reverse",
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>
    </motion.div>
  );
}