
# 💹 CryptoTracker – Real-Time Cryptocurrency Dashboard

CryptoTracker is a full-stack web application that allows users to track, favorite, and analyze cryptocurrencies in real-time. Built with **React**, **Node.js**, **Express**, and **MongoDB**, it features modern UI design, user authentication, interactive charts, and a live news feed.

![CryptoTracker Demo](https://raw.githubusercontent.com/DevABHI2005/CryptoTracker/main/screenshots/dashboard.png)

---

## 🚀 Features

- 🔐 **Google Authentication** (OAuth 2.0)
- 📈 Live market data from **CoinGecko API**
- 🌟 Add/remove favorite coins (persisted to backend)
- 📊 7-day historical **interactive charts** (line graph)
- 📰 Latest **crypto news section**
- 🌙 Dark theme design with particle background
- 💾 Session persistence (localStorage based)

---

## 📁 Project Structure

```
CryptoTracker/
├── client/         # React frontend
│   ├── src/
│   └── public/
├── server/         # Express backend
│   ├── models/
│   ├── routes/
│   └── controllers/
└── README.md
```

---

## 📸 Screenshots

| Dashboard | Profile | Chart |
|----------|---------|--------|
| ![Dashboard](https://raw.githubusercontent.com/DevABHI2005/CryptoTracker/main/screenshots/dashboard.png) | ![Profile](https://raw.githubusercontent.com/DevABHI2005/CryptoTracker/main/screenshots/profile.png) | ![Chart](https://raw.githubusercontent.com/DevABHI2005/CryptoTracker/main/screenshots/chart.png) |

---

## 🛠️ Tech Stack

- **Frontend**: React.js, Bootstrap, Axios, Framer Motion
- **Backend**: Node.js, Express, MongoDB, Mongoose
- **Authentication**: Google OAuth 2.0
- **APIs**: CoinGecko, NewsAPI

---

## 🌍 Deployment

- Frontend: [Vercel](https://vercel.com/)
- Backend: [Render](https://render.com/) or [Railway](https://railway.app/)

---

## 🧠 Learnings

- Integrated Google login with session persistence
- Implemented charts using live data with Chart.js
- Responsive layout and UI/UX animations
- Particle background and theme effects

---

## 📌 Setup & Run

```bash
# Clone repo
git clone https://github.com/DevABHI2005/CryptoTracker.git && cd CryptoTracker

# Setup backend
cd server
npm install
npm start

# Setup frontend
cd ../client
npm install
npm start
```

---

## 🙋‍♂️ Author

Made with 💙 by [Abhiram](https://github.com/DevABHI2005)

---

## ⭐ Show your support

If you found this project helpful, give it a ⭐ on GitHub and share with friends!

---
