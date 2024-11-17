import React from 'react';
import './style/Home.module.css';
import './style/Home.module2.css'
import Fcimg from './img/Fcimg.jpg';
import Tximg from './img/Tximg.jpg';
import logo from './img/logo.jpg'; // Import the logo image

const Home = () => {
  const userName = "X"; // Replace "X" with a dynamic username if available

  return (
    <div className="home-container">
      {/* Header */}
      <header className="header">
  <div className="logo">
    <img src='./img/logo.jpg'alt="Logo" className="logo-image" />
  </div>
  <div className="header-center">
  നന്നാവടോ

  </div>
  <nav className="nav">
    <div className="dropdown">
      <button className="dropbtn">Team:HIKE</button>
      <div className="dropdown-content">
      </div>
    </div>
  </nav>
</header>

      {/* Scrolling Emojis */}
      <marquee className="emoji-marquee" behavior="scroll" direction="left">
        😀 😂 🤩 😎 🤔 😇 😴 🤯 😍 🥳 🙃 😊 🤗 🥺 😌 😍 🤓 😜 🥰 😝 🤠 🥸 😶‍🌫 🫣 🫠 🥴 😵 🥵 🥶 😳😀 😂 🤩 😎 🤔 😇 😴 🤯 😍 🥳 🙃 😊 🤗 🥺 😌 😍 🤓 😜 🥰 😝 🤠 🥸 😶‍🌫 🫣 🫠 🥴 😵 🥵 🥶 😳
      </marquee>


      {/* Round Image Links */}
      <div className="image-links">
        <a href="/behave">
          <img src="./img/Tximg.jpg" alt="Ask Questions" className="round-image" />
        </a>
        <a href="image/recognition">
          <img src="./img/Fcimg.jpg "alt ="Face Recognize" className="round-image" />
        </a>
      </div>


    </div>
  );
}


export default Home;