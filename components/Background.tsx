import { useEffect, useState } from "react";

export default function Background() {
  const numLayers = 2
  const layerMultiplier = 5
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const size = 50
  const sensitivity = 0.3

  useEffect(() => {

    const handleTouch = (e: TouchEvent) => {
      e.preventDefault();
      setPos({ x: e.touches[0].clientX * sensitivity, y: e.touches[0].clientY * sensitivity })
    };
    const handleMouse = (e: MouseEvent) => {
      e.preventDefault();
      setPos({ x: e.clientX * sensitivity, y: e.clientY * sensitivity });
    }
    window.addEventListener("mousemove", handleMouse);
    window.addEventListener("touchmove", handleTouch);
    return () => {
      window.removeEventListener("mousemove", handleMouse);
      window.removeEventListener("touchmove", handleTouch);
    };
  }, []);

  return (
    <>
      {
        [...Array(numLayers)].map((_, i) => {
          return (
            <div
              className="fixed -top-1/2 -left-1/2 w-[150vw] h-[150vh] -z-10"
              style={{
                transform: `translate(${pos.x / (i ^ i + 1)}px, ${pos.y / (i ^ i + 1)}px)`,
                opacity: `50%`,
                backgroundImage: ` radial-gradient(rgb(100,100,100) ${numLayers - (i)}px, transparent 1px)`,
                backgroundSize: `${size + (i * layerMultiplier)}px ${size + (i * layerMultiplier)}px`,
                backgroundPosition: '0 0, 14px 14px'
              }}
              key={`layer-${i}`}> </div>
          )
        })
      }
    </>
  )
}
