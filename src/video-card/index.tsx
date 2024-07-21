import React, { useState } from 'react';
import Countdown from '../count-down'; // 假设 Countdown 组件路径
import NewComponent from './NewComponent'; // 新组件路径

const VideoCard: React.FC = () => {
  const [showCountdown, setShowCountdown] = useState(true);
  const [timeRemaining, setTimeRemaining] = useState(8000); // 初始化为 Countdown 组件一致的值

  const handleCountdownFinish = () => {
    setShowCountdown(false); // 隐藏 Countdown 组件
  };

  const handleCountdownClick = () => {
    setShowCountdown(false); // 隐藏 Countdown 组件
    // 点击事件处理
    console.log('history');
  };

  const handleTimeUpdate = (newTimeRemaining: number) => {
    setTimeRemaining(newTimeRemaining);
  };

  return (
    <div>
      {showCountdown ? (
        <>
          <div>倒计时剩余时间: {Math.floor(timeRemaining / 1000)} 秒</div> {/* 展示倒计时时间 */}
          <Countdown
            onFinish={handleCountdownFinish}
            onTimeUpdate={handleTimeUpdate}
            onCountClick={handleCountdownClick}
          />
        </>
      ) : (
        <NewComponent />
      )}
    </div>
  );
};

export default VideoCard;
