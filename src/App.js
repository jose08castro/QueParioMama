import React, { useState } from 'react';
import './App.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MyComponent from './components/MyComponent';
import MainMenu from './components/MainMenu';
import NameMenu from './components/NameMenu';
import CardMenu from './components/CardMenu';
import ResultMenu from './components/ResultMenu';

function App() {
  const [people, setPeople] = useState([]);
  
  const updatePeopleList = (data) => {
    setPeople(data);
  };

  const resetPeopleList = () => {
    setPeople([]);
  };

  return (
    // Deployment
    // <Router basename="/QueParioMama">
    <Router>
      <div className="App">
        <div className='App-header'>
          <Routes>
            <Route path="/" element={<MainMenu />} />
            <Route path="/myComponent" element={<MyComponent />} />
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