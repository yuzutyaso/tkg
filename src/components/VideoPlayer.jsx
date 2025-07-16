// src/components/VideoPlayer.jsx (直接再生用)
import React, { useState, useEffect } from 'react';
import { getVideoDetails, getOptimalVideoUrl } from '../api';
import './VideoPlayer.css'; // 必要に応じてCSSを記述

function VideoPlayer({ videoId }) {
  const [videoUrl, setVideoUrl] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAndSetVideo = async () => {
      setLoading(true);
      setError(null);
      try {
        const videoDetails = await getVideoDetails(videoId);
        if (videoDetails && videoDetails.formatStreams) {
          const url = getOptimalVideoUrl(videoDetails.formatStreams);
          if (url) {
            setVideoUrl(url);
          } else {
            setError("利用可能な動画ストリームが見つかりませんでした。");
          }
        } else {
          setError("動画情報の取得に失敗しました。");
        }
      } catch (err) {
        setError("動画の読み込み中にエラーが発生しました。");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (videoId) {
      fetchAndSetVideo();
    }
  }, [videoId]);

  if (loading) {
    return <div className="video-player-status">動画を読み込み中...</div>;
  }

  if (error) {
    return <div className="video-player-status video-player-error">エラー: {error}</div>;
  }

  if (!videoUrl) {
    return <div className="video-player-status">動画を再生できません。</div>;
  }

  return (
    <div className="video-player-container">
      <video controls width="100%" height="auto" className="main-video-player">
        <source src={videoUrl} type="video/mp4" />
        お使いのブラウザは動画タグをサポートしていません。
      </video>
    </div>
  );
}

export default VideoPlayer;
