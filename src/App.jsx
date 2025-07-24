import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home.jsx';
import Level from './pages/levels/Level.jsx';
import Congrats from './pages/Congrats.jsx';
import QuestTracker from './components/QuestTracker.jsx';
import './styles/globals.css';

export default function App() {
  return (
    <div className="app-container">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/levels/:level" element={<Level />} />
        <Route path="/congrats" element={<Congrats />} />
      </Routes>
    </div>
  );
}