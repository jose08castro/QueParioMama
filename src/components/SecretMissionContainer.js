import React from 'react';
import './SecretMissionContainer.css';

const SecretMissionContainer = ({ people }) => {
    return (
      <div className="secret-mission-container">
        {people.map((person) => (
          <React.Fragment key={person.id}>
            {person.secretMissions.length > 0 &&
              person.secretMissions.map((mission, index) => (
                <div key={index} className="name-circle">
                  <p>{person.name.charAt(0)}</p>
                  <div className="turns-circle">
                    <p>{mission.turns}</p>
                  </div>
                </div>
              ))}
          </React.Fragment>
        ))}
      </div>
    );
  };
  
export default SecretMissionContainer;
