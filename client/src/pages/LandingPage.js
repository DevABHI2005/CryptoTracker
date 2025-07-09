import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import ParticleBackground from '../components/ParticleBackground';
import './LandingPage.css';

function LandingPage() {
  const user = JSON.parse(localStorage.getItem('user'));
  const navigate = useNavigate();
  const [news, setNews] = useState([]);
  const [showNews, setShowNews] = useState(false);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axios.get(
          `https://newsapi.org/v2/everything?q=cryptocurrency&apiKey=d28878ad21fb4b90a20544c3cca19992`
        );
        setNews(response.data.articles.slice(0, 6));
      } catch (err) {
        console.error('Failed to fetch news:', err);
      }
    };
    fetchNews();
  }, []);

  return (
    <div className="text-center mt-5 fade-in px-3 position-relative">
      <ParticleBackground />
      <div className="container mb-5">
        <h1 className="display-4 fw-bold mb-3">
          Your Personal <span className="text-primary">Crypto Dashboard</span>
        </h1>
        <p className="lead text-muted mb-4">Track prices. View trends. Save favorites. Stay ahead.</p>

        <ul className="list-group list-group-flush text-start mx-auto" style={{ maxWidth: '500px' }}>
          <li className="list-group-item">📈 Real-time charts of top cryptocurrencies</li>
          <li className="list-group-item">❤️ Save & manage your favorite coins</li>
          <li className="list-group-item">🔒 Simple, secure login experience</li>
        </ul>

        <div className="mt-5">
          {user ? (
            <Link className="btn btn-success btn-lg" to="/dashboard">Go to Dashboard</Link>
          ) : (
            <>
              <Link className="btn btn-primary btn-lg mx-2" to="/register">Get Started</Link>
              <Link className="btn btn-outline-light btn-lg mx-2" to="/login">Login</Link>
            </>
          )}
        </div>

        {/* 🎯 News Toggle Button */}
        <div className="mt-5">
  <Link to="/news" className="btn btn-outline-info btn-lg">
    📰 Explore Latest Crypto News
  </Link>
</div>

        {/* 📰 News Section */}
        {showNews && (
          <div className="news-container mt-4">
            {news.map((article, idx) => (
              <a
                key={idx}
                href={article.url}
                target="_blank"
                rel="noopener noreferrer"
                className="d-block text-start p-3 my-2 bg-dark text-light rounded shadow-sm news-item"
                style={{ textDecoration: 'none', transition: 'all 0.3s' }}
              >
                <strong>{article.title}</strong>
                <div className="text-muted small">{article.source.name}</div>
              </a>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default LandingPage;
