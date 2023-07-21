import React, { useEffect, useState } from "react";
import "./CatAnimation.css";

const CatAnimation = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [catAnimationActive, setCatAnimationActive] = useState(false);
  const [catPosition, setCatPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    let idleTimer;
    let catTimer;

    const handleMouseMove = (e) => {
      if (catAnimationActive) {
        setCatPosition({ x: e.clientX, y: e.clientY });
      }
      setMousePosition({ x: e.clientX, y: e.clientY });
      clearTimeout(idleTimer);
      setCatAnimationActive(false);
    };

    const handleMouseIdle = () => {
      idleTimer = setTimeout(() => {
        setCatAnimationActive(true);
      }, 3000);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mousedown", handleMouseIdle);
    window.addEventListener("keydown", handleMouseIdle);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handleMouseIdle);
      window.removeEventListener("keydown", handleMouseIdle);
      clearTimeout(idleTimer);
      clearTimeout(catTimer);
    };
  }, [catAnimationActive]);

  return (
    <div className="cat-animation">
      {/* Your cat animation here */}
      {catAnimationActive && (
        <div
          className="cat-attack-animation"
          style={{ left: catPosition.x, top: catPosition.y }}
        ></div>
      )}
    </div>
  );
};

export default CatAnimation;
