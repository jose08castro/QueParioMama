import React from 'react';

const RulePopup = ({ title, description, onClose }) => {
  return (
    <div className="popup">
      <h2>{title}</h2>
      <p>{description}</p>
      <button onClick={onClose}>Cerrar</button>
    </div>
  );
};

export default RulePopup;