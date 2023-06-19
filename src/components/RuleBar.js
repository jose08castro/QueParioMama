import React, { useState, useEffect } from 'react';
import './RuleBar.css';
import { FaInfoCircle } from 'react-icons/fa';

const RuleBar = ({ player, title, showTime, color, popupVisible, ruleDescription, onClick }) => {

  return (
    <div className="rule-bar-container">
      <div className='rule-bar' style={{ color }} onClick={onClick}>
        <div className='rule-bar-title-timer'>
          <FaInfoCircle size={18}/>&nbsp;
          <div className='rule-bar-title'>{player} {title}</div>
          <div className='rule-bar-timer'> {showTime}</div>
        </div>
        {popupVisible && (
          <div className='rule-bar-description'>{ruleDescription}</div>
        )}
      </div>
    </div>
  );
};

export default RuleBar;
