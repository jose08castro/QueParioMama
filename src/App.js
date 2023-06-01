import React, { useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainMenu from './components/MainMenu';
import NameMenu from './components/NameMenu';
import CardMenu from './components/CardMenu';

function App() {
  const [people, setPeople] = useState([]);
  const getPeopleList = (data) => {
    setPeople(data);
  };

  return (
    <Router>
      <div className="App">
        <div className='App-header'>
          <Routes>
            <Route path="/" element={<MainMenu />} />
            <Route path="/nameMenu" element={<NameMenu people={people} getPeopleList={getPeopleList}/>}/>
            <Route path="/cardMenu" element={<CardMenu people={people}/>}/>
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;