import React, { useEffect, useState } from 'react';

function ThemeToggle() {
  const [dark, setDark] = useState(() => {
    return localStorage.getItem('theme') === 'dark';
  });

  useEffect(() => {
    document.body.classList.toggle('dark', dark);
    document.body.classList.toggle('light', !dark);
    localStorage.setItem('theme', dark ? 'dark' : 'light');
  }, [dark]);

  return (
    <button
      className="btn btn-sm btn-outline-secondary ms-2"
      onClick={() => setDark(prev => !prev)}
    >
      {dark ? '🌙 Dark' : '☀️ Light'}
    </button>
  );
}

export default ThemeToggle;
