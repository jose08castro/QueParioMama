import React, { useEffect, useRef, useState } from 'react';
import './Spinner.css'; // Archivo CSS para estilos personalizados

const Wheel = ({ sectors, onSpinComplete }) => {
  const canvasRef = useRef(null);
  const spinElRef = useRef(null);
  const [spinning, setSpinning] = useState(false); // Estado para controlar si la rueda está girando

  useEffect(() => {
    const canvas = canvasRef.current;
    const spinEl = spinElRef.current;
    const ctx = canvas.getContext('2d');
    const dia = canvas.width;
    const rad = dia / 2;
    const PI = Math.PI;
    const TAU = 2 * PI;
    const arc = TAU / sectors.length;
    const friction = 0.991; // 0.995=soft, 0.99=mid, 0.98=hard
    let angVel = 0; // Angular velocity
    let ang = 0; // Angle in radians

    const rand = (m, M) => Math.random() * (M - m) + m;

    const getIndex = () => Math.floor(sectors.length - (ang / TAU) * sectors.length) % sectors.length;

    const drawSector = (sector, i) => {
      const angle = arc * i;
      ctx.save();
      // COLOR
      ctx.beginPath();
      ctx.fillStyle = sector.color;
      ctx.moveTo(rad, rad);
      ctx.arc(rad, rad, rad, angle, angle + arc);
      ctx.lineTo(rad, rad);
      ctx.fill();
      // TEXT
      ctx.translate(rad, rad);
      ctx.rotate(angle + arc / 2);
      ctx.textAlign = 'right';
      ctx.fillStyle = '#fff';
      ctx.font = 'bold 18px sans-serif';
      ctx.fillText(sector.name, rad - 10, 10);
      //
      ctx.restore();
    };

    const rotate = () => {
      const sector = sectors[getIndex()];
      canvas.style.transform = `rotate(${ang - PI / 2}rad)`;
      spinEl.textContent = !angVel ? 'SPIN' : sector.name;
      spinEl.style.background = sector.color;
    };

    const frame = () => {
      if (!angVel) return;
      angVel *= friction; // Decrement velocity by friction
      if (angVel < 0.002) angVel = 0; // Bring to stop
      ang += angVel; // Update angle
      ang %= TAU; // Normalize angle
      rotate();
    };

    const engine = () => {
      frame();
      requestAnimationFrame(engine);
    };

    const handleSpinClick = () => {
      if (!spinning && !angVel) { // Verificar que la rueda no esté girando y que no esté en proceso de frenado
        angVel = rand(0.25, 0.45);
        setSpinning(true); // Establecer spinning en true cuando la rueda comienza a girar

        setTimeout(() => {
          const sector = sectors[getIndex()];
          console.log(sector);
          onSpinComplete(sector); // Llama a la devolución de llamada con el sector seleccionado
          setSpinning(false); // Establecer spinning en false cuando la rueda se ha detenido
        }, 5000); // Tiempo en milisegundos para detener el giro (5 segundos en este caso)
      }
    };

    const init = () => {
      sectors.forEach(drawSector);
      rotate(); // Initial rotation
      engine(); // Start engine
      spinEl.addEventListener('click', handleSpinClick);
    };

    init();
  }, [sectors, onSpinComplete, spinning]); // Añade spinning como dependencia en el useEffect

  return (
    <div id="wheelOfFortune">
      <canvas ref={canvasRef} width={250} height={250} />
      <button id="spin" ref={spinElRef}></button>
    </div>
  );
};

export default Wheel;
