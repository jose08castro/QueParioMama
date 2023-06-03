import React from 'react';
import { Link } from 'react-router-dom';
import './ResultMenu.css';

const ResultMenu = ({ people, resetPeopleList }) => {
  // Ordenar la lista por score en orden descendente
  const sortedPeople = [...people].sort((a, b) => {
    if (a.score === b.score) {
      return a.shots - b.shots; // Ordenar por shots si el score es el mismo
    }
    return b.score - a.score;
  });

  const handleFinish = () => {
    resetPeopleList(); // Restablecer la lista de people en el componente padre
  };

  return (
    <div className="over-result-menu-container">
      <div className="result-menu-container">
        <h2 className="result-menu-title">RESULTADOS</h2>
        <div className="result-card">
          <div>Nombre</div>
          <div className="icons">
            <i className="fas fa-trophy"></i>
            <i className="fas fa-glass-cheers"></i>
          </div>
        </div>
        <div className="result-list-container">
          {sortedPeople.map((person) => (
            <div className="result-card" key={person.id} style={{ backgroundColor: person.color }}>
              <div>{person.name}</div>
              <div className="result-metrics">
                <span className="score">{person.score}</span>
                <span className="shots">{person.shots}</span>
              </div>
            </div>
          ))}
        </div>
        <div className="buttons-container">
          <Link to="/" className="button" onClick={handleFinish}>
            Finalizar
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ResultMenu;
