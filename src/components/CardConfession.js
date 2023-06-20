import { FaTrophy, FaGlassCheers, FaSkull } from 'react-icons/fa';
import './Card.css';

const CardConfession = ({ description, shotNum, plusShots, notShowShot, handleNextPlayer }) => {

    return (
        <div>
            <div className="card-description">
                <div>{description}</div>
            </div>
            {(!notShowShot && <div className='shotNumber'>
                +{shotNum + plusShots}
                {plusShots > 0 && (
                    <div className='punishment-icon'>
                        <FaSkull size={15} />
                    </div>
                )}
            </div>)}
            <div className="card-buttons">
                <button className="card-button" onClick={() => { handleNextPlayer(1, shotNum);}}>
                    <FaTrophy size={35} />
                </button>
                <button className="card-button" onClick={() => { handleNextPlayer(2, shotNum);}}>
                    <FaGlassCheers size={35} />
                </button>
            </div>
        </div>
    )
};

export default CardConfession;
