import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { apiService } from '../services/api';
import '../styles/Dashboard.css';

export default function Swap() {
  const [from, setFrom] = useState('NGN');
  const [to, setTo] = useState('KSH');
  const [amount, setAmount] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleSwap = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      await apiService.swap({ fromCurrency: from, toCurrency: to, amount: parseFloat(amount) });
      setMessage('Swap successful!');
      setAmount('');
    } catch (err) {
      setMessage(err.response?.data?.message || 'Swap failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="dashboard">
      <nav className="dash-nav">
        <Link to="/dashboard" className="back">← Back</Link>
        <div className="logo">💱 Swap</div>
      </nav>

      <div className="container">
        <form onSubmit={handleSwap} className="form-box">
          <h2>Currency Swap</h2>
          {message && <div className={message.includes('success') ? 'success' : 'error'}>{message}</div>}
          
          <select value={from} onChange={e => setFrom(e.target.value)}>
            <option value="NGN">NGN</option>
            <option value="KSH">KSH</option>
          </select>

          <div className="swap-icon">⇅</div>

          <select value={to} onChange={e => setTo(e.target.value)}>
            <option value="KSH">KSH</option>
            <option value="NGN">NGN</option>
          </select>

          <input 
            type="number" 
            placeholder="Amount" 
            value={amount} 
            onChange={e => setAmount(e.target.value)} 
            required 
            step="0.01"
          />

          <button type="submit" disabled={loading}>
            {loading ? 'Swapping...' : 'Swap Now'}
          </button>
        </form>
      </div>
    </div>
  );
}
