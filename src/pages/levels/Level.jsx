import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import QuestTracker from '../../components/QuestTracker.jsx';
import Switches from './Switches.jsx';
import Sockets from './Sockets.jsx';
import Breakers from './Breakers.jsx';
import UPS from './UPS.jsx';
import Contactor from './Contactor.jsx';
export default function Level() {
    const { level } = useParams();
    const lvl = parseInt(level, 10);
    const navigate = useNavigate();
    const [isDone, setIsDone] = useState(false);
    const renderContent = () => {
        switch (lvl) {
            case 1:
                return <Switches isDone={isDone} setIsDone={setIsDone} />;
            case 2:
                return <Sockets isDone={isDone} setIsDone={setIsDone} />;
            case 3:
                return <Breakers isDone={isDone} setIsDone={setIsDone} />;
            case 4:
                return <UPS isDone={isDone} setIsDone={setIsDone} />
            case 5:
                return <Contactor isDone={isDone} setIsDone={setIsDone} />;
            default:
                return <div>Unknown Level</div>;
        }
    };

    return (
        <div className="page level">
            <div className='card'>
                <QuestTracker currentLevel={lvl} />
                {/* <h2>Level {lvl}</h2> */}
                <div className="level-content">{renderContent()}</div>
                {isDone && (<button
                    onClick={() =>
                        lvl < 5 ? navigate(`/levels/${lvl + 1}`) : navigate('/congrats')
                    }
                    className="btn-next"
                >
                    {lvl < 5 ? 'Next Level' : 'Finish Quest'}
                </button>)}
            </div>
        </div>
    );
}