import React, { useState, useEffect, memo ,useRef} from "react";
import { CountdownContainer, CountdownCircle } from "./style";
import { useIntersectionObserver } from "./useIntersectionObserver";
import usePageVisibility from './hooks';
interface CountdownProps {
  duration: number;
  onFinish: () => void;
  onTimeUpdate?: (timeRemaining: number) => void;
  onCountClick?: () => void;
}

const Countdown: React.FC<CountdownProps> = memo(
  ({ onFinish, onTimeUpdate, onCountClick, duration }) => {
    const [timeRemaining, setTimeRemaining] = useState(duration);
    const [isPaused, setIsPaused] = useState(false);
    const [wasLessThanThreeSeconds, setWasLessThanThreeSeconds] = useState(false);
    const countdownRef = useRef<HTMLDivElement>(null);
    const isVisible = usePageVisibility();
    useEffect(() => {
      let interval: NodeJS.Timeout | null = null;
      if (!isPaused&& isVisible) {
        interval = setInterval(() => {
          const newTimeRemaining = timeRemaining - 1000;
          if (newTimeRemaining <= 0) {
            clearInterval(interval!);
            onFinish();
            onTimeUpdate?.(0);
            setTimeRemaining(0);
          } else {
            onTimeUpdate?.(newTimeRemaining);
            setTimeRemaining(newTimeRemaining);
          }
        }, 1000);
      }
      return () => {
        if (interval) clearInterval(interval);
      };
    }, [isPaused,isVisible, onFinish, onTimeUpdate,timeRemaining]);

    useEffect(() => {
      if (!isVisible && timeRemaining <= 3000) {
        setWasLessThanThreeSeconds(true);
      }

      if (isVisible && wasLessThanThreeSeconds) {
        setTimeRemaining(duration);
        setWasLessThanThreeSeconds(false);
      }
    }, [isVisible, timeRemaining, duration, wasLessThanThreeSeconds]);

    const handlePauseResume = () => {
      setIsPaused(false);
    };

    const handleResumeResume = () => {
      if (!isPaused && timeRemaining <= 3000) {
        setTimeRemaining(8000);
        setIsPaused(false);
      } else {
        setIsPaused(true);
      }
    };

    useIntersectionObserver({
      element: countdownRef,
      threshold: [1],
      intersectionHandler: handlePauseResume,
      outerSectionHandler: handleResumeResume, 
    });

    return (
    <>
      <CountdownContainer
      duration={duration}
      timeRemaining={timeRemaining}
      onClick={onCountClick}
      ref={countdownRef}
    >
      <CountdownCircle duration={duration} timeRemaining={timeRemaining}>
        <circle className="circle-background" cx="50" cy="50" r="48" />
        <circle className="circle-progress" cx="50" cy="50" r="48" />
      </CountdownCircle>
     
    </CountdownContainer>
    </>
    );
  }
);

export default Countdown;
