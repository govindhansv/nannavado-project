import React from 'react';

const Worm = ({ worm, onAttack }) => {
  return (
    <div style={{ margin: '20px', border: '1px solid black', padding: '10px' }}>
      <h3>{worm.name}</h3>
      <p>Health: {worm.health}</p>
      <button onClick={() => onAttack(worm.id)} disabled={worm.health <= 0}>
        Attack
      </button>
      {worm.health <= 0 && <p style={{ color: 'red' }}>This worm is defeated!</p>}
    </div>
  );
};

export default Worm;
