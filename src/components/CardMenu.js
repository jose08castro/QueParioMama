import React, { useState, useEffect, useRef } from 'react';
import './CardMenu.css';
import { Link } from 'react-router-dom';
import Card from './Card';

function CardMenu({ people, updatePeopleList }) {
  const [cards, setCards] = useState([]);
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);
  const [secondRandomPlayerIndex, setSecondRandomPlayerIndex] = useState(1);
  const zarpeLinkRef = useRef(null);

  const randomNum = getRandomNum(cards);
  const roundPlayers = getPlayers(currentPlayerIndex, secondRandomPlayerIndex, cards[randomNum]?.category);

  function getRandomNum(list, excludeIndex) {
    const maxLength = list.length;
    let randomNumber = Math.floor(Math.random() * maxLength);
    while (randomNumber === excludeIndex) {
      randomNumber = Math.floor(Math.random() * maxLength);
    }
    return randomNumber;
  }

  function getPlayers(currentPlayerIndex, secondRandomPlayerIndex, category) {
    if (category === 3) {
      return people.filter((person, index) => index !== currentPlayerIndex);
    } else if (category === 4) {
      return people.filter((person, index) => index === secondRandomPlayerIndex);
    } else {
      return [];
    }
  }

  const handleNextPlayer = (index, num, idPlayer) => {
    const updatedPeople = [...people];
    switch (index) {
      case 1:
        updatedPeople[currentPlayerIndex].score += num;
        break;
      case 2:
        updatedPeople[currentPlayerIndex].shots += num;
        break;
      case 3:
        const playerIndex = updatedPeople.findIndex((person) => person.id === idPlayer);
        if (playerIndex !== -1) {
          updatedPeople[playerIndex].shots += num;
        }
        break;
      default:
        break;
    }

    setCards((prevCards) => {
      const updatedCards = [...prevCards];
      updatedCards.splice(randomNum, 1);
      return updatedCards;
    });
    if (cards.length === 1) {
      console.log('Finalizado');
      if (zarpeLinkRef.current) {
        zarpeLinkRef.current.click();
      }
    }
    if (cards[randomNum]?.category !== 5) {
      setCurrentPlayerIndex((prevIndex) => {
        const newIndex = (prevIndex + 1) % people.length;
        setSecondRandomPlayerIndex(getRandomNum(people, newIndex));
        return newIndex;
      });
    }
    updatePeopleList(updatedPeople);
  };

  useEffect(() => {
    const fetchCards = async () => {
      try {
        const response = await fetch(
          'https://raw.githubusercontent.com/jose08castro/QueParioMama/master/src/json/cards.json'
        );
        const data = await response.json();
        setCards(data.data);
      } catch (error) {
        console.error('Error fetching cards:', error);
      }
    };

    fetchCards();
  }, []);

  return (
    <div className="over-card-menu-container">
      <div className="card-menu-container">
        <Card
          description={
            cards[randomNum]?.category === 5
              ? cards[randomNum]?.description
              : cards[randomNum]?.category === 4
              ? `${people[currentPlayerIndex].name} y ${people[secondRandomPlayerIndex].name} ${cards[randomNum]?.description}`
              : `${people[currentPlayerIndex].name} ${cards[randomNum]?.description}`
          }
          category={cards[randomNum]?.category}
          difficulty={cards[randomNum]?.difficulty}
          roundPlayers={roundPlayers}
          handleNextPlayer={handleNextPlayer}
        />
        <div>
          <div className="buttons-container">
            {/* <Link to="/nameMenu" className="button">
              Regresar
            </Link> */}
            <Link to="/resultMenu" className="zarpe-button" ref={zarpeLinkRef}>
              ZARPE
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CardMenu;