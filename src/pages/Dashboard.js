import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { apiService } from '../services/api';
import '../styles/Dashboard.css';

export default function Dashboard() {
  const [wallets, setWallets] = useState([]);
  const [rates, setRates] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      console.log('📊 Loading dashboard data...');
      
      // Load wallets with error handling
      try {
        const walletsRes = await apiService.getWallets();
        console.log('✅ Wallets response:', walletsRes);
        
        // Handle different response structures
        if (walletsRes?.data?.wallets) {
          setWallets(walletsRes.data.wallets);
        } else if (walletsRes?.data && Array.isArray(walletsRes.data)) {
          setWallets(walletsRes.data);
        } else if (Array.isArray(walletsRes)) {
          setWallets(walletsRes);
        } else {
          console.log('⚠️ No wallets found, creating defaults...');
          setWallets([
            { currency: 'NGN', balance: 0 },
            { currency: 'KSH', balance: 0 }
          ]);
        }
      } catch (walletErr) {
        console.error('❌ Wallet error:', walletErr);
        setWallets([
          { currency: 'NGN', balance: 0 },
          { currency: 'KSH', balance: 0 }
        ]);
      }

      // Load rates with error handling
      try {
        const ratesRes = await apiService.getRates();
        console.log('✅ Rates response:', ratesRes);
        
        if (ratesRes?.data) {
          setRates(ratesRes.data);
        } else if (ratesRes) {
          setRates(ratesRes);
        } else {
          setRates({ ngnToKsh: 0.18, kshToNgn: 5.5 });
        }
      } catch (rateErr) {
        console.error('❌ Rates error:', rateErr);
        setRates({ ngnToKsh: 0.18, kshToNgn: 5.5 });
      }

    } catch (err) {
      console.error('❌ Dashboard error:', err);
      setError('Failed to load dashboard. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to logout?')) {
      localStorage.clear();
      navigate('/login');
    }
  };

  if (loading) {
    return (
      <div className="loading">
        <div>Loading dashboard...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="dashboard">
        <nav className="dash-nav">
          <div className="logo">💰 FlipCash</div>
          <button onClick={handleLogout} className="logout">Logout</button>
        </nav>
        <div className="container">
          <div className="error">{error}</div>
          <button onClick={loadData} className="action-btn">Try Again</button>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard">
      <nav className="dash-nav">
        <div className="logo">💰 FlipCash</div>
        <button onClick={handleLogout} className="logout">Logout</button>
      </nav>

      <div className="container">
        <h1>Dashboard</h1>
        
        <div className="wallets">
          {wallets && wallets.length > 0 ? (
            wallets.map((w, i) => (
              <div key={w.currency || i} className="wallet-card">
                <h3>{w.currency || 'Unknown'}</h3>
                <p className="balance">{(w.balance || 0).toFixed(2)}</p>
              </div>
            ))
          ) : (
            <div className="wallet-card">
              <p>No wallets found</p>
            </div>
          )}
        </div>

        {rates && (
          <div className="rates">
            <h3>Exchange Rates</h3>
            <p>1 NGN = {rates.ngnToKsh || '0.00'} KSH</p>
            <p>1 KSH = {rates.kshToNgn || '0.00'} NGN</p>
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
