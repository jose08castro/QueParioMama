import React, { useState, useEffect, useRef } from 'react';
import './CardMenu.css';
import { Link } from 'react-router-dom';
import Card from './Card';
import Market from './Market';
import RuleBarContainer from './RuleBarContainer';
import SecretMissionContainer from './SecretMissionContainer';
import SecretMissionPopup from './SecretMissionPopup';
import nextCardSoundFile from '../sounds/NextCard.wav';
import PurchaseSoundFile from '../sounds/CashRegisterPurchase.mp3';
// import serviceBellSoundFile from '../sounds/ServiceBell.wav'
// import doorCloseSoundFile from '../sounds/DoorClose.mp3'
import victorySoundFile from '../sounds/Victory.wav'
import glassClinkSoundFile from '../sounds/GlassClink.mp3'
import secretMissionPopupSoundFile from '../sounds/SecretMissionPopup.mp3'

function CardMenu({ people, updatePeopleList }) {
  const [cards, setCards] = useState([{}]);
  const [specialCards] = useState([
    {
      id: 901,
      subtitle: "Botellita",
      description: "",
      category: 6,
      group: 0,
      level: 0,
      special: 1
    },
    {
      id: 902,
      subtitle: "Kamasutra",
      description: "",
      category: 6,
      group: 0,
      level: 0,
      special: 2
    },
  ]);

  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);
  const [secondRandomPlayerIndex, setSecondRandomPlayerIndex] = useState(1);
  const [isMarketOpen, setMarketOpen] = useState(false);
  const [randomNum, setRandomNum] = useState(0);
  const [shotNum, setShotNum] = useState(1);
  const [turnNum, setTurnNum] = useState(2);
  const [isLoading, setIsLoading] = useState(true);
  const [playerSecretMissionIndex, setPlayerSecretMissionIndex] = useState(null);
  const [finishedSecretMissionIndex, setFinishedSecretMissionIndex] = useState(null);
  const [isSecretMissionPopupOpen, setSecretMissionPopupOpen] = useState(false);

  const nextCardSound = new Audio(nextCardSoundFile);
  const purchaseSound = new Audio(PurchaseSoundFile);
  // const serviceBellSound = new Audio(serviceBellSoundFile);
  // const doorCloseSound = new Audio(doorCloseSoundFile);
  const victorySound = new Audio(victorySoundFile);
  const glassClinkSound = new Audio(glassClinkSoundFile);
  const secretMissionPopupSound = new Audio(secretMissionPopupSoundFile);

  const zarpeLinkRef = useRef(null);

  useEffect(() => {
    const fetchCards = async () => {
      try {
        const response = await fetch(
          'https://raw.githubusercontent.com/jose08castro/QueParioMama/master/src/json/cards.json'
        );
        const data = await response.json();
        setCards(data.data);
        setRandomNum(getRandomNum(data.data));
        setIsLoading(false); // Datos cargados correctamente, establecer isLoading en false
      } catch (error) {
        console.error('Error fetching cards:', error);
      }
    };

    fetchCards();
  }, []);

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


  const handleToggleMarket = (event) => {
    nextCardSound.play();
    setMarketOpen(!isMarketOpen);
    event.stopPropagation();
  };

  const handleMarketPurchase = (price, item) => {
    purchaseSound.play();
    const updatedPeople = [...people];
    const currentPlayer = updatedPeople[currentPlayerIndex];

    switch (item) {
      case 0:
        setCards((prevCards) => [...prevCards, specialCards[Math.floor(Math.random() * specialCards.length)]]);
        break;
      case 1:
        setMarketOpen(false);
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
        updatedPeople[punished].plusShots += (Math.floor(Math.random() * 2) + 1);
        // updatedPeople[punished].plusShotsRounds += 2;
        break;
      case 3:
        setCurrentPlayerIndex((prevIndex) => {
          const newIndex = (prevIndex + 1) % people.length;
          setMarketOpen(false);
          return newIndex;
        });
        break;
      case 4:
        currentPlayer.plusShots = 0;
        // currentPlayer.plusShotsRounds = 0;
        break;
      default:
        break;
    }

    currentPlayer.money -= price;
    updatePeopleList(updatedPeople);
  };

  const handleSecretMissionFinish = (scenario, playerSecretMissionIndex, finishedSecretMissionIndex) => {
    const updatedPeople = [...people];
    switch (scenario) {
      case 1: //Victoria (Misión secreta)
        victorySound.play();
        updatedPeople[playerSecretMissionIndex].score += 4;
        updatedPeople[playerSecretMissionIndex].money += 4;
        break;
      case 2: //Perdida (Misión secreta)
        glassClinkSound.play();
        updatedPeople[playerSecretMissionIndex].shots += 4;
        break;
      default: //Evento
        break;
    }

    updatedPeople[playerSecretMissionIndex].secretMissions.splice(finishedSecretMissionIndex, 1);
    updatePeopleList(updatedPeople);
    setFinishedSecretMissionIndex(null);
    setPlayerSecretMissionIndex(null);
    setSecretMissionPopupOpen(false);
  };

  const handleNextPlayer = (scenario, num, pTurns, idPlayer) => {
    setMarketOpen(false);
    const updatedPeople = [...people];
    const currentPlayer = updatedPeople[currentPlayerIndex];
    const playerIndex = updatedPeople.findIndex((person) => person.id === idPlayer);
    const currentCard = { ...cards[randomNum] };

    switch (scenario) {
      case 1: //Victoria (Desafío y Confesión)
        victorySound.play();
        currentPlayer.score += num;
        currentPlayer.money += num;
        break;
      case 2: //Perdida (Desafío y Confesión)
        glassClinkSound.play();
        currentPlayer.shots += num;
        break;
      case 3: //Barismo
        glassClinkSound.play();
        if (playerIndex !== -1) {
          updatedPeople[playerIndex].shots += num;
        }
        break;
      case 4: //Competencia
        glassClinkSound.play();
        if (playerIndex !== -1) {
          updatedPeople[playerIndex].shots += num;
        }
        if (currentPlayer !== updatedPeople[playerIndex]) {
          currentPlayer.score += num;
          currentPlayer.money += num;
        }
        break;
      case 7: //Misión secreta
        nextCardSound.play();
        currentCard.turns = pTurns + 1; //Este +1 es porque inmediatamente después de agregar a secretMissions se hará -1 en la comprobación.
        currentPlayer.secretMissions.push(currentCard);
        break;
      default: //Evento
        nextCardSound.play();
        break;
    }

    if (currentPlayer.secretMissions.length > 0) {
      currentPlayer.secretMissions.forEach(secretCard => {
        secretCard.turns--;
        if (secretCard.turns === 0) {
          const currentCardIndex = currentPlayer.secretMissions.findIndex(
            (card) => card.id === secretCard.id
          );
          setFinishedSecretMissionIndex(currentCardIndex);
          setPlayerSecretMissionIndex(currentPlayerIndex);
          secretMissionPopupSound.play();
          setSecretMissionPopupOpen(true);
          // currentPlayer.secretMissions.splice(currentCardIndex, 1);
        }
      });
    }

    setCards((prevCards) => {
      const updatedCards = [...prevCards];
      updatedCards.splice(randomNum, 1);
      return updatedCards;
    });

    setRandomNum(getRandomNum(cards));
    setShotNum(Math.floor(Math.random() * 3) + 1);
    setTurnNum(Math.floor(Math.random() * 5) + 2);

    if (cards.length === 1 && zarpeLinkRef.current) {
      zarpeLinkRef.current.click();
    }

    if (cards[randomNum]?.category !== 5) {
      setCurrentPlayerIndex((prevIndex) => {
        const newIndex = (prevIndex + 1) % people.length;
        setSecondRandomPlayerIndex(getRandomNum(people, newIndex));
        return newIndex;
      });
    }
    console.log(cards);
    updatePeopleList(updatedPeople);
  };

  return (
    <div className="over-card-menu-container">
      {(isLoading ? (
        <div className="loading-container">
          <div className="loading-spinner"></div>
        </div>
      ) : (
        <div className="card-menu-container">
          {isSecretMissionPopupOpen && (
            <SecretMissionPopup
              playerSecretMissionIndex={playerSecretMissionIndex}
              finishedSecretMissionIndex={finishedSecretMissionIndex}
              description={people[playerSecretMissionIndex].name + ", su misión era: " + people[playerSecretMissionIndex].secretMissions[finishedSecretMissionIndex].description + " ¿completado?"}
              handleSecretMissionFinish={handleSecretMissionFinish}
            />
          )}
          <div className="card-menu-rule">
            <RuleBarContainer
              people={people}
              category={cards[randomNum]?.category} />
          </div>
          <br />
          {isMarketOpen && (
            <Market
              isOpen={isMarketOpen}
              playerMoney={people[currentPlayerIndex].money}
              handleMarketPurchase={handleMarketPurchase}
            />
          )}
          <Card
            people={people}
            currentPlayerIndex={currentPlayerIndex}
            secondRandomPlayerIndex={secondRandomPlayerIndex}
            cardInfo={cards[randomNum]}
            shotNum={shotNum}
            turnNum={turnNum}
            handleNextPlayer={handleNextPlayer}
            handleToggleMarket={handleToggleMarket}
          />
          <SecretMissionContainer people={people} />
          <div>
            <div className="buttons-container">
              <Link to="/resultMenu" className="zarpe-button" ref={zarpeLinkRef}>
                ZARPE
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default CardMenu;