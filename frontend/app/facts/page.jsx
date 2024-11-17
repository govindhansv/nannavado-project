"use client";

import React, { useEffect, useState } from 'react';

const RandomFact = () => {
  const [fact, setFact] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Function to fetch a random cat fact
  const fetchCatFact = async () => {
    try {
      const response = await fetch('https://catfact.ninja/fact');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setFact(data.fact); // Set the fact state with the fetched fact
    } catch (err) {
      setError(err.message); // Set error message in case of failure
    } finally {
      setLoading(false); // Set loading to false regardless of success or failure
    }
  };

  // Fetch the cat fact on component mount
  useEffect(() => {
    fetchCatFact();
  }, []);

  // Conditional rendering based on loading, error, or fetched fact
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h1>Random Cat Fact</h1>
      <p>{fact}</p>
      <button onClick={fetchCatFact}>Get Another Fact</button>
    </div>
  );
};

export default RandomFact;
