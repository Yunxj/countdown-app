import React, { useState, useCallback } from 'react';
import Countdown from '../count-down/CountDown'; // 假设 Countdown 组件路径
interface CountdownProps {
  onFinish: () => void;
  onCountClick: () => void;
}


const VideoCard: React.FC<CountdownProps> = ({onCountClick,onFinish}) => {
  const duration = 8000;
  const [timeRemaining, setTimeRemaining] = useState(duration); 

  const handleCountdownFinish = useCallback(() => {
    onCountClick()
  },[onCountClick]);

  const handleCountdownClick = useCallback(() => {
    onFinish()
  },[onFinish]);

  const handleTimeUpdate = useCallback((newTimeRemaining: number) => {
    setTimeRemaining(newTimeRemaining);
  },[]);

  return (
        <>
          <div>倒计时剩余时间: {Math.floor(timeRemaining / 1000)} 秒</div> {/* 展示倒计时时间 */}
          <Countdown
            duration={duration}  
            onFinish={handleCountdownFinish}
            onTimeUpdate={handleTimeUpdate}
            onCountClick={handleCountdownClick}
          />
        </>
  );
};

export default VideoCard;
