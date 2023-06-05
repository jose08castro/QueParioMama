import React, { useState, useEffect, useRef } from 'react';
import './CardMenu.css';
import { Link } from 'react-router-dom';
import Card from './Card';
import Market from './Market';

function CardMenu({ people, updatePeopleList }) {
  const [cards, setCards] = useState([]);
  const [specialCards] = useState([{
    id: 999,
    subtitle: "Botellita",
    description: "",
    category: 6,
    group: 0,
    level: 0,
    special: 1
  }]);
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);
  const [secondRandomPlayerIndex, setSecondRandomPlayerIndex] = useState(1);
  const [isMarketOpen, setMarketOpen] = useState(false);
  const [randomNum, setRandomNum] = useState(null);
  const [shotNum, setShotNum] = useState(1);

  const zarpeLinkRef = useRef(null);

  const roundPlayers = getPlayers(currentPlayerIndex, secondRandomPlayerIndex, cards[randomNum]?.category);

  const handleToggleMarket = (event) => {
    setMarketOpen(!isMarketOpen);
    event.stopPropagation();
  };

  function getRandomNum(list, excludeIndex) {
    const maxLength = list.length;
    let randomNumber = Math.floor(Math.random() * maxLength);
    if (randomNumber + 1 === maxLength) {
      randomNumber = randomNumber - 1;
    }
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

  const handleMarketPurchase = (price, item) => {
    const updatedPeople = [...people];
    updatedPeople[currentPlayerIndex].score -= price;
    updatePeopleList(updatedPeople);
    switch (item) {
      case 0:
        setCards(prevCards => [...prevCards, specialCards[0]]);
        break;
      case 1:
        setMarketOpen(!isMarketOpen);
        setRandomNum((actualRandom) => {
          let newRandom = getRandomNum(cards, actualRandom);
          while (cards[newRandom]?.category === 5) {
            newRandom = getRandomNum(cards, actualRandom);
          }
          return newRandom;
        });
        break;
      case 2:
        const punished = getRandomNum(people, currentPlayerIndex);
        people[punished].plusShots += 2;
        people[punished].plusShotsRounds += 2;
        break;
      case 3:
        setCurrentPlayerIndex((prevIndex) => {
          const newIndex = (prevIndex + 1) % people.length;
          setMarketOpen(!isMarketOpen);
          // setSecondRandomPlayerIndex(getRandomNum(people, newIndex));
          return newIndex;
        });
        break;
      case 4:
        people[currentPlayerIndex].plusShots = 0;
        people[currentPlayerIndex].plusShotsRounds = 0;
        break;
      default:
        break;
    }
  }

  const handleNextPlayer = (index, num, idPlayer) => {
    setMarketOpen(false);
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

    setRandomNum(getRandomNum(cards));
    setShotNum(Math.floor(Math.random() * 3) + 1);

    if (cards.length === 1) {
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
        setRandomNum(getRandomNum(data.data));
      } catch (error) {
        console.error('Error fetching cards:', error);
      }
    };

    fetchCards();
  }, []);

  return (
    <div className="over-card-menu-container">
      <div className="card-menu-container">
        {isMarketOpen &&
          <Market
            isOpen={isMarketOpen}
            playerScore={people[currentPlayerIndex].score}
            handleMarketPurchase={handleMarketPurchase}
          />}
        <Card disabled={!isMarketOpen}
          description={
            cards[randomNum]?.category === 5
              ? cards[randomNum]?.description
              : cards[randomNum]?.category === 4
                ? `${people[currentPlayerIndex].name} y ${people[secondRandomPlayerIndex].name} ${cards[randomNum]?.description}`
                : `${people[currentPlayerIndex].name} ${cards[randomNum]?.description}`
          }
          subtitle={cards[randomNum]?.subtitle}
          category={cards[randomNum]?.category}
          difficulty={cards[randomNum]?.difficulty}
          shotNum={shotNum}
          plusShots={
            cards[randomNum]?.category === 1 || cards[randomNum]?.category === 2 
              ? people[currentPlayerIndex].plusShots
              : 0
          }
          roundPlayers={roundPlayers}
          handleNextPlayer={handleNextPlayer}
          handleToggleMarket={handleToggleMarket}
          people={people.filter((person, index) => index !== currentPlayerIndex)}
          pDescriptionCounter={0}
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
