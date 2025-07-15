import React from 'react';
import { Link } from 'react-router-dom';

const levels = [1, 2, 3, 4, 5];
export default function QuestTracker({ currentLevel }) {
    return (
        <nav className="quest-tracker">
            {levels.map((l) => (
                <Link
                    key={l}
                    to={`/levels/${l}`}
                    className={l === currentLevel ? 'active' : ''}
                >
                    Level {l}
                </Link>
            ))}
        </nav>
    );
}