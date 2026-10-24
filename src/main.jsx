import React, { useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import dashboardMarkup from './dashboard.html?raw';
import dashboardStyles from './dashboard.css?inline';
import './global.css';
import { initDashboard } from './dashboard.js';

function App() {
  useEffect(() => {
    const style = document.createElement('style');
    style.dataset.dashboardStyles = 'true';
    style.textContent = dashboardStyles;
    document.head.appendChild(style);

    initDashboard();

    return () => {
      style.remove();
    };
  }, []);

  return <div className="react-dashboard" dangerouslySetInnerHTML={{ __html: dashboardMarkup }} />;
}

createRoot(document.getElementById('root')).render(<App />);
