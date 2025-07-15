import QuestTracker from '../components/QuestTracker';
import Link from 'next/link';

export default function Congrats() {
    return (
        <div style={{ padding: '32px', textAlign: 'center' }}>
            <QuestTracker currentLevel={5} />
            <h2>🎉 Congratulations! 🎉</h2>
            <p>You’ve completed the Schneider Power Quest.</p>
            <p>Stay tuned for your exclusive reward codes.</p>
            <Link href="/">
                <a style={{ color: '#007A33', textDecoration: 'underline' }}>
                    Return to Home
                </a>
            </Link>
        </div>
    );
}