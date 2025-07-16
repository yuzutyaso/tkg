// src/pages/HomePage.jsx
import React, { useState, useEffect } from 'react';
import { getTrendingVideos } from '../api';
import VideoList from '../components/VideoList';
import './HomePage.css'; // 必要に応じてCSSを記述

function HomePage() {
  const [trendingVideos, setTrendingVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTrending = async () => {
      setLoading(true);
      setError(null);
      try {
        const videos = await getTrendingVideos('JP'); // 日本のトレンド動画
        setTrendingVideos(videos);
      } catch (err) {
        setError("人気動画の読み込みに失敗しました。");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchTrending();
  }, []);

  if (loading) {
    return <div className="page-status">人気動画を読み込み中...</div>;
  }

  if (error) {
    return <div className="page-status page-error">エラー: {error}</div>;
  }

  return (
    <div className="home-page">
      <VideoList videos={trendingVideos} title="人気の動画" />
    </div>
  );
}

export default HomePage;
