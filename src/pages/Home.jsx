import React from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
    return (
        <div className="page home">
            <h1>Schneider Power Quest</h1>
            <p>Ready to level up your power savings?</p>
            <Link to="/levels/1" className="btn-start">
                Start Quest
            </Link>
        </div>
    );
}