"use client";

import React, { useEffect, useState } from 'react';

const ListPage = () => {
  const [items, setItems] = useState([]); // Initialize as an empty array
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Function to fetch the list of items
  const fetchItems = async () => {
    try {
      const response = await fetch('https://mern-test-usless-p.vercel.app/api/items'); // Replace with your actual API endpoint
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();

      // Check if the expected property exists
      if (data && Array.isArray(data)) {
        setItems(data); // Set the items if the structure is correct
      } else {
        throw new Error('Data structure is not as expected');
      }
    } catch (err) {
      setError(err.message); // Set error message in case of failure
    } finally {
      setLoading(false); // Set loading to false regardless of success or failure
    }
  };

  // Fetch items on component mount
  useEffect(() => {
    fetchItems();
  }, []);

  // Conditional rendering based on loading, error, or fetched items
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h1>List of Items</h1>
      <ul>
        {items.map(item => (
          <li key={item._id}>
            <h2>{item.name}</h2>
            <p>{item.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ListPage;
