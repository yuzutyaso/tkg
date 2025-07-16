// src/components/VideoCard.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import './VideoCard.css'; // 必要に応じてCSSを記述

function VideoCard({ video }) {
  if (!video || !video.videoId) {
    return null; // データがない場合は表示しない
  }

  // サムネイルURLが存在しない場合や、エラーが発生した場合のフォールバック
  const thumbnailUrl = video.videoThumbnails && video.videoThumbnails.length > 0
    ? video.videoThumbnails[video.videoThumbnails.length - 1]?.url // 最も高画質のサムネイルを取得
    : 'https://via.placeholder.com/240x135?text=No+Thumbnail'; // プレースホルダー画像

  return (
    <div className="video-card">
      <Link to={`/watch/${video.videoId}`}>
        <img src={thumbnailUrl} alt={video.title} className="video-thumbnail" />
        <div className="video-info">
          <h3 className="video-title">{video.title}</h3>
          <p className="video-author">{video.author}</p>
          {video.viewCount && <p className="video-views">{video.viewCount.toLocaleString()} 回視聴</p>}
          {video.publishedText && <p className="video-published">{video.publishedText}</p>}
        </div>
      </Link>
    </div>
  );
}

export default VideoCard;
