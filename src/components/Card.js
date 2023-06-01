import React from 'react';
import { FaTrophy, FaGlassCheers } from 'react-icons/fa';
import './Card.css'

class Card extends React.Component {
  render() {
    const { description, category, difficulty } = this.props;

    return (
      <div className="card">
        <h3 className="card-event-title">{category}</h3>
        <div className="card-description">
          <p>{description}</p>
          <p>+{Math.floor(Math.random() * 3) + 1}</p>
        </div>
        <div className="card-buttons">
          <button className="card-button">
            <FaTrophy size={35} />
          </button>
          <button className="card-button">
            <FaGlassCheers size={35} />
          </button>
        </div>
      </div>
    );
  }
}

export default Card;