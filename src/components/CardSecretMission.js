import { FaArrowRight } from 'react-icons/fa';
import './Card.css';

const CardSecretMission = ({ description, shotNum, turnNum, handleNextPlayer }) => {

    return (
        <div>
            <div className="card-description">
                <div>{description}</div>
            </div>
            <div className='shotNumber'>
                +{shotNum}
            </div>
            <div className="card-buttons">
                <button className="card-button" onClick={() => { handleNextPlayer(7, shotNum, turnNum); }}>
                    <FaArrowRight size={35} />
                </button>
            </div>
        </div>
    )
};

export default CardSecretMission;
