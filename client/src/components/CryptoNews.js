import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './CryptoNews.css';

const API_KEY = 'd28878ad21fb4b90a20544c3cca19992'; // replace with actual key

const CryptoNews = () => {
  const [news, setNews] = useState([]);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const res = await axios.get(`https://cryptonews-api.com/api/v1/category?section=general&items=8&token=${API_KEY}`);
        setNews(res.data.data);
      } catch (err) {
        console.error('News fetch error:', err);
      }
    };

    fetchNews();
  }, []);

  return (
    <div className="news-section container mt-5">
      <h3 className="text-center text-light mb-4">📰 Latest Crypto News</h3>
      <div className="row">
        {news.map((article, index) => (
          <div className="col-md-6 col-lg-4 mb-4" key={index}>
            <div className="news-card">
              <img src={article.image_url} alt="news" className="news-image" />
              <div className="news-content">
                <h5>{article.title}</h5>
                <p className="news-source">Source: {article.source_name}</p>
                <a href={article.news_url} className="btn btn-sm btn-outline-info" target="_blank" rel="noopener noreferrer">Read More</a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CryptoNews;



