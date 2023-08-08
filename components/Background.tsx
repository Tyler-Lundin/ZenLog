"use client"
import useIsDarkMode from "@/hooks/useIsDarkmode";
import { useEffect, useState } from "react";


export default function Background() {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [angle, setAngle] = useState(0);  // Initial angle
  const isDarkMode = useIsDarkMode();
  const numLayers = 2;
  const speed = 0.01; // Speed of rotation, adjust as needed
  useEffect(() => {
    const circleSteps = () => {
      const radius = 150;
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

  const SZ = 80

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
                opacity: 0.6,
                backgroundImage: ` radial-gradient(${isDarkMode ? "rgb(200,200,200)" : "rgb(0,0,0)"} ${i}px, transparent 1px)`,
                backgroundSize: `${SZ + i * 2}px ${SZ + i * 2}px`,
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
