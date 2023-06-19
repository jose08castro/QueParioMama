import { FaArrowRight } from 'react-icons/fa';
import './Card.css';

const CardEvent = ({ description, shotNum, notShowShot, handleNextPlayer }) => {

    return (
        <div>
            <div className="card-description">
                <div>{description}</div>
            </div>
            {(!notShowShot && <div className='shotNumber'>
                +{shotNum}
            </div>)}
            <div className="card-buttons">
                <button className="card-button" onClick={() => { handleNextPlayer(); }}>
                    <FaArrowRight size={35} />
                </button>
            </div>
        </div>
    )
};

export default CardEvent;
