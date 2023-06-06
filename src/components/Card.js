import { useState, useEffect } from 'react';
import { FaTrophy, FaGlassCheers, FaArrowRight, FaShoppingBasket, FaSkull } from 'react-icons/fa';
import './Card.css';
import Spinner from './Spinner';

const Card = ({ subtitle, description, category, difficulty, shotNum, plusShots, roundPlayers, handleNextPlayer, handleToggleMarket, people }) => {
  const [newDescription, setNewDescription] = useState("");
  // const [selectedSector, setSelectedSector] = useState(null);
  const [bodyParts] = useState([
    { name: "labios", color: "#A8216B" },
    { name: "cachete", color: "#EC1B4B" },
    { name: "frente", color: "#F26A44" },
    { name: "oreja", color: "#F7DB69" },
    { name: "cuello", color: "#2E9598" },
    { name: "espalda", color: "#626ce1" },
    { name: "brazo", color: "#a10986" },
    { name: "ombligo", color: "#ff0b44" },
    { name: "muslo", color: "#dd7528" },
    { name: "mano", color: "#e8e266" },
    { name: "nalga", color: "#92d322" },
    { name: "abdomen", color: "#1a2954" }]);
  // #158356', '#712183', '#273e02', '#3aafb6', '#bad252', '#3f513b', '#96a85', '#54a25a', '#fc6920', '#24df92', '#9ef981', '#e7ba73'
  // ['#dfdb0a', '#a10986', '#dd7528', '#1a2954', '#92d322', '#626ce1', '#3e8911', '#3aec6', '#7e7866', '#9ce3e', '#153646', '#68fa6e']
  const [actions] = useState([
    { name: "chupe", color: "#ff0b44" },
    { name: "bese", color: "#a10986" },
    { name: "acaricie", color: "#dd7528" },
    { name: "muerda", color: "#1a2954" },
    { name: "azote", color: "#92d322" }
  ]);
  const [descriptionCounter, setDescriptionCounter] = useState(0);

  const handleClickBarista = (idPlayer, shotNum) => {
    handleNextPlayer(3, shotNum, idPlayer);
  };

  const renderBaristaButtons = (roundPlayers, shotNum) => {
    return (
      <>
        {roundPlayers.map((person) => {
          const initials = person.name
            .split(' ')
            .map((namePart) => namePart.charAt(0))
            .join('.');
          return (
            <button
              key={person.id}
              className="card-button"
              onClick={() => handleClickBarista(person.id, shotNum)}
            >
              {initials}
            </button>
          );
        })}
      </>
    );
  };

  const addArticle = (word) => {
    if (["cachete", "cuello", "brazo", "ombligo", "muslo", "abdonomen"].includes(word)) {
      return "el";
    } else if (["frente", "oreja", "espalda", "mano", "nalga"].includes(word)) {
      return "la";
    } else {
      return "los";
    }
  };

  const getCategoryText = (category) => {
    const categories = [
      'Desafío',
      'Confesión',
      'Barismo',
      'Competencia',
      'Evento',
      'Especial'
    ];
    return categories[category - 1];
  };

  const handleSpinComplete = (sector) => {
    switch (descriptionCounter) {
      case 0:
        setNewDescription(prevDescription => prevDescription + sector + " a ");
        break;
      case 1:
        setNewDescription(prevDescription => prevDescription + sector + " en ");
        break;
      case 2:
        setNewDescription(prevDescription => prevDescription + addArticle(sector) + " " + sector + ".");
        break;
      default:
        break;
    }
    setDescriptionCounter(descriptionCounter + 1);
  };

  // useEffect(() => {
  //   if (selectedSector) {
  //     setNewDescription(prevDescription => prevDescription + selectedSector.name);
  //   }
  // }, [selectedSector]);

  const resetValues = () => {
    setNewDescription("");
    setDescriptionCounter(0);
  };

  let backgroundColor = '';
  switch (category) {
    case 5:
      backgroundColor = '#683697';
      break;
    case 1:
      backgroundColor = '#EC1B4B';
      break;
    case 4:
      backgroundColor = '#F26A44';
      break;
    case 3:
      backgroundColor = '#547734';
      break;
    case 6:
      backgroundColor = '#000000';
      break;
    default:
      backgroundColor = '#A8216B';
      break;
  }

  return (
    <div className="card" style={{ backgroundColor }}>
      <div className="card-header">
        {category !== 6 && category !== 5 && category !== 4 && (
          <button className="card-menu-button" onClick={handleToggleMarket}>
            <FaShoppingBasket />
          </button>
        )}
        <h3 className="card-event-title">{getCategoryText(category)}</h3>
      </div>
      {subtitle !== "" && (
        <h2 className="card-event-subtitle">{subtitle}</h2>
      )}
      <div className="card-description">
        <div>{description}</div>
        <div>{newDescription}</div>
        {category === 6 && descriptionCounter === 0 && (
          <div className="card-special-buttons">
            <Spinner people={[]} bodyParts={[]} actions={actions} onSpinComplete={handleSpinComplete} />
          </div>
        )}
        {category === 6 && descriptionCounter === 1 && (
          <div className="card-special-buttons">
            <Spinner people={people} bodyParts={[]} actions={[]} onSpinComplete={handleSpinComplete} />
          </div>
        )}
        {category === 6 && descriptionCounter === 2 && (
          <div className="card-special-buttons">
            <Spinner people={[]} bodyParts={bodyParts} actions={[]} onSpinComplete={handleSpinComplete} />
          </div>
        )}
        <div className='shotNumber'>
          +{shotNum+plusShots}
          {plusShots > 0 && (
            <div className='punishment-icon'>
              <FaSkull size={15}/>
            </div>
          )}
        </div>

      </div>
      <div className="card-buttons">
        {category === 3 && renderBaristaButtons(roundPlayers, shotNum)}
        {category === 4 && renderBaristaButtons(roundPlayers, shotNum)}
        {category !== 5 && category !== 4 && category !== 3 && (
          <button className="card-button" onClick={() => { handleNextPlayer(1, shotNum); resetValues(); }}>
            <FaTrophy size={35} />
          </button>
        )}
        {category !== 1 && category !== 2 && category !== 3 && category !== 4 && category !== 6 && (
          <button className="card-button" onClick={() => { handleNextPlayer(); resetValues(); }}>
            <FaArrowRight size={35} />
          </button>
        )}
        {category !== 5 && (
          <button className="card-button" onClick={() => { handleNextPlayer(2, shotNum); resetValues(); }}>
            <FaGlassCheers size={35} />
          </button>
        )}
      </div>
      {category === 4 && (
        <p className="barista-text">Seleccione al perdedor</p>
      )}
    </div>
  );
};

export default Card;
