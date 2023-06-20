import { useState } from 'react';
import { FaTrophy, FaGlassCheers } from 'react-icons/fa';
import Spinner from './Spinner';
import './Card.css';

const CardSpecial = ({ description, shotNum, notShowShot, people, specialNum, handleNextPlayer }) => {
    const [newDescription, setNewDescription] = useState("");
    const [descriptionBotellitaCounter, setDescriptionBotellitaCounter] = useState(0);
    const [descriptionKamasutraCounter, setDescriptionKamasutraCounter] = useState(0);

    const [bodyParts] = useState([
        { name: "labios", color: "#A8216B" },
        { name: "senos", color: "#3D4057" },
        { name: "cachete", color: "#EC1B4B" },
        { name: "frente", color: "#F26A44" },
        { name: "oreja", color: "#F7DB69" },
        { name: "cuello", color: "#2E9598" },
        { name: "espalda", color: "#626ce1" },
        { name: "brazo", color: "#a10986" },
        { name: "ombligo", color: "#ff0b44" },
        { name: "muslo", color: "#dd7528" },
        { name: "mano", color: "#e8e266" },
        { name: "nalga", color: "#92d322" },
        { name: "abdomen", color: "#1a2954" },
    ]);

    const [actions] = useState([
        { name: "chupe", color: "#ff0b44" },
        { name: "bese", color: "#a10986" },
        { name: "acaricie", color: "#dd7528" },
        { name: "muerda", color: "#1a2954" },
        { name: "azote", color: "#92d322" }
    ]);

    const [sexPositions] = useState([
        { name: "Lanzadera", color: "#A8216B" },
        { name: "Sirena", color: "#EC1B4B" },
        { name: "Gato", color: "#F26A44" },
        { name: "Batiente", color: "#F7DB69" },
        { name: "Acuario", color: "#2E9598" },
        { name: "Barco", color: "#626ce1" },
        { name: "Columpio", color: "#a10986" },
        { name: "Gota de nieve", color: "#ff0b44" },
        { name: "Libro", color: "#dd7528" },
        { name: "Jinete", color: "#e8e266" },
        { name: "Sumisa", color: "#92d322" },
        { name: "Tortuga", color: "#1a2954" },
        { name: "Cleopatra", color: "#A8216B" },
        { name: "Monja", color: "#EC1B4B" },
        { name: "Afrodita", color: "#F26A44" },
        { name: "Mástil", color: "#F7DB69" },
        { name: "Tango", color: "#2E9598" },
        { name: "Ying Yang", color: "#626ce1" },
        { name: "Cuna", color: "#a10986" },
        { name: "Deja vu", color: "#ff0b44" },
        { name: "Narciso", color: "#dd7528" },
        { name: "Acordeón", color: "#e8e266" },
        { name: "Vaquera", color: "#92d322" },
        { name: "Mantis religiosa", color: "#1a2954" }
    ]);

    const addArticle = (word) => {
        if (["cachete", "cuello", "brazo", "ombligo", "muslo", "abdonomen"].includes(word)) {
            return "el";
        } else if (["frente", "oreja", "espalda", "mano", "nalga"].includes(word)) {
            return "la";
        } else {
            return "los";
        }
    };

    const handleSpinComplete = (sector) => {
        switch (specialNum) {
            case 1:
                switch (descriptionBotellitaCounter) {
                    case 0:
                        setNewDescription(prevDescription => prevDescription + sector + " a ");
                        break;
                    case 1:
                        setNewDescription(prevDescription => prevDescription + sector + " en ");
                        break;
                    case 2:
                        setNewDescription(prevDescription => prevDescription + addArticle(sector) + " " + sector + ".");
                        break;
                    default:
                        break;
                }
                setDescriptionBotellitaCounter(descriptionBotellitaCounter + 1);
                break;
            case 2:
                console.log(descriptionKamasutraCounter);
                switch (descriptionKamasutraCounter) {
                    case 0:
                        setNewDescription(prevDescription => prevDescription + "Junto con '" + sector + "' haga la pose");
                        break;
                    case 1:
                        setNewDescription(prevDescription => prevDescription + " '" + sector + "' con la ropa actual.");
                        break;
                    default:
                        break;
                }
                setDescriptionKamasutraCounter(descriptionKamasutraCounter + 1);
                break;
            default:
                break;
        }
    };

    const resetValues = () => {
        setNewDescription("");
        setDescriptionBotellitaCounter(0);
        setDescriptionKamasutraCounter(0);
    };

    return (
        <div>
            <div className="card-description">
                <div>{description}</div>
                <div>{newDescription}</div>
                {descriptionBotellitaCounter === 0 && specialNum === 1 && (
                    <div className="card-special-buttons">
                        <Spinner people={[]} bodyParts={[]} actions={actions} positions={[]} onSpinComplete={handleSpinComplete} />
                    </div>
                )}
                {descriptionBotellitaCounter === 1 && specialNum === 1 && (
                    <div className="card-special-buttons">
                        <Spinner people={people} bodyParts={[]} actions={[]} positions={[]} onSpinComplete={handleSpinComplete} />
                    </div>
                )}
                {descriptionBotellitaCounter === 2 && specialNum === 1 && (
                    <div className="card-special-buttons">
                        <Spinner people={[]} bodyParts={bodyParts} actions={[]} positions={[]} onSpinComplete={handleSpinComplete} />
                    </div>
                )}
                {descriptionKamasutraCounter === 0 && specialNum === 2 && (
                    <div className="card-special-buttons">
                        <Spinner people={people} bodyParts={[]} actions={[]} positions={[]} onSpinComplete={handleSpinComplete} />
                    </div>
                )}
                {descriptionKamasutraCounter === 1 && specialNum === 2 && (
                    <div className="card-special-buttons">
                        <Spinner people={[]} bodyParts={[]} actions={[]} positions={sexPositions} onSpinComplete={handleSpinComplete} />
                    </div>
                )}
            </div>
            {(!notShowShot && <div className='shotNumber'>
                +{shotNum}
            </div>)}
            <div className="card-buttons">
                <button className="card-button" onClick={() => { handleNextPlayer(1, shotNum); resetValues(); }}>
                    <FaTrophy size={35} />
                </button>
                <button className="card-button" onClick={() => { handleNextPlayer(2, shotNum); resetValues(); }}>
                    <FaGlassCheers size={35} />
                </button>
            </div>
        </div>
    )
};

export default CardSpecial;
