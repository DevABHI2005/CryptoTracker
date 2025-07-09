// ✅ client/src/pages/Dashboard.js – Updated with simplified hover and fixed homepage link
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CryptoChart from '../components/CryptoChart';
import './Dashboard.css';
import { useUser } from '../context/Temp';
import { motion } from 'framer-motion';
import ParticleBackground from '../components/ParticleBackground';

function Dashboard() {
  const [coins, setCoins] = useState([]);
  const [filteredCoins, setFilteredCoins] = useState([]);
  const [selectedCoin, setSelectedCoin] = useState('bitcoin');
  const [chartData, setChartData] = useState([]);
  const [coinName, setCoinName] = useState('');
  const [search, setSearch] = useState('');
  const { user } = useUser();

  useEffect(() => {
    const fetchCoins = async () => {
      try {
        const res = await axios.get('https://api.coingecko.com/api/v3/coins/markets', {
          params: {
            vs_currency: 'usd',
            order: 'market_cap_desc',
            per_page: 20,
            page: 1,
            sparkline: false,
          },
        });
        setCoins(res.data);
        setFilteredCoins(res.data);
      } catch (err) {
        console.error('Error fetching coins:', err);
      }
    };
    fetchCoins();
  }, []);

  useEffect(() => {
    const filtered = coins.filter(coin =>
      coin.name.toLowerCase().includes(search.toLowerCase()) ||
      coin.symbol.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredCoins(filtered);
  }, [search, coins]);

  useEffect(() => {
    const fetchChart = async () => {
      try {
        const [marketData, coinDetails] = await Promise.all([
          axios.get(`https://api.coingecko.com/api/v3/coins/${selectedCoin}/market_chart?vs_currency=usd&days=7`),
          axios.get(`https://api.coingecko.com/api/v3/coins/${selectedCoin}`)
        ]);

        setChartData(
          marketData.data.prices.map(([timestamp, price]) => ({
            date: new Date(timestamp).toLocaleDateString(),
            price: price.toFixed(2)
          }))
        );
        setCoinName(coinDetails.data.name);
      } catch (err) {
        console.error("Chart fetch failed:", err);
      }
    };

    if (selectedCoin) fetchChart();
  }, [selectedCoin]);

  const handleAddFavorite = async (coinId) => {
  const stored = JSON.parse(localStorage.getItem("user"));
  const user = stored?.user; // ✅ Extract actual user object

  if (!user || !user.email) {
    alert("User not logged in");
    return;
  }

  try {
    await axios.post('http://localhost:5000/api/users/favorites', {
      coinId,
      email: user.email,
    });
    alert("Added to favorites");
  } catch (err) {
    alert("Failed to add to favorites");
    console.error(err);
  }
};

  return (
    <div className="container py-4 dashboard-wrapper fade-in">
      <motion.h2 
        className="text-center mb-4 display-6 fw-bold"
        initial={{ opacity: 0, y: -20 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.6 }}
      >
        📊 Top Cryptocurrencies
      </motion.h2>

      <motion.div 
        className="search-bar mb-4 d-flex justify-content-center"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <input
          type="text"
          placeholder="Search coins (e.g. BTC, Ethereum)"
          className="form-control search-input shadow"
          style={{ maxWidth: '400px' }}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </motion.div>

      <div className="row g-4">
        {filteredCoins.map((coin, index) => (
          <motion.div
            key={coin.id}
            className="col-md-4 col-sm-6 col-12"
            whileHover={{ scale: 1.01 }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05, type: "spring", damping: 12, stiffness: 100 }}
            onClick={() => setSelectedCoin(coin.id)}
          >
            <div className="card coin-card h-100 shadow">
              <div className="card-body d-flex flex-column justify-content-between">
                <div className="d-flex align-items-center gap-2 mb-2">
                  <img src={coin.image} alt={coin.name} width="30" />
                  <h5 className="mb-0 text-primary">{coin.name}</h5>
                  <span className="text-muted">({coin.symbol.toUpperCase()})</span>
                </div>
                <p className="mb-1 fs-5">💲 {coin.current_price.toLocaleString()}</p>
                <p className={coin.price_change_percentage_24h >= 0 ? "text-success" : "text-danger"}>
                  {coin.price_change_percentage_24h.toFixed(2)}% (24h)
                </p>
                <button
                  className="btn btn-outline-danger btn-sm align-self-start mt-2"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleAddFavorite(coin.id)

                  }}
                >
                  ❤️ Favorite
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mt-5">
        <CryptoChart data={chartData} name={coinName} />
      </div>
    </div>
  );
}

export default Dashboard;
