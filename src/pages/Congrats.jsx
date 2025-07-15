import React from 'react';
import { Link } from 'react-router-dom';
import QuestTracker from '../components/QuestTracker.jsx';

export default function Congrats() {
    return (
        <div className="page congrats">
            <QuestTracker currentLevel={5} />
            <h2>🎉 Congratulations! 🎉</h2>
            <p>You’ve completed the Schneider Power Quest.</p>
            <p>Stay tuned for your exclusive reward codes.</p>
            <Link to="/" className="link-home">
                Return to Home
            </Link>
        </div>
    );
}