// src/components/Header.jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Header.css'; // 必要に応じてCSSを記述

function Header({ onSearch }) {
  const [input, setInput] = useState('');
  const navigate = useNavigate();

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (input.trim()) {
      onSearch(input.trim()); // App.jsxに検索クエリを渡す
      navigate(`/search?q=${encodeURIComponent(input.trim())}`); // 検索結果ページへ遷移
    }
  };

  return (
    <header className="app-header">
      <Link to="/" className="logo">
        My Invidious Tube
      </Link>
      <form onSubmit={handleSearchSubmit} className="search-form">
        <input
          type="text"
          placeholder="検索..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="search-input"
        />
        <button type="submit" className="search-button">
          検索
        </button>
      </form>
    </header>
  );
}

export default Header;
