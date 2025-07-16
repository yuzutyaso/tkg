// src/components/InvidiousEmbedPlayer.jsx (埋め込みプレイヤー用)
import React from 'react';
import './VideoPlayer.css'; // 必要に応じてCSSを記述 (共通のスタイルやレスポンシブ対応)

function InvidiousEmbedPlayer({ videoId }) {
  if (!videoId) {
    return <div className="video-player-status">動画IDが指定されていません。</div>;
  }

  const embedUrl = `https://lekker.gay/embed/${videoId}`;

  return (
    <div className="video-player-container embed-player-wrapper">
      <iframe
        src={embedUrl}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className="main-video-player"
        title="Embedded Invidious Video"
      ></iframe>
    </div>
  );
}

export default InvidiousEmbedPlayer;
