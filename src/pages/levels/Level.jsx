import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import QuestTracker from '../components/QuestTracker.jsx';

export default function Level() {
    const { level } = useParams();
    const lvl = parseInt(level, 10);
    const navigate = useNavigate();

    const renderContent = () => {
        switch (lvl) {
            case 1:
                return <div>🔧 <strong>Switch Quiz Placeholder</strong></div>;
            case 2:
                return <div>🔌 <strong>Outlet AR Placeholder</strong></div>;
            case 3:
                return <div>⚡ <strong>Breaker Puzzle Placeholder</strong></div>;
            case 4:
                return <div>📊 <strong>Meter Calculator Placeholder</strong></div>;
            case 5:
                return <div>🎡 <strong>Contactor Spin-the-Wheel Placeholder</strong></div>;
            default:
                return <div>Unknown Level</div>;
        }
    };

    return (
        <div className="page level">
            <QuestTracker currentLevel={lvl} />
            <h2>Level {lvl}</h2>
            <div className="level-content">{renderContent()}</div>
            <button
                onClick={() =>
                    lvl < 5 ? navigate(`/levels/${lvl + 1}`) : navigate('/congrats')
                }
                className="btn-next"
            >
                {lvl < 5 ? 'Next Level' : 'Finish Quest'}
            </button>
        </div>
    );
}