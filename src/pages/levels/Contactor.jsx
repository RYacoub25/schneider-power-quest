import React, { useState, useRef, useEffect } from 'react';

const contactors = [
    'AC Contactor',
    'DC Contactor',
    'Vacuum Contactor',
    'Solid-State Contactor',
    'Hermetic Contactor',
    'Reversing Contactor',
];
const descriptions = {
    'AC Contactor':
        'An electromagnetic switch optimized for alternating-current (AC) loads. Commonly used to control motors, lighting, and heating circuits with fast make/break action and built-in arc suppression.',

    'DC Contactor':
        'A heavy-duty switch designed for direct-current (DC) applications. Features magnetic blow-out coils or arc chutes to extinguish DC arcs, ideal for battery banks, EV chargers, and DC motor control.',

    'Vacuum Contactor':
        'Uses a vacuum interrupter to quench electrical arcs, offering extremely high dielectric strength and long service life. Well-suited for medium-voltage motor starters and frequent switching in harsh environments.',

    'Solid-State Contactor':
        'Employs semiconductor devices (thyristors/IGBTs) instead of mechanical contacts. Provides silent operation, fast switching, and zero contact wear—perfect for precise heating control and soft-start applications.',

    'Hermetic Contactor':
        'Encapsulates contacts and coil in a sealed, inert-gas-filled enclosure to prevent contamination and corrosion. Ideal for food processing, pharmaceuticals, and other clean-room or corrosive environments.',

    'Reversing Contactor':
        'A paired contactor assembly that swaps motor supply phases to reverse rotation. Includes electrical interlocks to prevent both forward and reverse coils from energizing simultaneously.'
};

const segmentAngle = 360 / contactors.length;
const spinDuration = 4000; // must match your CSS transition time

export default function Contactor({ isDone, setIsDone }) {
    const [rotation, setRotation] = useState(0);
    const [spinning, setSpinning] = useState(false);
    const [result, setResult] = useState(null);
    const wheelRef = useRef();

    const handleSpin = () => {
        if (spinning) return;
        setResult(null);
        setIsDone(false);

        const idx = Math.floor(Math.random() * contactors.length);
        const turns = 360 * 3;
        const target = turns + idx * segmentAngle + segmentAngle / 2;

        setRotation(target);
        setSpinning(true);

        // fallback in case transitionend doesn’t fire
        setTimeout(() => {
            if (spinning) computeResult(target);
        }, spinDuration + 100);
    };

    const computeResult = (finalRotation) => {
        const norm = ((finalRotation % 360) + 360) % 360;
        let best = 0, minDiff = 360;

        contactors.forEach((_, i) => {
            const mid = ((i + 0.5) * segmentAngle) % 360;
            const landed = (mid + norm) % 360;
            const diff = Math.min(landed, 360 - landed);
            if (diff < minDiff) {
                minDiff = diff;
                best = i;
            }
        });

        setResult(contactors[best]);
        setSpinning(false);
        setIsDone(true);
    };

    const onWheelTransitionEnd = (e) => {
        if (e.propertyName === 'transform') {
            computeResult(rotation);
        }
    };

    return (
        <div className="contactor-boss">
            <h2 className="contactor-title">Contactor Spin the Wheel</h2>

            <div className="wheel-container">
                <div
                    ref={wheelRef}
                    className="wheel"
                    style={{ transform: `rotate(${rotation}deg)` }}
                    onTransitionEnd={onWheelTransitionEnd}
                >
                    {contactors.map((label, i) => {
                        const midAngle = (i + 0.5) * segmentAngle;
                        return (
                            <div
                                key={i}
                                className="segment-label"
                                style={{
                                    transform: `
                    translate(-50%, -50%)
                    rotate(${midAngle}deg)
                    translate(0, -100px)
                    rotate(${-midAngle}deg)
                  `,
                                }}
                            >
                                {label}
                            </div>
                        );
                    })}
                </div>

                <div className="pointer" />
            </div>

            <button
                className="spin-button"
                onClick={handleSpin}
                disabled={spinning}
            >
                {spinning ? 'Spinning…' : 'Spin the Wheel'}
            </button>

            {result && (
                <div className="contactor-result">
                    🎉 You got: <strong>{result}</strong> 🎉
                    <p className="contactor-desc">
                        {descriptions[result]}
                    </p>
                    <p className="feedback">
                        You got promocode of 10% off Schneider <strong>{result}</strong>!
                    </p>
                </div>

            )}
        </div>
    );
}
