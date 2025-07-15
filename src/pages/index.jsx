import Link from 'next/link';
export default function Home() {
    return (
        <div style={{ padding: '32px', textAlign: 'center' }}>
            <h1>Schneider Power Quest</h1>
            <p>Ready to level up your power savings?</p>
            <Link href="/levels/1">
                <a
                    style={{
                        display: 'inline-block',
                        padding: '12px 24px',
                        background: '#007A33',
                        color: '#FFF',
                        borderRadius: '4px',
                        textDecoration: 'none',
                    }}
                >
                    Start Quest
                </a>
            </Link>
        </div>
    );
}