
// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/index';
import Level from './pages/SwitchesLevel';
import Congrats from './pages/Congrats';
import QuestTracker from './components/QuestTracker';
import './App.css';
import './styles/globals.css';

export default function App() {
  return (
    <Router>
      <div className="app-container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/levels/:level"
            element={<Level />}
          />
          <Route path="/congrats" element={<Congrats />} />
        </Routes>
      </div>
    </Router>
  );
}
