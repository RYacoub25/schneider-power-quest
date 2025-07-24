// src/components/Breakers.jsx
import React, { useState, useEffect } from 'react';

const breakers = [
    { id: 'ACB', label: 'Air Circuit Breaker (ACB)' },
    { id: 'MCB', label: 'Miniature Circuit Breaker (MCB/MCCB)' },
    { id: 'RCD', label: 'Residual-Current Device (RCD/RCCB)' },
    { id: 'OTHER', label: 'Other Types (AFCI, Oil, HV, …)' },
];

const definitions = [
    {
        id: 'def-rcd',
        title: 'Residual-current device',
        description:
            'Interrupts the flow whenever it detects leakage to ground, protecting against electrocution, shocks and earth-fault damage.',
    },
    {
        id: 'def-mcb',
        title: 'Miniature circuit breaker',
        description:
            'Shuts off current on overvoltage or short circuit, protecting lighting circuits, appliances and preventing overload fires.',
    },
    {
        id: 'def-acb',
        title: 'Air circuit breaker',
        description:
            'A low-voltage master breaker using air as the arc-extinguishing medium; used in factories and large buildings up to 450 V.',
    },
    {
        id: 'def-other',
        title: 'Other breaker types',
        description:
            'Includes arc-fault circuit interrupters, oil circuit breakers, high-voltage breakers, etc., each specialized for unique environments.',
    },
];

// map definition → correct breaker
const correctMapping = {
    'def-rcd': 'RCD',
    'def-mcb': 'MCB',
    'def-acb': 'ACB',
    'def-other': 'OTHER',
};

export default function Breakers({ isDone, setIsDone }) {
    const [placements, setPlacements] = useState({});
    const [dragged, setDragged] = useState(null);

    const handleDragStart = (e, id) => {
        setDragged(id);
        e.dataTransfer.setData('text/plain', id);
    };

    const handleDragOver = (e) => e.preventDefault();

    const handleDrop = (e, defId) => {
        e.preventDefault();
        const id = e.dataTransfer.getData('text/plain') || dragged;
        if (correctMapping[defId] === id) {
            setPlacements(prev => ({ ...prev, [defId]: id }));
        }
    };

    useEffect(() => {
        setIsDone(Object.keys(placements).length === definitions.length);
    }, [placements, setIsDone]);

    return (
        <div className="breaker-boss">
            <h2 className="breaker-title">Breaker Boss: Match Type → Definition</h2>
            <p className="breaker-instructions">
                Drag each <strong>breaker type</strong> onto the matching <strong>definition</strong> below.
            </p>

            <div className="breakers-list">
                {breakers.map(b => (
                    <div
                        key={b.id}
                        className={`breaker-item ${Object.values(placements).includes(b.id) ? 'placed' : ''
                            }`}
                        draggable={!Object.values(placements).includes(b.id)}
                        onDragStart={e => handleDragStart(e, b.id)}
                    >
                        {b.label}
                    </div>
                ))}
            </div>

            <div className="definitions-grid">
                {definitions.map(def => (
                    <div
                        key={def.id}
                        className={`definition-item ${placements[def.id] ? 'correct' : ''
                            }`}
                        onDragOver={handleDragOver}
                        onDrop={e => handleDrop(e, def.id)}
                    >
                        <p>{def.description}</p>
                        {placements[def.id] && (
                            <div className="placed-breaker">
                                {breakers.find(b => b.id === placements[def.id]).label}
                            </div>
                        )}
                    </div>
                ))}
            </div>
            {isDone && <p className="success">Congratulations! You matched all the breakers!
                <p className="feedback">You got promocode of 10% off Schneider Breakers!</p></p>
            }
        </div>
    );
}