// client/src/components/CryptoChart.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
);

const CryptoChart = () => {
  const [chartData, setChartData] = useState([]);
  const coinId = localStorage.getItem('scrollCoin') || 'bitcoin';

  useEffect(() => {
    const fetchChart = async () => {
      try {
        const { data } = await axios.get(
          `https://api.coingecko.com/api/v3/coins/${coinId}/market_chart`,
          {
            params: {
              vs_currency: 'usd',
              days: 7,
            },
          }
        );
        setChartData(data.prices);
      } catch (err) {
        console.error("Chart fetch failed:", err);
      }
    };

    fetchChart();
  }, [coinId]);

  const data = {
    labels: chartData.map((item) => {
      const date = new Date(item[0]);
      return `${date.getDate()}/${date.getMonth() + 1}`;
    }),
    datasets: [
      {
        label: `${coinId.toUpperCase()} - Last 7 Days`,
        data: chartData.map((item) => item[1]),
        fill: true,
        borderColor: '#36a2eb',
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        tension: 0.3,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        labels: {
          color: '#fff',
        },
      },
    },
    scales: {
      x: {
        ticks: {
          color: '#ccc',
        },
      },
      y: {
        ticks: {
          color: '#ccc',
        },
      },
    },
  };

  return (
    <div className="bg-dark p-4 rounded shadow mt-4">
      <h4 className="text-light mb-3">{coinId.toUpperCase()} - Last 7 Days</h4>
      <Line data={data} options={options} />
    </div>
  );
};

export default CryptoChart;
