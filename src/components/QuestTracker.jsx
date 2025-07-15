import Link from 'next/link';
const levels = [1, 2, 3, 4, 5];
export default function QuestTracker({ currentLevel }) {
    return (
        <nav style={{ margin: '16px 0' }}>
            {levels.map((l) => (
                <Link key={l} href={`/levels/${l}`}>
                    <a
                        style={{
                            margin: '0 8px',
                            padding: '4px 8px',
                            borderRadius: '4px',
                            background: l === currentLevel ? '#007A33' : '#EEE',
                            color: l === currentLevel ? '#FFF' : '#333',
                            textDecoration: 'none',
                        }}
                    >
                        Level {l}
                    </a>
                </Link>
            ))}
        </nav>
    );
}