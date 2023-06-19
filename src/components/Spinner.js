import React, { useState, useEffect } from 'react';
import WheelOfFortuneSoundFile from '../sounds/WheelOfFortuneOriginal.wav';

import './Spinner.css';

const Spinner = ({ people, bodyParts, actions, positions, onSpinComplete }) => {
  const [isWheelStopped, setIsWheelStopped] = useState(false);
  const [isWheelClickable, setIsWheelClickable] = useState(true);
  const [isPlayingSound, setIsPlayingSound] = useState(false);
  const WheelOfFortuneSound = new Audio(WheelOfFortuneSoundFile);

  useEffect(() => {
    var usedList = [];
    if (people.length !== 0) {
      usedList = people;
    } else if (bodyParts.length !== 0) {
      usedList = bodyParts;
    } else if (actions.length !== 0) {
      usedList = actions;
    } else {
      usedList = positions;
    }
    const canvas = document.getElementById('wheel');
    const ctx = canvas.getContext('2d');
    const dia = canvas.width;
    const rad = dia / 2;
    const PI = Math.PI;
    const TAU = 2 * PI;
    const arc = TAU / usedList.length;

    const friction = 0.988;
    let angVel = 0;
    let ang = 0;
    let angle = 0;

    const getIndex = () =>
      Math.floor(usedList.length - (ang / TAU) * usedList.length) % usedList.length;

    const drawSector = (sector, i) => {
      let description = sector.name;
      let wheelSectorColor = sector.color;
      angle = arc * i;
      ctx.save();
      ctx.beginPath();
      ctx.fillStyle = wheelSectorColor;
      ctx.moveTo(rad, rad);
      ctx.arc(rad, rad, rad, angle, angle + arc);
      ctx.lineTo(rad, rad);
      ctx.fill();
      ctx.translate(rad, rad);
      ctx.rotate(angle + arc / 2);
      ctx.textAlign = 'right';
      ctx.fillStyle = '#fff';
      ctx.font = 'bold 16px sans-serif';
      ctx.fillText(description, rad - 10, 10);
      ctx.restore();
    };

    const rotate = () => {
      let description = usedList[getIndex()].name;
      let wheelSectorColor = usedList[getIndex()].color;
      canvas.style.transform = `rotate(${ang - PI / 2}rad)`;
      const spin = document.getElementById('spin');
      spin.innerText = description;
      spin.style.backgroundColor = wheelSectorColor;
    };

    const frame = () => {
      if (!angVel) return;
      angVel *= friction;

      if (isPlayingSound && WheelOfFortuneSound.currentTime >= 1.9) {
        angVel *= 0.9;
      }

      ang += angVel;
      ang %= TAU;
      rotate();

      if (angVel < 0.002 && WheelOfFortuneSound.ended) {
        angVel = 0;
        setIsWheelStopped(true);
        setTimeout(() => {
          onSpinComplete(document.getElementById('spin').innerText);
          setIsWheelClickable(true);
        }, 500);
      }
    };

    const engine = () => {
      frame();
      requestAnimationFrame(engine);
    };

    usedList.forEach(drawSector);
    rotate();
    engine();

    const handleClick = () => {
      if (angVel || !isWheelClickable) {
        return;
      }

      setIsPlayingSound(true);
      WheelOfFortuneSound.currentTime = 0;
      WheelOfFortuneSound.play();
      angVel = rand(0.25, 0.45);
      setIsWheelStopped(false);
      setIsWheelClickable(false);
    };

    WheelOfFortuneSound.addEventListener('ended', () => {
      setIsPlayingSound(false);
    });

    const rand = (m, M) => Math.random() * (M - m) + m;

    const spin = document.getElementById('spin');
    spin.addEventListener('click', handleClick);

    return () => {
      spin.removeEventListener('click', handleClick);
    };
  }, [people, bodyParts, actions, onSpinComplete]);

  return (
    <div id="wheelOfFortune">
      <canvas id="wheel" width="250" height="250" disabled={isWheelClickable}></canvas>
      <div id="spin"></div>
    </div>
  );
};

export default Spinner;
