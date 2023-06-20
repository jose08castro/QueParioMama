import React, { useState, useRef, useEffect } from 'react';
import './SelectionMenu.css';
import { Link, useNavigate } from 'react-router-dom';

const SelectionMenu = ({ updateSelectedOption }) => {
  const optionsCouple = [
    { id: 1, text: 'Primer juego', backgroundColor: "#2940E5", level: 2, cardsMaxNum: 40, balancedCards: false, market: false, rules: 'none' },
    { id: 2, text: 'Entre amigos', backgroundColor: "#6ABE47", level: 3, cardsMaxNum: 40, balancedCards: false, market: false, rules: 'none' },
    { id: 3, text: 'Sugestivo', backgroundColor: "#FCBE43", level: 4, cardsMaxNum: 40, balancedCards: false, market: false, rules: 'none' },
    { id: 4, text: '+18', backgroundColor: "#EA4B5D", level: 5, cardsMaxNum: 40, balancedCards: false, market: false, rules: 'none' },
    { id: 5, text: 'Personalizado', backgroundColor: "#49475C", level: 5, cardsMaxNum: 40, balancedCards: false, market: false, rules: 'none' }
  ];
  
  const optionsGroup = [
    { id: 1, text: 'Romper el hielo', backgroundColor: "#2940E5", level: 2, cardsMaxNum: 40, balancedCards: false, market: false, rules: 'none' },
    { id: 2, text: 'Entre amigos', backgroundColor: "#6ABE47", level: 3, cardsMaxNum: 40, balancedCards: false, market: false, rules: 'none' },
    { id: 3, text: 'Sugestivo', backgroundColor: "#FCBE43", level: 4, cardsMaxNum: 40, balancedCards: false, market: false, rules: 'none' },
    { id: 4, text: '+18', backgroundColor: "#EA4B5D", level: 5, cardsMaxNum: 40, balancedCards: false, market: false, rules: 'none' },
    { id: 5, text: 'Personalizado', backgroundColor: "#49475C", level: 5, cardsMaxNum: 40, balancedCards: false, market: false, rules: 'none' }
  ];

  const navigate = useNavigate();
  const [isPopupOpen, setPopupOpen] = useState(false);
  const [level, setLevel] = useState(3);
  const [cardsMaxNum, setCardsMaxNum] = useState(40);
  const [balancedCards, setBalancedCards] = useState(false);
  const [market, setMarket] = useState(false);
  const [rules, setRules] = useState('none');

  const popupRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        setPopupOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleOptionClick = (option) => {
    if (option.text !== 'Personalizado') {
      updateSelectedOption(option);
      navigate('/nameMenu');
    } else {
      setPopupOpen(true);
    }
  };

  const handlePopupClose = () => {
    setPopupOpen(false);
  };

  const handlePopupNext = () => {
    const personalizedOption = {
      id: 5,
      text: 'Personalizado',
      backgroundColor: "#49475C",
      level,
      cardsMaxNum,
      balancedCards,
      market,
      rules
    };
    updateSelectedOption(personalizedOption);
    navigate('/nameMenu');
  };

  let options;
  if (level === 2) {
    options = optionsCouple;
  } else {
    options = optionsGroup;
  }

  return (
    <div className='over-selection-menu-container'>
      <div className="selection-menu">
        <div className="selection-menu-options">
          <div
            className={`selection-menu-option ${level === 2 ? 'active' : ''}`}
            onClick={() => setLevel(2)}
          >
            Parejas
          </div>
          <div
            className={`selection-menu-option ${level === 3 ? 'active' : ''}`}
            onClick={() => setLevel(3)}
          >
            Grupos
          </div>
        </div>
        {options.map(option => (
          <div
            key={option.id}
            className="selection-card"
            style={{ backgroundColor: option.backgroundColor }}
            onClick={() => handleOptionClick(option)}
          >
            {option.text}
          </div>
        ))}
        <div className="buttons-container">
          <Link to="/" className="button">
            Regresar
          </Link>
        </div>
      </div>
      {isPopupOpen && (
        <div className="popup" ref={popupRef}>
          <h3>Personalizar</h3>
          <div className="popup-options">
            <div className="popup-option">
              <label htmlFor="cardsMaxNum">Número de cartas:</label>
              <input type="range" id="cardsMaxNum" min={40} max={300} value={cardsMaxNum} onChange={e => setCardsMaxNum(parseInt(e.target.value))} />
              <span>{cardsMaxNum === 300 ? 'Máx' : cardsMaxNum}</span>
            </div>
            <div className="popup-option">
              <label htmlFor="market">Mercado:</label>
              <input type="checkbox" id="market" checked={market} onChange={() => setMarket(!market)} />
            </div>
            <div className="popup-option">
              <label htmlFor="balancedCards">Cartas balanceadas:</label>
              <input type="checkbox" id="balancedCards" checked={balancedCards} onChange={() => setBalancedCards(!balancedCards)} />
            </div>
            <div className="popup-option">
              <label>Reglas:</label>
              <div className="radio-group">
                <label>
                  <input type="radio" name="rules" value="none" checked={rules === 'none'} onChange={() => setRules('none')} />
                  Ninguno
                </label>
                <label>
                  <input type="radio" name="rules" value="time" checked={rules === 'time'} onChange={() => setRules('time')} />
                  Por tiempo
                </label>
                <label>
                  <input type="radio" name="rules" value="turn" checked={rules === 'turn'} onChange={() => setRules('turn')} />
                  Por turno
                </label>
              </div>
            </div>
          </div>
          <div className="popup-buttons-container">
            <button className="popup-button" onClick={handlePopupClose}>Atrás</button>
            <button className="popup-button" onClick={handlePopupNext}>Siguiente</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SelectionMenu;
