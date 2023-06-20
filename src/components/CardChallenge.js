import { useState } from 'react';
import { FaTrophy, FaGlassCheers, FaSkull } from 'react-icons/fa';
import Timer from './Timer';
import './Card.css';

const CardChallange = ({ description, shotNum, plusShots, notShowShot, time, handleNextPlayer }) => {
    const [showTimer, setShowTimer] = useState(true);

    const resetValues = () => {
        setShowTimer(true);
    };

    const handleTimer = () => {
        setShowTimer(false);
    };

    return (
        <div>
            <div className="card-description">
                <div>{description}</div>
                {time > 0 && showTimer && (
                    <Timer initialTime={time} handleTimer={handleTimer} />
                )}
            </div>
            {(!notShowShot &&<div className='shotNumber'>
                +{shotNum + plusShots}
                {plusShots >= 1 && (
                    <div className='punishment-icon'>
                        <FaSkull size={15} />
                    </div>
                )}
            </div>)}
            <div className="card-buttons">
                <button className="card-button" onClick={() => {handleNextPlayer(1, shotNum); resetValues(); }}>
                    <FaTrophy size={35} />
                </button>
                <button className="card-button" onClick={() => { handleNextPlayer(2, shotNum); resetValues(); }}>
                    <FaGlassCheers size={35} />
                </button>
            </div>
        </div>
    )
};

export default CardChallange;
