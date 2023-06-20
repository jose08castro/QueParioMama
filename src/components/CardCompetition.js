import './Card.css';

const CardCompetition = ({ description, shotNum, roundPlayers, notShowShot, handleNextPlayer }) => {

    const handleClickCompetition = (shotNum, idPlayer) => {
        handleNextPlayer(4, shotNum, 0, idPlayer);
    };

    const renderBaristaButtons = (roundPlayers, shotNum) => {
        return (
            <>
                {roundPlayers.map((person) => {
                    const initials = person.name
                        .split(' ')
                        .map((namePart) => namePart.charAt(0))
                        .join('.');
                    let handleClick;
                    handleClick = handleClickCompetition;

                    return (
                        <button
                            key={person.id}
                            className="card-button"
                            onClick={() => {
                                handleClick(shotNum, person.id)
                            }}
                        >
                            {initials}
                        </button>
                    );
                })}
            </>
        );
    };

    return (
        <div>
            <div className="card-description">
                <div>{description}</div>
            </div>
            {(!notShowShot &&<div className='shotNumber'>
                +{shotNum}
            </div>)}
            <div className="card-buttons">
                {renderBaristaButtons(roundPlayers, shotNum)}
            </div>
            <p className="barista-text">Seleccione al perdedor</p>
        </div>
    )
};

export default CardCompetition;
