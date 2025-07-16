// src/pages/SearchResultsPage.jsx
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { searchVideos } from '../api';
import VideoList from '../components/VideoList';
import './SearchResultsPage.css'; // 必要に応じてCSSを記述

function SearchResultsPage() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const searchTerm = queryParams.get('q') || '';

  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchResults = async () => {
      setLoading(true);
      setError(null);
      if (searchTerm) {
        try {
          const results = await searchVideos(searchTerm);
          setSearchResults(results);
        } catch (err) {
          setError("検索結果の取得に失敗しました。");
          console.error(err);
        } finally {
          setLoading(false);
        }
      } else {
        setSearchResults([]);
        setLoading(false);
      }
    };
    fetchResults();
  }, [searchTerm]);

  if (loading) {
    return <div className="page-status">検索中...</div>;
  }

  if (error) {
    return <div className="page-status page-error">エラー: {error}</div>;
  }

  return (
    <div className="search-results-page">
      <h2>「{searchTerm}」の検索結果</h2>
      <VideoList videos={searchResults} />
      {searchResults.length === 0 && searchTerm && <p>該当する動画が見つかりませんでした。</p>}
      {!searchTerm && <p>検索キーワードを入力してください。</p>}
    </div>
  );
}

export default SearchResultsPage;
