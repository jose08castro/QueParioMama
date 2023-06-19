import React, { useState, useEffect, useRef } from 'react';
import RuleBar from './RuleBar';
import nextRuleFileSound from '../sounds/nextRule.wav';
import nextCardFileSound from '../sounds/NextCard.wav';
import './RuleBarContainer.css';


const RuleBarContainer = ({ people, category }) => {
    let color = '';
    switch (category) {
        case 5:
            color = '#683697';
            break;
        case 1:
            color = '#EC1B4B';
            break;
        case 4:
            color = '#F26A44';
            break;
        case 3:
            color = '#547734';
            break;
        case 6:
            color = '#000000';
            break;
        default:
            color = '#A8216B';
            break;
    }
    const [rules] = useState([
        {
            title: "El piso es lava",
            description: "Nadie puede tocar el piso o toca tomar.",
            shot: 1,
            ruleDuration: 0,
            player: "",
            needPlayer: false
        },
        {
            title: "Maestro del pulgar",
            description: "Cuando el maestro coloque el pulgar en alguna superfice, el último en colocarlo toma.",
            shot: 1,
            ruleDuration: 0,
            player: "",
            needPlayer: true
        },
        {
            title: "Cambio de nombre un jugador hacia la izquierda (no aplica en las cartas)",
            description: "Se debe llamar a los jugadores, por el nombre de la persona sentada a la derecha del jugador en sí.",
            shot: 1,
            ruleDuration: 0,
            player: "",
            needPlayer: false
        },
        {
            title: "Maestro del silencio",
            description: "Cuando el maestro haga una pregunta no le deben responder o toca tomar.",
            shot: 1,
            ruleDuration: 0,
            player: "",
            needPlayer: true
        },
        {
            title: "Buffalo",
            description: "Nadie puede tomar con la mano dominante o le toca otro shot.",
            shot: 1,
            ruleDuration: 0,
            player: "",
            needPlayer: false
        },
        {
            title: "Maestro de las preguntas",
            description: "Cuando el maestro haga una pregunta deben responder con otra pregunta o toca tomar.",
            shot: 1,
            ruleDuration: 0,
            player: "",
            needPlayer: true
        },
        {
            title: "Enanito",
            description: "Debe sacar y devolver un enanito imaginario antes y depués de tomar un trago, correspondientemente, o le toca otro shot.",
            shot: 1,
            ruleDuration: 0,
            player: "",
            needPlayer: false
        },
        {
            title: "Maestro sin nombre",
            description: "No puede decir el nombre del maestro o toca tomar.",
            shot: 1,
            ruleDuration: 0,
            player: "",
            needPlayer: true
        },
        {
            title: "No alcen la voz",
            description: "Todos los jugadores deben hablarse al oído sino un shot.",
            shot: 1,
            ruleDuration: 0,
            player: "",
            needPlayer: false
        },
        {
            title: "Papa caliente",
            description: "Debe pasar un objeto en el periodo de tiempo, pueden quedarselo mientras otro cumple retos, pero debe tomar el último que se lo queda.",
            shot: 1,
            ruleDuration: 0,
            player: "",
            needPlayer: true
        },
    ]);
    const [rulesIndex, setRulesIndex] = useState(0);
    const [time, setTime] = useState(getRandomRuleDuration());
    const [popupVisible, setPopupVisible] = useState(false);
    const audioRef = useRef(null);
    const nextCardSound = new Audio(nextCardFileSound);
    // const popupRef = useRef(null);

    useEffect(() => {
        let interval;

        if (time > 0) {
            interval = setInterval(() => {
                setTime((prevTime) => prevTime - 1);
            }, 1000);
        }

        if (time === 0) {
            audioRef.current.play();
            setRulesIndex((prevIndex) => {
                let newIndex = prevIndex + 1;
                if (newIndex === rules.length) {
                    newIndex = 0;
                }
                setTime(getRandomRuleDuration());
                if (rules[newIndex].needPlayer) {
                    rules[newIndex].player =
                        people[Math.floor(Math.random() * people.length)].name + ',';
                }
                return newIndex;
            });
        }

        return () => {
            clearInterval(interval);
        };
    }, [time, people, rules]);

    function getRandomRuleDuration() {
        return Math.floor(Math.random() * (210 - 60 + 1)) + 60;
    }

    const formatTime = (time) => {
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;
        const formattedSeconds = seconds.toString().padStart(2, '0');

        if (minutes === 0) {
            return `${formattedSeconds}`;
        }

        return `${minutes} : ${formattedSeconds}`;
    };

    const handleRuleBarClick = () => {
        nextCardSound.play();
        setPopupVisible(!popupVisible);
    };

    // const handlePopupClose = () => {
    //     setPopupVisible(false);
    // };

    // useEffect(() => {
    //     const handleClickOutside = (event) => {
    //         if (popupVisible && popupRef.current && !popupRef.current.contains(event.target)) {
    //             handlePopupClose();
    //         }
    //     };

    //     document.addEventListener('mousedown', handleClickOutside);

    //     return () => {
    //         document.removeEventListener('mousedown', handleClickOutside);
    //     };
    // }, [popupVisible]);

    return (
        <div>
            <audio ref={audioRef} src={nextRuleFileSound} />
            <RuleBar
                player={rules[rulesIndex].player}
                title={rules[rulesIndex].title}
                showTime={formatTime(time)}
                color={"#000000"}
                // color={color}
                popupVisible={popupVisible}
                ruleDescription={rules[rulesIndex].description}
                onClick={handleRuleBarClick}
            />
        </div>
    );
};

export default RuleBarContainer;