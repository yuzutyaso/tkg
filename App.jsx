// src/App.jsx
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import HomePage from './pages/HomePage';
import SearchResultsPage from './pages/SearchResultsPage';
import VideoDetailsPage from './pages/VideoDetailsPage';
import Header from './components/Header'; // 後で作成
import './App.css'; // 必要に応じてCSSを記述

function App() {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (term) => {
    setSearchTerm(term);
    // 検索ページへリダイレクトするなど、実際のアプリではルーティングを行います
  };

  return (
    <Router>
      <div className="App">
        <Header onSearch={handleSearch} /> {/* 検索機能をHeaderに含める */}
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/search" element={<SearchResultsPage searchTerm={searchTerm} />} />
            <Route path="/watch/:videoId" element={<VideoDetailsPage />} />
            {/* 必要に応じて他のルートを追加 */}
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
