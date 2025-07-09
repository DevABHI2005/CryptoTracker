// ✅ components/CryptoScrollWidget.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './CryptoScrollWidget.css';
import '../components/CryptoScroller.css';

function CryptoScrollWidget({ onCoinSelect }) {
  const [coins, setCoins] = useState([]);

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
      } catch (err) {
        console.error('Error fetching scroll widget coins:', err);
      }
    };
    fetchCoins();
  }, []);

  return (
    <div className="crypto-scroll-widget">
      <div className="scroll-track">
        {coins.map(coin => (
          <div
            key={coin.id}
            className="coin-icon"
            onClick={() => onCoinSelect(coin.id)}
            title={coin.name}
          >
            <img src={coin.image} alt={coin.name} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default CryptoScrollWidget;
