import { useEffect, useState } from "react";


export default function Background() {
  const numLayers = 3
  const layerMultiplier = 20
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const size = 50
  const [angle, setAngle] = useState(0);  // Initial angle
  const speed = 0.01; // Speed of rotation, adjust as needed
  useEffect(() => {
    const circleSteps = () => {
      const radius = 100;
      const center = { x: 0, y: 0 };
      const nextX = center.x + radius * Math.cos(angle);
      const nextY = center.y + radius * Math.sin(angle);
      return { x: nextX, y: nextY };
    };
    const handleAutoMove = () => {
      const newPosition = circleSteps();
      setAngle(prevAngle => prevAngle + speed); // increment angle
      setPos(newPosition);
    };
    const interval = setInterval(handleAutoMove, 50);
    return () => clearInterval(interval);
  }, [angle]);

  return (
    <div className="fixed top-0 left-0 w-screen h-screen overflow-hidden" >
      {
        [...Array(numLayers)].map((_, i) => {
          return (
            <div
              className="fixed -top-1/2 -left-1/2 -z-10"
              style={{
                width: "250vw", height: "250vh",
                transform: `translate(${pos.x / (i + 1)}px, ${pos.y / (i + 1)}px)`,
                opacity: `50%`,
                backgroundImage: ` radial-gradient(rgb(100,100,100) ${numLayers - (i)}px, transparent 1px)`,
                backgroundSize: `${size + i * 10 + (i + 1 * layerMultiplier)}px ${size + i * 10 + (i + 1 * layerMultiplier)}px`,
                backgroundPosition: '0 0, 14px 14px'
              }}
              key={`layer-${i}`}>
            </div>
          )
        })
      }
    </div>
  )
}
