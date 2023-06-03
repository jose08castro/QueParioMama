import React, { useEffect, useState } from 'react';

const MyComponent = () => {
  const [cards, setCards] = useState([]);

  useEffect(() => {
    const fetchCards = async () => {
      try {
        const response = await fetch('https://raw.githubusercontent.com/jose08castro/QueParioMama/master/src/json/cards.json');
        const data = await response.json();
        setCards(data.data);
      } catch (error) {
        console.error('Error fetching cards:', error);
      }
    };

    fetchCards();
  }, []);

  return (
    <div>
    <h1>HOLA</h1>
      {cards.map((card) => (
        <div key={card.id}>
          <p>{card.description}</p>
          <p>{card.category}</p>
          {/* Renderizar otros datos del cardObj si es necesario */}
        </div>
      ))}
    </div>
  );
};

export default MyComponent;