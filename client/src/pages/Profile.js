import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Profile() {
  const [favorites, setFavorites] = useState([]);
  const [email, setEmail] = useState('');

  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    if (user && user.email) {
      setEmail(user.email);
      fetchFavorites(user.email);
    }
  }, []);

  const fetchFavorites = async (email) => {
    try {
      const res = await axios.get(`http://localhost:5000/api/users/${email}`);
      setFavorites(res.data.favorites || []);
    } catch (err) {
      console.error("Failed to load favorites:", err.message);
    }
  };

  const removeFavorite = async (coinId) => {
    try {
      await axios.post("http://localhost:5000/api/users/remove-favorite", {
        email,
        coinId
      });
      setFavorites(prev => prev.filter(id => id !== coinId));
    } catch (err) {
      console.error("Remove failed:", err.message);
    }
  };

  return (
    <div className="container mt-5 d-flex justify-content-center align-items-center flex-column">
      <div className="card shadow-lg p-4 text-center" style={{ maxWidth: '600px', width: '100%' }}>
        <h3 className="mb-3">Welcome,</h3>
        <p><strong>Email:</strong> {email || "Not Logged In"}</p>

        <hr />
        <h5>⭐ Your Favorites</h5>
        {favorites.length > 0 ? (
          <ul className="list-group mt-2">
            {favorites.map((coin, index) => (
              <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
                {coin}
                <button className="btn btn-sm btn-danger" onClick={() => removeFavorite(coin)}>Remove</button>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-muted mt-3">No favorites saved yet.</p>
        )}
      </div>
    </div>
  );
}

export default Profile;
