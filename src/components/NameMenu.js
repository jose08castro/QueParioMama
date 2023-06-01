import './NameMenu.css';
import React, { useState } from 'react';
import NameList from './NameList';
import { Link } from 'react-router-dom';

const generateUniqueId = (() => {
    let counter = 1;
    return () => {
        const uniqueId = counter;
        counter += 1;
        return uniqueId;
    };
})();

const NameMenu = ({ getPeopleList }) => {

    const [people, setPeople] = useState([]);
    const [newName, setNewName] = useState('');

    const handleAddName = () => {
        if (newName.trim() === '') {
            return; // No permite agregar nombres vacíos
        }

        const newPerson = {
            id: generateUniqueId(),
            name: newName,
            shots: 0,
            score: 0,
            color: generateRandomColor(),
        };

        setPeople([...people, newPerson]);
        setNewName('');
    };

    const deletePerson = (id) => {
        setPeople(people.filter((person) => person.id !== id));
    };

    const editPerson = (id, newName) => {
        setPeople(
            people.map((person) => {
                if (person.id === id) {
                    return { ...person, name: newName };
                }
                return person;
            })
        );
    };

    const generateRandomColor = () => {
        var hexColor;
        // Generar componentes RGB aleatorios
        var red = Math.floor(Math.random() * 256);
        var green = Math.floor(Math.random() * 256);
        var blue = Math.floor(Math.random() * 256);

        // Comprobar si el color es apto para texto blanco
        var brillo = (red * 0.299 + green * 0.587 + blue * 0.114) / 255;
        var umbral = 0.6; // Puedes ajustar este umbral según tus preferencias

        // Si el brillo es menor que el umbral, retornar el color aleatorio
        if (brillo < umbral) {
            hexColor = (
                "#" +
                red.toString(16).padStart(2, "0") +
                green.toString(16).padStart(2, "0") +
                blue.toString(16).padStart(2, "0")
            );
            return hexColor;
        } else {
            return generateRandomColor();
        }
    };

    const handleKeyDown = (event) => {
        if (event.keyCode === 13) {
            handleAddName();
        }
    };

    const sendPeopleList = () => {
        getPeopleList(people);
    }

    return (
        <div className="over-name-menu-container">
            <div className="name-menu-container">
                <h2 className="name-menu-title">JUGADORES</h2>
                <div className="name-menu-card">
                    <div className="circle"></div>
                    <input
                        type="text"
                        value={newName}
                        onChange={(e) => setNewName(e.target.value)}
                        onKeyDown={handleKeyDown}
                        className="name-menu-input"
                        placeholder="Nuevo..."
                    />
                    <div className="add-button" onClick={handleAddName}></div>
                </div>

                <NameList people={people} deletePerson={deletePerson} editPerson={editPerson} />

                <div className="buttons-container">
                    <Link to="/" className="button">Regresar</Link>
                    <Link to="/cardMenu" className="button" onClick={sendPeopleList()}>Continuar</Link>
                </div>
            </div>
        </div>
    );
};

export default NameMenu;
