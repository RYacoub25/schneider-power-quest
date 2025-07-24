import React, { useState, useRef, useEffect } from 'react';
import SocketHunt from '../../../public/SocketsHunt.jpg'
const socketCoordinates = [
    { x: 3.97, y: 555.87, width: 70, height: 120 },
    { x: 407, y: 556, width: 60, height: 64 },
    { x: 704, y: 534, width: 60, height: 64 },
    { x: 1102, y: 657, width: 50, height: 94 },
    { x: 1504, y: 716, width: 50, height: 94 },
    // add more as needed
];

export default function Sockets({ isDone, setIsDone }) {
    const [found, setFound] = useState(Array(socketCoordinates.length).fill(false));
    const [count, setCount] = useState(0);
    const imgRef = useRef(null);
    const [metrics, setMetrics] = useState({ nw: 0, nh: 0 });

    useEffect(() => {
        setIsDone(false);
        const img = imgRef.current;
        if (!img) return;
        function onLoad() {
            setMetrics({ nw: img.naturalWidth, nh: img.naturalHeight });
        }
        if (img.complete) onLoad();
        else img.addEventListener('load', onLoad);
        return () => img.removeEventListener('load', onLoad);
    }, [setIsDone]);


    // Called whenever you click on the image
    const handleImageClick = (e) => {
        if (!metrics.nw || !metrics.nh) return;

        const img = imgRef.current;
        const rect = img.getBoundingClientRect();
        const clickX = e.clientX - rect.left;
        const clickY = e.clientY - rect.top;
        const scaleX = metrics.nw / rect.width;
        const scaleY = metrics.nh / rect.height;
        const natX = clickX * scaleX;
        const natY = clickY * scaleY;

        socketCoordinates.forEach((sock, idx) => {
            if (
                !found[idx] &&
                natX >= sock.x &&
                natX <= sock.x + sock.width &&
                natY >= sock.y &&
                natY <= sock.y + sock.height
            ) {
                // mark as found and update count in one go
                setFound(prev => {
                    const next = [...prev];
                    next[idx] = true;
                    return next;
                });
                setCount(prevCount => {
                    const newCount = prevCount + 1;
                    // Only fire setIsDone when we've just found the last one
                    if (newCount === socketCoordinates.length) {
                        setIsDone(true);
                    }
                    return newCount;
                });
            }
        });
    };


    return (
        <div className="socket-hunt">
            <h2>Socket Hunt: Find all {socketCoordinates.length} sockets!</h2>
            <p>Found: {count}/{socketCoordinates.length}</p>            <div className="image-container">
                <div className="image-container">
                    <img
                        ref={imgRef}
                        src={SocketHunt}
                        alt="Socket Hunt"
                        className="image"
                        onClick={handleImageClick}
                    />
                </div>
                {count === socketCoordinates.length && (

                    <p className="success">Congratulations! You found all sockets!
                        <p className="feedback">You got promocode of 10% off Schneider Sockets</p></p>

                )}
            </div>
        </div>
    );
}