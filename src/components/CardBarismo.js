import './Card.css';

const CardBarismo = ({ description, shotNum, roundPlayers, notShowShot, handleNextPlayer }) => {

    const handleClickBarista = (shotNum, idPlayer) => {
        handleNextPlayer(3, shotNum, 0, idPlayer);
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
                    handleClick = handleClickBarista;

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
        </div>
    )
};

export default CardBarismo;
