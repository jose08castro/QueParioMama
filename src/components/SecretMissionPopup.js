import React from 'react';
import './SecretMissionPopup.css';
import { FaTrophy, FaGlassCheers } from 'react-icons/fa';

function SecretMissionPopup({ playerSecretMissionIndex, finishedSecretMissionIndex, description, handleSecretMissionFinish }) {
    return (
    <div className='card-popup-background'>
      <div className="card-popup">
        <div className="card-header">
          <h3 className="card-event-title">Misión Finalizada</h3>
        </div>
        <div className="card-description">
          {description}
        </div>
        <div className='shotNumber'>
          +4
        </div>
        <div className="card-buttons">
          <button className="card-button" onClick={() => handleSecretMissionFinish(1, playerSecretMissionIndex, finishedSecretMissionIndex)}>
            <FaTrophy size={35} />
          </button>
          <button className="card-button" onClick={() => handleSecretMissionFinish(2, playerSecretMissionIndex, finishedSecretMissionIndex)}>
            <FaGlassCheers size={35} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default SecretMissionPopup;
