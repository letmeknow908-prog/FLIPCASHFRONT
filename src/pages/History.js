import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { apiService } from '../services/api';
import '../styles/Dashboard.css';

export default function History() {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadTransactions();
  }, []);

  const loadTransactions = async () => {
    try {
      const res = await apiService.getTransactions({ limit: 50 });
      setTransactions(res.data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="loading">Loading...</div>;

  return (
    <div className="dashboard">
      <nav className="dash-nav">
        <Link to="/dashboard" className="back">← Back</Link>
        <div className="logo">📊 History</div>
      </nav>

      <div className="container">
        <h2>Transaction History</h2>
        {transactions.length === 0 ? (
          <p className="empty">No transactions yet</p>
        ) : (
          <div className="transactions">
            {transactions.map(tx => (
              <div key={tx._id} className="tx-card">
                <div className="tx-type">{tx.type}</div>
                <div className="tx-amount">{tx.amount} {tx.currency}</div>
                <div className="tx-status">{tx.status}</div>
                <div className="tx-date">{new Date(tx.createdAt).toLocaleDateString()}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
