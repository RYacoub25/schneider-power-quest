import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import QuestTracker from '../components/QuestTracker.jsx';

export default function Congrats() {
    const [confetti, setConfetti] = useState([]);

    useEffect(() => {
        // generate confetti pieces
        const colors = ['#EF4444', '#FBBF24', '#22C55E', '#3B82F6', '#8B5CF6'];
        const pieces = Array.from({ length: 30 }).map((_, i) => ({
            key: i,
            color: colors[i % colors.length],
            left: `${Math.random() * 100}%`,
            delay: `${Math.random()}s`,
        }));
        setConfetti(pieces);
    }, []);

    return (
        <div className='card'>
            <div className="page congrats">
                {/* Progress tracker */}
                <QuestTracker currentLevel={5} />

                {/* Confetti animation */}
                <div className="confetti-container">
                    {confetti.map(c => (
                        <span
                            key={c.key}
                            className="confetti-piece"
                            style={{ left: c.left, backgroundColor: c.color, animationDelay: c.delay }}
                        />
                    ))}
                </div>

                {/* Celebration GIF */}
                <div className="gif-container">
                    <img
                        src="https://media.giphy.com/media/26tOZ42Mg6pbTUPHW/giphy.gif"
                        alt="Celebration"
                        className="congrats-gif"
                    />
                </div>

                {/* Main message */}
                <h2 className="congrats-title">🎉 Congratulations! 🎉</h2>
                <p className="congrats-sub">You’ve completed the Schneider Power Quest.</p>

                {/* Home link */}
                <Link to="/" className="link-home">
                    Return to Home
                </Link>
            </div>
        </div>
    );
}