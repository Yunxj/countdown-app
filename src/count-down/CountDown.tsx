import React, { useState, useEffect, memo } from "react";
import { CountdownContainer, CountdownCircle } from "./style";

interface CountdownProps {
  duration:number,
  onFinish: () => void;
  onTimeUpdate?: (timeRemaining: number) => void;
  onCountClick?: () => void;
}

const Countdown: React.FC<CountdownProps> = memo(
  ({ onFinish, onTimeUpdate, onCountClick, duration }) => {
    const [timeRemaining, setTimeRemaining] = useState(duration);
    useEffect(() => {
      const interval = setInterval(() => {
          const newTimeRemaining = timeRemaining - 1000;
          if (newTimeRemaining <= 0) {
            clearInterval(interval);
            onFinish();
            onTimeUpdate?.(0);
            setTimeRemaining(0);
          } else {
            onTimeUpdate?.(newTimeRemaining);
            setTimeRemaining(newTimeRemaining);
          }
      }, 1000);

      return () => clearInterval(interval);
    }, [onFinish, onTimeUpdate, timeRemaining]);

    return (
      <CountdownContainer
        duration={duration}
        timeRemaining={timeRemaining}
        onClick={onCountClick}
      >
        <CountdownCircle duration={duration} timeRemaining={timeRemaining}>
          <circle className="circle-background" cx="50" cy="50" r="48" />
          <circle className="circle-progress" cx="50" cy="50" r="48" />
        </CountdownCircle>
        <div className="icon">X</div>
      </CountdownContainer>
    );
  }
);

export default Countdown;
