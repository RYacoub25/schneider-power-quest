import React, { useEffect, useRef, useState } from 'react';

const scenarios = [
    { id: 'offline', label: 'Offline (Standby) UPS', simulate: offlineSim, feedback: "That was Offline (Standby)—see the blue trace stay flat until the UPS kicks in after a brief blackout." },
    { id: 'lineInteractive', label: 'Line-Interactive UPS', simulate: lineInteractiveSim, feedback: "That was Line- Interactive—notice the blue output sagging during the brownout but never dropping to zero." },
    { id: 'online', label: 'Online (Double-Conversion) UPS', simulate: onlineSim, feedback: "That was Online (Double-Conversion)—the blue output stays perfectly in sync with the green input, even during the outage." },
];
export default function UPS({ isDone, setIsDone }) {
    const canvasRef = useRef(null);
    const [current, setCurrent] = useState(0);
    const [feedback, setFeedback] = useState(null);
    const [selected, setSelected] = useState(null);

    useEffect(() => {
        setIsDone(false);
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        let startTime = null, raf;

        function drawFrame(ts) {
            if (!startTime) startTime = ts;
            const t = ts - startTime;

            ctx.clearRect(0, 0, canvas.width, canvas.height);
            // draw outage indicator first
            if (scenarios[current].id === 'offline') {
                drawOutageIndicator(ctx, canvas.width, canvas.height, t, 0, 2100);
            } else if (scenarios[current].id === 'lineInteractive') {
                drawOutageIndicator(ctx, canvas.width, canvas.height, t, 2000, 3500);
            }
            else if (scenarios[current].id === 'online') {
                drawOutageIndicator(ctx, canvas.width, canvas.height, t, 2000, 3000);
            }
            // then draw the waveforms
            scenarios[current].simulate(ctx, canvas.width, canvas.height, t);

            raf = requestAnimationFrame(drawFrame);
        }

        raf = requestAnimationFrame(drawFrame);
        return () => cancelAnimationFrame(raf);
    }, [current]);

    const handleClick = (id) => {
        if (feedback === 'correct') return;
        setSelected(id);

        if (id === scenarios[current].id) {
            setFeedback('correct');
            setTimeout(() => {
                setFeedback(null);
                setSelected(null);
                if (current < scenarios.length - 1) {
                    setCurrent(current + 1);
                } else {
                    setIsDone(true);
                }
            }, 4000);
        } else {
            setFeedback('incorrect');
        }
    };

    return (
        <div className="waveform-boss">
            <h2 className="waveform-title">Waveform Detective</h2>

            {/* User instructions */}
            <p className="waveform-instructions">
                Watch the <strong>green</strong> trace (utility input) and the <strong>blue</strong> trace (UPS output)
                during a power disturbance. Then choose which UPS topology produced that behavior.
            </p>

            <canvas
                ref={canvasRef}
                className="waveform-canvas"
                width={600}
                height={200}
            />
            {/* Feedback message */}
            {feedback === 'correct' && (
                <div className="waveform-feedback correct">
                    ✅ Correct! {scenarios[current].feedback}
                </div>
            )}
            {feedback === 'incorrect' && (
                <div className="waveform-feedback incorrect">
                    ❌ Incorrect, try again.
                </div>
            )}

            <div className="waveform-buttons">
                {scenarios.map((s) => (
                    <button
                        key={s.id}
                        className={`waveform-button ${selected === s.id && feedback === 'correct'
                            ? 'correct'
                            : selected === s.id && feedback === 'incorrect'
                                ? 'incorrect'
                                : ''
                            }`}
                        onClick={() => handleClick(s.id)}
                    >
                        {s.label}
                    </button>
                ))}
            </div>

            {
                isDone &&
                <p className="success">Congratulations! You were an excellent waveform detective!
                    <p className="feedback">You got promocode of 10% off Schneider UPS</p></p>
            }
        </div>
    );
}
// draw a semi-transparent red overlay and label during t ∈ [start,end)
function drawOutageIndicator(ctx, w, h, t, start, end) {
    if (t > start && t < end) {
        ctx.save();
        ctx.fillStyle = 'rgba(255,0,0,0.2)';
        ctx.fillRect(0, 0, w, h);
        ctx.fillStyle = 'red';
        ctx.font = 'bold 18px sans-serif';
        ctx.fillText('OUTAGE', w / 2 - 40, 30);
        ctx.restore();
    }
}

// draw a sine wave
function drawSine(ctx, w, h, phase, color, amp, offsetY) {
    ctx.beginPath();
    ctx.strokeStyle = color;
    ctx.lineWidth = 2;
    for (let x = 0; x <= w; x++) {
        const y = offsetY + amp * Math.sin((x / w) * 2 * Math.PI + phase);
        x === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
    }
    ctx.stroke();
}

// simulate each UPS behavior
function offlineSim(ctx, w, h, t) {
    const phase = -t * 0.005;
    // input always drawn (green)
    drawSine(ctx, w, h, phase, '#4CAF50', h / 4, h / 3);
    // output only after inverter kicks in at ~2.1s
    if (t > 2100) {
        drawSine(ctx, w, h, phase, '#2196F3', h / 4, (2 * h) / 3);
    }
}

function lineInteractiveSim(ctx, w, h, t) {
    const phase = -t * 0.005;
    // input always
    drawSine(ctx, w, h, phase, '#4CAF50', h / 4, h / 3);
    // output dips during sag (2s–3s)
    let amp = h / 4;
    if (t > 2000 && t < 3500) amp = h / 8;
    drawSine(ctx, w, h, phase, '#2196F3', amp, (2 * h) / 3);
}

function onlineSim(ctx, w, h, t) {
    const phase = -t * 0.005;
    drawSine(ctx, w, h, phase, '#4CAF50', h / 4, h / 3);
    drawSine(ctx, w, h, phase, '#2196F3', h / 4, (2 * h) / 3);
}
