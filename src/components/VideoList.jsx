// src/components/VideoList.jsx
import React from 'react';
import VideoCard from './VideoCard';
import './VideoList.css'; // 必要に応じてCSSを記述

function VideoList({ videos, title = "動画" }) {
  if (!videos || videos.length === 0) {
    return <p>動画が見つかりませんでした。</p>;
  }

  return (
    <div className="video-list-container">
      <h2>{title}</h2>
      <div className="video-list">
        {videos.map((video) => (
          <VideoCard key={video.videoId} video={video} />
        ))}
      </div>
    </div>
  );
}

export default VideoList;
