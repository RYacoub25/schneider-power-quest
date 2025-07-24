import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
    const [sparks, setSparks] = useState([]);

    useEffect(() => {
        // generate spark particles
        const colors = ['#FFD700', '#FF8C00', '#00BFFF'];
        const pieces = Array.from({ length: 20 }).map((_, i) => ({
            id: i,
            color: colors[i % colors.length],
            left: `${10 + Math.random() * 80}%`,
            top: `${10 + Math.random() * 40}%`,
            size: `${4 + Math.random() * 6}px`,
            delay: `${Math.random() * 2}s`,
        }));
        setSparks(pieces);
    }, []);

    const levels = [
        { title: "Switches Quiz", desc: "Test your knowledge of Schneider's switches." },
        { title: "Socket Hunt", desc: "Find the hidden sockets in the room." },
        { title: "Breaker Boss", desc: "Match breaker types to their definitions." },
        { title: "Waveform Detective", desc: "Identify UPS topologies by their outage waveforms." },
        { title: "Contactor Spin the Wheel", desc: "Spin to discover different contactor types." },
    ];

    return (

        <div className='home-card'>

            {/* Spark particles */}
            <div className="spark-container">
                {sparks.map(s => (
                    <span
                        key={s.id}
                        className="spark"
                        style={{
                            left: s.left,
                            top: s.top,
                            width: s.size,
                            height: s.size,
                            backgroundColor: s.color,
                            animationDelay: s.delay,
                        }}
                    />
                ))}
            </div>

            <h1 className="home-title">⚡ Schneider Power Quest ⚡</h1>
            <p className="home-sub">Play Shop Save!</p>

            {/* Level cards */}
            <div className="levels-container">
                {levels.map((lvl, i) => (
                    <div key={i} className="level-card">
                        <h3>{`${i + 1}. ${lvl.title}`}</h3>
                        <p>{lvl.desc}</p>
                    </div>
                ))}
            </div>

            <Link to="/levels/1" className="btn-start">
                Start Quest
            </Link>
        </div>
    );
}
