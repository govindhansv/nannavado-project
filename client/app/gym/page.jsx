import React from 'react';

const Gym = () => {
  return (
    <div style={{
      padding: '30px',
      fontFamily: 'Arial, sans-serif',
      maxWidth: '600px',
      margin: 'auto',
      backgroundColor: '#f0f2f5',
      borderRadius: '10px',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
      color: '#333',
      textAlign: 'center'
    }}>
      <h1 style={{ color: '#555' }}>Go to Gym</h1>
      <p style={{ marginBottom: '20px' }}>It&apos;s a great way to release some anger!</p>
      <iframe width="560" height="315" src="https://www.youtube.com/embed/FlBUw7UzIjw?si=7hVec0slONj0qW1K" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
    </div>
  );
};

export default Gym;


