import React, { useState, useEffect } from 'react';
import './CardMenu.css';
import { Link } from 'react-router-dom';
import Card from './Card';

function CardMenu({ people }) {
  const [cards, setCards] = useState([]);
  const [randomNum, setRandomNum] = useState(0);

  useEffect(() => {
    // Cargar los datos del archivo JSON local
    console.log("Sí");
    fetch('../src/json/Hola')
      .then((response) => response.json())
      .then((data) => {
        setCards(data); // Asignar los datos a la variable cards
        setRandomNum(Math.floor(Math.random() * data.length)); // Generar un número aleatorio
      })
      .catch((error) => {
        console.error('Error al cargar los datos del archivo JSON:', error);
      });
  }, []);

  return (
    <div className="over-card-menu-container">
      <div className="card-menu-container">
        <Card
          description={cards[randomNum]?.description}
          category={cards[randomNum]?.category}
          difficulty={cards[randomNum]?.difficulty}
        />
        <div>
          <div className="buttons-container">
            <Link to="/nameMenu" className="button">
              Regresar
            </Link>
            <Link to="/cardMenu" className="button">
              Continuar
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CardMenu;