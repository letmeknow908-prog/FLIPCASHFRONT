import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { apiService } from '../services/api';
import '../styles/Dashboard.css';

export default function Withdraw() {
  const [form, setForm] = useState({ currency: 'KSH', amount: '', phone: '', method: 'MPESA' });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      await apiService.withdraw({ ...form, amount: parseFloat(form.amount) });
      setMessage('Withdrawal initiated!');
      setForm({ ...form, amount: '', phone: '' });
    } catch (err) {
      setMessage(err.response?.data?.message || 'Withdrawal failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="dashboard">
      <nav className="dash-nav">
        <Link to="/dashboard" className="back">← Back</Link>
        <div className="logo">💸 Withdraw</div>
      </nav>

      <div className="container">
        <form onSubmit={handleSubmit} className="form-box">
          <h2>Withdraw Funds</h2>
          {message && <div className={message.includes('initiated') ? 'success' : 'error'}>{message}</div>}
          
          <select value={form.currency} onChange={e => setForm({...form, currency: e.target.value})}>
            <option value="KSH">KSH</option>
            <option value="NGN">NGN</option>
          </select>

          <input type="number" placeholder="Amount" value={form.amount} onChange={e => setForm({...form, amount: e.target.value})} required step="0.01" />
          
          <input placeholder="Phone Number" value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} required />

          <select value={form.method} onChange={e => setForm({...form, method: e.target.value})}>
            <option value="MPESA">M-Pesa</option>
            <option value="AIRTEL">Airtel Money</option>
          </select>

          <button type="submit" disabled={loading}>
            {loading ? 'Processing...' : 'Withdraw'}
          </button>
        </form>
      </div>
    </div>
  );
}
