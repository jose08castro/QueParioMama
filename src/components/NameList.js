import React from 'react';
import './NameList.css';

const NameList = ({ people, deletePerson, editPerson }) => {
  return (
    <div className="name-list-container">
      {people.map((person) => (
        <div className="name-card" key={person.id} style={{ backgroundColor: person.color}}>
          <div className="name-circle">
            <span className="circle-text">{person.name.split(' ').map((namePart) => namePart.charAt(0)).join('.')}</span>
          </div>
          <input
            className="name-input"
            type="text"
            value={person.name}
            onChange={(e) => editPerson(person.id, e.target.value)}
          />
          <div className="delete-button" onClick={() => deletePerson(person.id)}></div>
        </div>
      ))}
    </div>
  );
};

export default NameList;