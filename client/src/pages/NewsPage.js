// src/pages/NewsPage.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './NewsPage.css';

const NewsPage = () => {
  const [news, setNews] = useState([]);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const res = await axios.get(
          `https://newsapi.org/v2/everything?q=cryptocurrency&apiKey=d28878ad21fb4b90a20544c3cca19992`
        );
        setNews(res.data.articles.slice(0, 10));
      } catch (err) {
        console.error('Error fetching news:', err);
      }
    };
    fetchNews();
  }, []);

  return (
    <div className="container py-5">
      <h2 className="text-center mb-4 text-light">📰 Latest Crypto News</h2>
      <div className="row g-4">
        {news.map((article, idx) => (
          <div key={idx} className="col-md-6">
            <a
              href={article.url}
              target="_blank"
              rel="noopener noreferrer"
              className="news-card p-3 rounded shadow text-decoration-none d-block h-100"
            >
              <h5 className="text-info mb-2">{article.title}</h5>
              <p className="text-light">{article.description}</p>
              <small className="text-muted">Source: {article.source.name}</small>
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NewsPage;
