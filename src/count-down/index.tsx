import React, { useState, useEffect } from 'react';
import { CountdownContainer, CountdownCircle } from './style';

interface CountdownProps {
  onFinish: () => void;
  onTimeUpdate?: (timeRemaining: number) => void;
  onCountClick?: () => void;
}

const Countdown: React.FC<CountdownProps> = ({ onFinish, onTimeUpdate, onCountClick }) => {
  const duration = 8000; // 总倒计时的时长为8秒
  const [timeRemaining, setTimeRemaining] = useState(duration);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeRemaining(prevTimeRemaining => {
        const newTimeRemaining = prevTimeRemaining - 1000;
        if (newTimeRemaining <= 0) {
          clearInterval(interval);
          onFinish();
          onTimeUpdate?.(0);
          return 0;
        } else {
          onTimeUpdate?.(newTimeRemaining);
          return newTimeRemaining;
        }
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [onFinish, onTimeUpdate]);

  return (
    <CountdownContainer duration={duration} timeRemaining={timeRemaining} onClick={onCountClick}>
      <CountdownCircle duration={duration} timeRemaining={timeRemaining}>
        <circle className="circle-background" cx="50" cy="50" r="48" />
        <circle
          className="circle-progress"
          cx="50"
          cy="50"
          r="48"
        />
      </CountdownCircle>
      <div className="icon">X</div>
    </CountdownContainer>
  );
};

export default Countdown;
