import { useState, useEffect } from 'react';
import { FaShoppingBasket } from 'react-icons/fa';
import CardChallange from './CardChallenge';
import CardConfession from './CardConfession';
import CardBarismo from './CardBarismo';
import CardCompetition from './CardCompetition';
import CardEvent from './CardEvent';
import CardSpecial from './CardSpecial';
import CardSecretMission from './CardSecretMission';
import CardSecretMissionBack from './CardSecretMissionBack';
import flipCardSoundFile from '../sounds/FlipCard.wav';
import './Card.css';

const Card = ({ people, currentPlayerIndex, secondRandomPlayerIndex, cardInfo, shotNum, turnNum, handleNextPlayer, handleToggleMarket }) => {

  const flipCardSound = new Audio(flipCardSoundFile);
  const [isFlipped, setIsFlipped] = useState(false);

  useEffect(() => {
    setIsFlipped(cardInfo.category === 7);
  }, [cardInfo.category]);

  const getCategoryText = (category) => {
    const categories = [
      'Desafío',
      'Confesión',
      'Barismo',
      'Competencia',
      'Evento',
      'Especial',
      'Misión secreta'
    ];
    return categories[category - 1];
  };

  let backgroundColor = '';
  switch (cardInfo.category) {
    case 1:
      backgroundColor = '#EC1B4B';
      break;
    case 3:
      backgroundColor = '#547734';
      break;
    case 4:
      backgroundColor = '#F26A44';
      break;
    case 5:
      backgroundColor = '#683697';
      break;
    case 6:
      backgroundColor = '#000000';
      break;
    case 7:
      backgroundColor = '#626365';
      break;
    default:
      backgroundColor = '#A8216B';
      break;
  }

  const handleSecretCardRevealed = () => {
    if (cardInfo.category === 7 && isFlipped) {
      flipCardSound.play();
      setTimeout(() => {
        setIsFlipped(false);
      }, 100);
    }
  };

  return (
    <div className={`card ${isFlipped ? 'flipped' : ''}`} style={{ backgroundColor }} onClick={() => { handleSecretCardRevealed(); }}>
      {(!isFlipped ? (
        <div className='card-front'>
          <div className="card-header">
            {cardInfo.category !== 7 && cardInfo.category !== 6 && cardInfo.category !== 5 && cardInfo.category !== 4 && (
              <button className="card-menu-button" onClick={handleToggleMarket}>
                <FaShoppingBasket />
              </button>
            )}
            <h3 className="card-event-title">{getCategoryText(cardInfo.category)} {cardInfo.subtitle}</h3>
          </div>
          {/* <div><h2>{cardInfo.subtitle}</h2></div> */}

          {cardInfo.category === 1 && (
            <CardChallange
              description={people[currentPlayerIndex].name + " " + cardInfo.description}
              shotNum={shotNum}
              notShowShot={cardInfo.notShowShot}
              plusShots={people[currentPlayerIndex].plusShots}
              time={cardInfo.time}
              handleNextPlayer={handleNextPlayer} />
          )}
          {cardInfo.category === 2 && (
            <CardConfession
              description={people[currentPlayerIndex].name + " " + cardInfo.description}
              shotNum={shotNum}
              notShowShot={cardInfo.notShowShot}
              plusShots={people[currentPlayerIndex].plusShots}
              handleNextPlayer={handleNextPlayer} />
          )}
          {cardInfo.category === 3 && (
            <CardBarismo
              description={people[currentPlayerIndex].name + " " + cardInfo.description}
              shotNum={shotNum}
              notShowShot={cardInfo.notShowShot}
              roundPlayers={people}
              handleNextPlayer={handleNextPlayer} />
          )}
          {cardInfo.category === 4 && (
            <CardCompetition
              description={people[currentPlayerIndex].name + " y " + people[secondRandomPlayerIndex].name + " " + cardInfo.description}
              shotNum={shotNum}
              notShowShot={cardInfo.notShowShot}
              roundPlayers={people.filter((person, index) => index === secondRandomPlayerIndex || index === currentPlayerIndex)}
              handleNextPlayer={handleNextPlayer} />
          )}
          {cardInfo.category === 5 && (
            <CardEvent
              description={cardInfo.description}
              shotNum={shotNum}
              notShowShot={cardInfo.notShowShot}
              handleNextPlayer={handleNextPlayer}
            />
          )}
          {cardInfo.category === 6 && (
            <CardSpecial
              description={people[currentPlayerIndex].name + " " + cardInfo.description}
              shotNum={shotNum}
              notShowShot={cardInfo.notShowShot}
              people={people.filter((person, index) => index !== currentPlayerIndex)}
              specialNum={cardInfo.special}
              handleNextPlayer={handleNextPlayer} />
          )}
          {cardInfo.category === 7 && (
            <CardSecretMission
              description={people[currentPlayerIndex].name + " " + cardInfo.description + " tiene " + turnNum + " turnos para conseguirlo. O tome: "}
              shotNum={4} 
              turnNum={turnNum}
              handleNextPlayer={handleNextPlayer}/>
          )}
        </div>
      ) : (
        <div className='card-back'>
          <CardSecretMissionBack personName={people[currentPlayerIndex].name} />
        </div>
      ))}
    </div>
  );
};

export default Card;
