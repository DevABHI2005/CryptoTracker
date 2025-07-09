// CryptoScroller.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './CryptoScroller.css';

function CryptoScroller({ onSelect, showPrice = false, largeIcons = false }) {
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
        setCoins([...res.data, ...res.data]); // duplicate for smooth loop
      } catch (err) {
        console.error('Error fetching coins:', err);
      }
    };
    fetchCoins();
  }, []);

  return (
    <div className="crypto-scroller">
      <div className="scroll-track">
        {coins.map((coin, index) => (
          <div
            key={index}
            className={`coin-item ${largeIcons ? 'large-icon' : ''}`}
            onClick={() => onSelect && onSelect(coin.id)}
          >
            <img src={coin.image} alt={coin.name} />
            {showPrice && <div className="coin-price">${coin.current_price.toLocaleString()}</div>}
          </div>
        ))}
      </div>
    </div>
  );
}

export default CryptoScroller;
