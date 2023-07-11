import { useEffect, useState } from "react";

export default function Background() {
  const numLayers = 4
  const layerMultiplier = 5
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const size = 85
  const sensitivity = 0.1


  useEffect(() => {
    function handleMouseMove(event: MouseEvent) {
      // get the position of the mouse cursor
      let mouseX = event.clientX;
      let mouseY = event.clientY;
      mouseX = mouseX * sensitivity;
      mouseY = mouseY * sensitivity;

      setPos({ x: mouseX, y: mouseY });
    }
    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
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
                transform: `translate(${pos.x / (i + 1)}px, ${pos.y / (i + 1)}px)`,
                opacity: `${40 - (20 / numLayers * i)}%`,
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
