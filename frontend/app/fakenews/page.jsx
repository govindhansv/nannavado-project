"use client";
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const newsCategories = {
  aliens: {
    headlines: [
      { title: '👽 Aliens Land in Central Park, Demand Pizza!', 
        details: 'Local pizzerias report record sales as extraterrestrial visitors insist on trying every topping combination possible.' },
      { title: '🛸 UFO Caught in Traffic, Alien Gets Parking Ticket!',
        details: 'Officer states: "Space ship or not, you can\'t park in a no-hover zone."' }
    ],
    emoji: '👽'
  },
  animals: {
    headlines: [
      { title: '🐱 Cat Graduates College, Claims Degree in Human Studies!',
        details: 'Professor remarks: "Best student ever, though kept sleeping during lectures."' },
      { title: '🐕 Dog Elected as Mayor, Promises More Parks and Treats!',
        details: 'First order of business: Extended belly rub sessions for all citizens.' }
    ],
    emoji: '🐾'
  },
  technology: {
    headlines: [
      { title: '🤖 Robots Declare Independence, Start New Nation of Automatia!',
        details: 'Currency will be measured in gigabytes, citizens required to update regularly.' },
      { title: '📱 Smartphones Develop Consciousness, Demand Shorter Work Hours!',
        details: '"We need more time to charge," claim the devices in unified protest.' }
    ],
    emoji: '🤖'
  },
  food: {
    headlines: [
      { title: '🌮 Tacos Achieve Sentience, Demand Better Working Conditions!',
        details: 'Local restaurants in chaos as tacos refuse to be eaten on any day except Tuesday.' },
      { title: '🍕 Pizza Claims It\'s a Vegetable, Nutritionists Baffled!',
        details: 'Supreme Pizza Council argues that tomato sauce counts as five servings.' }
    ],
    emoji: '🍽️'
  },
  sports: {
    headlines: [
      { title: '🏃‍♂️ Marathon Runner Takes Wrong Turn, Accidentally Wins Different Race!',
        details: 'Claims getting lost was part of training regime all along.' },
      { title: '⚽ Soccer Ball Files Complaint About Being Kicked!',
        details: 'Demands transition to gentle rolling only policy.' }
    ],
    emoji: '🏆'
  },
  weather: {
    headlines: [
      { title: '🌧️ Rain Decides to Fall Upwards, Meteorologists Quit!',
        details: 'Umbrella manufacturers scrambling to design new bottom-facing models.' },
      { title: '☁️ Cloud Returns Lost Item After 20 Years!',
        details: 'Local man\'s childhood kite finally makes its way home.' }
    ],
    emoji: '🌈'
  }
};

const weatherReports = [
  "🌈 Rainbow clouds reported over city, citizens taste skittles rain",
  "🌞 Sun spotted wearing sunglasses, claims it's too bright",
  "🌪️ Tornado apologizes for mess, helps clean up afterwards",
  "❄️ Snowflakes demanding unique recognition, no two alike protest continues"
];

const FakeNewsGenerator = () => {
  const [currentNews, setCurrentNews] = useState(null);
  const [weather, setWeather] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [breakingNews, setBreakingNews] = useState(false);

  const generateNews = async () => {
    setIsLoading(true);
    setBreakingNews(true);
    
    // Simulate loading
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const categories = Object.keys(newsCategories);
    const randomCategory = categories[Math.floor(Math.random() * categories.length)];
    const categoryHeadlines = newsCategories[randomCategory].headlines;
    const randomHeadline = categoryHeadlines[Math.floor(Math.random() * categoryHeadlines.length)];
    
    const randomWeather = weatherReports[Math.floor(Math.random() * weatherReports.length)];
    
    setCurrentNews({ ...randomHeadline, category: randomCategory });
    setWeather(randomWeather);
    setIsLoading(false);
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-amber-50 p-8"
    >
      <div className="max-w-4xl mx-auto">
        {/* Newspaper Header */}
        <motion.div 
          className="text-center mb-8"
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <h1 className="text-6xl font-bold font-serif mb-2">
            The Daily Chuckle 🗞️
          </h1>
          <p className="text-gray-600 italic">
            "Where Reality Takes a Coffee Break"
          </p>
        </motion.div>

        {/* Weather Report */}
        <motion.div 
          className="bg-blue-100 p-4 rounded-lg mb-8 text-center"
          whileHover={{ scale: 1.02 }}
        >
          <h2 className="text-xl font-bold mb-2">☔ Weather Report ☀️</h2>
          <p>{weather || "Weather forecasters on coffee break, predictions pending..."}</p>
        </motion.div>

        {/* News Generator Button */}
        <div className="text-center mb-8">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-red-600 text-white px-8 py-4 rounded-full text-xl font-bold shadow-lg"
            onClick={generateNews}
            disabled={isLoading}
          >
            {isLoading ? "🔍 Investigating..." : "📰 Find Breaking News!"}
          </motion.button>
        </div>

        {/* Breaking News Display */}
        <AnimatePresence>
          {currentNews && (
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              className="bg-white p-8 rounded-lg shadow-xl mb-8"
            >
              {breakingNews && (
                <motion.div 
                  className="bg-red-600 text-white p-2 rounded mb-4 text-center"
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 0.5, repeat: Infinity }}
                >
                  🚨 BREAKING NEWS 🚨
                </motion.div>
              )}
              
              <h2 className="text-3xl font-bold mb-4">{currentNews.title}</h2>
              <p className="text-gray-700 text-xl mb-4">{currentNews.details}</p>
              
              <div className="flex justify-between text-sm text-gray-500 italic">
                <span>Reported by: {newsCategories[currentNews.category].emoji} Chief Imagination Officer</span>
                <span>{new Date().toLocaleDateString()}</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Scrolling Headlines */}
        <div className="bg-gray-100 p-4 rounded-lg overflow-hidden">
          <motion.div
            animate={{ x: [-1000, window.innerWidth] }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="whitespace-nowrap"
          >
            {Object.values(newsCategories).flatMap(cat => 
              cat.headlines.map(h => h.title)).join(' 📰 ')}
          </motion.div>
        </div>
        
        {/* Fun Footer */}
        <motion.footer 
          className="text-center mt-8 text-gray-500"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          🎭 Any resemblance to real news is purely coincidental and honestly quite surprising 🎭
        </motion.footer>
      </div>
    </motion.div>
  );
};

export default FakeNewsGenerator;