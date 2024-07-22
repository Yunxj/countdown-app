/*
 * @Author: owenycheng owenycheng@tencent.com
 * @Date: 2024-07-22 09:34:59
 * @LastEditors: owenycheng owenycheng@tencent.com
 * @LastEditTime: 2024-07-22 11:16:26
 * @FilePath: /countdown-app/src/video-detail/index.tsx
 * @Description:
 *
 */
// VideoDetail.tsx
import React, { useState, useCallback } from "react";
import VideoCard from "../video-card";
import NewComponent from "../video-card/NewComponent"; // 新组件路径

const VideoDetail: React.FC = () => {
  const [showCountdown, setShowCountdown] = useState(true);

  const handleCountdownFinish = useCallback(() => {
    setShowCountdown(false); // 隐藏 Countdown 组件
  }, []);

  const handleCountdownClick = useCallback(() => {
    setShowCountdown(false); // 隐藏 Countdown 组件
    // 点击事件处理
    console.log("history");
  }, []);

  return (
    <div>
      <h2>Video Detail</h2>
      {showCountdown ? (
        <VideoCard
          onFinish={handleCountdownFinish}
          onCountClick={handleCountdownClick}
        />
      ) : (
        <NewComponent />
      )}
    </div>
  );
};

export default VideoDetail;
