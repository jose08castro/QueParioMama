import React, { useState, useEffect } from 'react';
import { FaPlay, FaPause} from 'react-icons/fa';
import './Timer.css';
import timerSoundFile from '../sounds/Timer.mp3'

const Timer = ({ initialTime, handleTimer }) => {
  const [time, setTime] = useState(initialTime);
  const [isPaused, setIsPaused] = useState(true);
  const timerSound = new Audio(timerSoundFile);

  useEffect(() => {
    let interval;

    if (!isPaused && time > 0) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime - 1);
      }, 1000);
    }
    if(time === 0){
      handleTimer();
    }

    return () => {
      clearInterval(interval);
    };
  }, [isPaused, time]);

  useEffect(() => {
    if (!isPaused && time > 0) {
      timerSound.play();
    } else {
      timerSound.pause();
      timerSound.currentTime = 0;
    }
  }, [isPaused, time, timerSound]);

  const handlePauseClick = () => {
    setIsPaused(!isPaused);
  };

  const formatTime = (time) => {
    return time;
    // const minutes = Math.floor(time / 60);
    // const seconds = time % 60;

    // if (minutes === 0) {
    //   return `${seconds}`;
    // }
    // return `${minutes} : ${seconds}`;
  };

  return (
    <div className='aliner'>
      <div className='timer-border' onClick={handlePauseClick}>
        <div className='timer'>{formatTime(time)}</div>
        <div className='pause-play-button'>{isPaused ? <FaPlay size={22} /> : <FaPause size={22}/>}</div>
        {/* <button className='pause-play-button' onClick={handlePauseClick}>{isPaused ? <FaPlay size={22} /> : <FaPause size={22}/>}</button> */}
      </div>
    </div>
  );
};

export default Timer;
