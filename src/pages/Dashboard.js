import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { apiService } from '../services/api';
import '../styles/Dashboard.css';

export default function Dashboard() {
  const [wallets, setWallets] = useState([]);
  const [rates, setRates] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [walletsRes, ratesRes] = await Promise.all([
        apiService.getWallets(),
        apiService.getRates()
      ]);
      setWallets(walletsRes.data || []);
      setRates(ratesRes.data || {});
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  if (loading) return <div className="loading">Loading...</div>;

  return (
    <div className="dashboard">
      <nav className="dash-nav">
        <div className="logo">💰 FlipCash</div>
        <button onClick={handleLogout} className="logout">Logout</button>
      </nav>

      <div className="container">
        <h1>Dashboard</h1>
        
        <div className="wallets">
          {wallets.map(w => (
            <div key={w.currency} className="wallet-card">
              <h3>{w.currency}</h3>
              <p className="balance">{w.balance.toFixed(2)}</p>
            </div>
          ))}
        </div>

        {rates && (
          <div className="rates">
            <h3>Exchange Rates</h3>
            <p>1 NGN = {rates.ngnToKsh} KSH</p>
            <p>1 KSH = {rates.kshToNgn} NGN</p>
          </div>
        )}

        <div className="actions">
          <Link to="/swap" className="action-btn">💱 Swap</Link>
          <Link to="/withdraw" className="action-btn">💸 Withdraw</Link>
          <Link to="/history" className="action-btn">📊 History</Link>
        </div>
      </div>
    </div>
  );
}
