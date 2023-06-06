import React, { useState, useEffect } from 'react';
import './Spinner.css'; // Archivo CSS para estilos personalizados

const Spinner = ({ people, bodyParts, actions, onSpinComplete }) => {
  const [isWheelStopped, setIsWheelStopped] = useState(false);

  useEffect(() => {
    var usedList = [];
    if (people.length !== 0) {
      usedList = people;
    } else if (bodyParts.length !== 0) {
      usedList = bodyParts;
    } else {
      usedList = actions;
    }
    const canvas = document.getElementById('wheel');
    const ctx = canvas.getContext('2d');
    const dia = canvas.width;
    const rad = dia / 2;
    const PI = Math.PI;
    const TAU = 2 * PI;
    const arc = TAU / usedList.length;

    const friction = 0.991; // 0.995=soft, 0.99=mid, 0.98=hard
    let angVel = 0; // Angular velocity
    let ang = 0; // Angle in radians

    const getIndex = () =>
      Math.floor(usedList.length - (ang / TAU) * usedList.length) % usedList.length;

    const drawSector = (sector, i) => {
      let description = '';
      let wheelSectorColor = '';
      if (sector.name) {
        description = sector.name;
        wheelSectorColor = sector.color;
      } else {
        description = sector;
        wheelSectorColor = '#FBB03B';
      }
      const angle = arc * i;
      ctx.save();
      // COLOR
      ctx.beginPath();
      ctx.fillStyle = wheelSectorColor;
      ctx.moveTo(rad, rad);
      ctx.arc(rad, rad, rad, angle, angle + arc);
      ctx.lineTo(rad, rad);
      ctx.fill();
      // TEXT
      ctx.translate(rad, rad);
      ctx.rotate(angle + arc / 2);
      ctx.textAlign = 'right';
      ctx.fillStyle = '#fff';
      ctx.font = 'bold 16px sans-serif';
      ctx.fillText(description, rad - 10, 10);
      ctx.restore();
    };

    const rotate = () => {
      let description = '';
      let wheelSectorColor = '';
      if (usedList[getIndex()]) {
        description = usedList[getIndex()].name;
        wheelSectorColor = usedList[getIndex()].color;
      } else {
        description = getIndex();
        wheelSectorColor = '#FBB03B';
      }
      canvas.style.transform = `rotate(${ang - PI / 2}rad)`;
      const spin = document.getElementById('spin');
      spin.innerText = description;
    };

    const frame = () => {
      if (!angVel) return;
      angVel *= friction; // Decrement velocity by friction
      if (angVel < 0.002) {
        angVel = 0; // Bring to stop
        setIsWheelStopped(true); // Wheel is stopped
        console.log("Rueda detenida");
        console.log(document.getElementById('spin').innerText);
        setTimeout(() => {
          onSpinComplete(document.getElementById('spin').innerText); // Call spin complete callback
        }, 1000);
      }
      ang += angVel; // Update angle
      ang %= TAU; // Normalize angle
      rotate();
    };

    const engine = () => {
      frame();
      requestAnimationFrame(engine);
    };

    usedList.forEach(drawSector);
    rotate(); // Initial rotation
    engine(); // Start engine

    const handleClick = () => {
      if (!angVel) {
        angVel = rand(0.25, 0.45);
        setIsWheelStopped(false); // Wheel is spinning
      }
    };

    const rand = (m, M) => Math.random() * (M - m) + m;

    const spin = document.getElementById('spin');
    spin.addEventListener('click', handleClick);

    return () => {
      spin.removeEventListener('click', handleClick);
    };
  }, [people, bodyParts, actions, onSpinComplete]);

  return (
    <div id="wheelOfFortune">
      <canvas id="wheel" width="250" height="250"></canvas>
      <div id="spin"></div>
    </div>
  );
};

export default Spinner;
