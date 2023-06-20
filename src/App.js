// App.js
import React, { useState } from 'react';
import './App.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainMenu from './components/MainMenu';
import NameMenu from './components/NameMenu';
import CardMenu from './components/CardMenu';
import ResultMenu from './components/ResultMenu';
import SelectionMenu from './components/SelectionMenu'

function App() {
  const [people, setPeople] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);
  
  const updatePeopleList = (data) => {
    setPeople(data);
  };

  const updateSelectedOption = (option) => {
    console.log(option)
    setSelectedOption(option);
  };

  const resetPeopleList = () => {
    setPeople([]);
  };

  return (
    <Router basename="/QueParioMama">
      <div className="App">
        <div className='App-header'>
          <Routes>
            <Route path="/" element={<MainMenu />} />
            <Route
              path="/nameMenu"
              element={<NameMenu people={people} updatePeopleList={updatePeopleList} />}
            />
            <Route
              path="/cardMenu"
              element={<CardMenu people={people} updatePeopleList={updatePeopleList} />}
            />
            <Route
              path="/resultMenu"
              element={
                <ResultMenu
                  people={people}
                  updatePeopleList={updatePeopleList}
                  resetPeopleList={resetPeopleList}
                  selectedOption={selectedOption}
                />
              }
            />
            <Route
              path="/selectionMenu"
              element={
                <SelectionMenu
                  updateSelectedOption={updateSelectedOption}
                />
              }
            />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
