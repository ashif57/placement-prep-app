import React, { useState, useEffect } from 'react';
import { formatTime } from '../utils/timerUtils';
import styles from './Timer.module.css';

const Timer = ({ initialTime, onTimeUp }) => {
  const [time, setTime] = useState(initialTime);

  useEffect(() => {
    if (time === 0) {
      onTimeUp();
      return;
    }

    const intervalId = setInterval(() => {
      setTime((prevTime) => prevTime - 1);
    }, 1000);

    return () => clearInterval(intervalId);
  }, [time, onTimeUp]);

  return (
    <div className={styles.timer}>
      <h2>{formatTime(time)}</h2>
    </div>
  );
};

export default Timer;
