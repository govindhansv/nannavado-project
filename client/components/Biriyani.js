import React from 'react';

const Biriyani = () => {
  return (
    <div style={{ padding: '20px', fontFamily: 'Arial' }}>
      <h1>Eat Biryani!</h1>
      <p>Since you were feeling sad, how about enjoying some delicious biryani?</p>
      <img 
        src="https://cdn.shortpixel.ai/client/q_lossy,ret_img,w_1290/https://norecipes.com/wp-content/uploads/2017/05/chicken-biryani-12-1290x1934.jpg" // Replace with a valid image URL
        alt="Biryani"
        style={{ width: '300px', height: 'auto' }}
      />
    </div>
  );
};

export default Biriyani;

