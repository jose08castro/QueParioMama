import { FaQuestion } from 'react-icons/fa';
import './Card.css';

const CardSecretMissionBack = ({ personName }) => {

    return (
        <div>
            <div className="card-header">
                <h3 className="card-event-title">Misión secreta</h3>
            </div>
            <div className="card-description">
                {/* <div>{personName}</div> */}
                <div className="questionMark">
                    <FaQuestion size={200} />
                </div>
            </div>
            <div className='shotNumber-back'>
            {personName}, clic para voltear la carta
            </div>
            <div className="card-buttons">
                <button className="card-button-back"></button>
            </div>
        </div>
    )
};

export default CardSecretMissionBack;
