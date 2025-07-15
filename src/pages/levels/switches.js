import { useRouter } from 'next/router';
import QuestTracker from '../../components/QuestTracker';

export default function Level() {
    const router = useRouter();
    const { level } = router.query;
    const lvl = parseInt(level, 10);
    let content;
    switch (lvl) {
        case 1:
            content = <div>🔧 <strong>Switch Quiz Placeholder</strong></div>;
            break;
        case 2:
            content = <div>🔌 <strong>Outlet AR Placeholder</strong></div>;
            break;
        case 3:
            content = <div>⚡ <strong>Breaker Puzzle Placeholder</strong></div>;
            break;
        case 4:
            content = <div>📊 <strong>Meter Calculator Placeholder</strong></div>;
            break;
        case 5:
            content = <div>🎡 <strong>Contactor Spin-the-Wheel Placeholder</strong></div>;
            break;
        default:
            content = <div>Unknown Level</div>;
    }
    return (
        <div style={{ padding: '32px', textAlign: 'center' }}>
            <QuestTracker currentLevel={lvl} />
            <h2>Level {lvl}</h2>
            <div style={{ margin: '24px 0' }}>{content}</div>
            <button
                onClick={() =>
                    lvl < 5 ? router.push(`/levels/${lvl + 1}`) : router.push('/congrats')
                }
                style={{
                    padding: '12px 24px',
                    background: '#007A33',
                    color: '#FFF',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer',
                }}
            >
                {lvl < 5 ? 'Next Level' : 'Finish Quest'}
            </button>
        </div>
    );
}