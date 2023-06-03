import React from 'react';
import { FaTrophy, FaGlassCheers, FaArrowRight } from 'react-icons/fa';
import './Card.css';

class Card extends React.Component {
  handleClickBarista = (idPlayer) => {
    const { handleNextPlayer } = this.props;
    const shotNum = Math.floor(Math.random() * 3) + 1;
    handleNextPlayer(3, shotNum, idPlayer);
  };

  renderBaristaButtons = (roundPlayers) => {
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
              onClick={() => this.handleClickBarista(person.id)}
            >
              {initials}
            </button>
          );
        })}
      </>
    );
  };

  render() {
    const { description, category, difficulty, roundPlayers, handleNextPlayer } = this.props;
    const shotNum = Math.floor(Math.random() * 3) + 1;
    const getCategoryText = (category) => {
      const categories = [
        'Desafío',
        'Confesión',
        'Barismo',
        'Competencia',
        'Evento'
      ];
      return categories[category - 1];
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
      default:
        backgroundColor = '#A8216B';
        break;
    }

    return (
      <div className="card" style={{ backgroundColor }}>
        <h3 className="card-event-title">{getCategoryText(category)}</h3>
        <div className="card-description">
          <p>{description}<br /><br />+{shotNum}</p>
        </div>
        <div className="card-buttons">
          {category === 3 && this.renderBaristaButtons(roundPlayers)}
          {category === 4 && this.renderBaristaButtons(roundPlayers)}
          {category !== 5 && category !== 4 && category !== 3 && (
            <button className="card-button" onClick={() => handleNextPlayer(1, shotNum)}>
              <FaTrophy size={35} />
            </button>
          )}
          {category !== 1 && category !== 2 && category !== 3 && category !== 4 && (
            <button className="card-button" onClick={() => handleNextPlayer()}>
              <FaArrowRight size={35} />
            </button>
          )}
          {category !== 5 && (
            <button className="card-button" onClick={() => handleNextPlayer(2, shotNum)}>
              <FaGlassCheers size={35} />
            </button>
          )}
        </div>
        {category === 4 && (
          <p className="barista-text">Seleccione al perdedor</p>
        )}
      </div>
    );
  }
}

export default Card;
