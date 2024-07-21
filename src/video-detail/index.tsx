// VideoDetail.tsx
import React from 'react';
import VideoCard from '../video-card';

const VideoDetail: React.FC = () => {
  const handleFinish = () => {
    console.log('VideoDetail');
    // 在这里添加你的逻辑
  };
  return (
    <div>
      <h2>Video Detail</h2>
      <VideoCard  />
    </div>
  );
};

export default VideoDetail;