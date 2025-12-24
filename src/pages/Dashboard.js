import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { apiService } from '../services/api';

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
      
      try {
        const walletsRes = await apiService.getWallets();
        console.log('✅ Wallets response:', walletsRes);
        
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
      console.log('✅ Dashboard loaded!');
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
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        fontSize: '1.5rem',
        color: '#10B981',
        background: '#F9FAFB'
      }}>
        <div>Loading dashboard...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ minHeight: '100vh', background: '#F9FAFB' }}>
        <nav style={{
          background: 'white',
          padding: '1rem 2rem',
          boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#10B981' }}>💰 FlipCash</div>
          <button onClick={handleLogout} style={{
            padding: '0.5rem 1.5rem',
            background: '#EF4444',
            color: 'white',
            borderRadius: '8px',
            border: 'none',
            cursor: 'pointer',
            fontWeight: '600'
          }}>Logout</button>
        </nav>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem' }}>
          <div style={{
            background: '#FEE2E2',
            color: '#DC2626',
            padding: '1rem',
            borderRadius: '8px',
            marginBottom: '1rem'
          }}>{error}</div>
          <button onClick={loadData} style={{
            padding: '1.5rem',
            background: '#10B981',
            color: 'white',
            borderRadius: '12px',
            border: 'none',
            cursor: 'pointer',
            fontWeight: 'bold',
            fontSize: '1.25rem'
          }}>Try Again</button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', background: '#F9FAFB' }}>
      <nav style={{
        background: 'white',
        padding: '1rem 2rem',
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        position: 'sticky',
        top: 0,
        zIndex: 100
      }}>
        <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#10B981' }}>💰 FlipCash</div>
        <button onClick={handleLogout} style={{
          padding: '0.5rem 1.5rem',
          background: '#EF4444',
          color: 'white',
          borderRadius: '8px',
          border: 'none',
          cursor: 'pointer',
          fontWeight: '600'
        }}>Logout</button>
      </nav>

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem' }}>
        <h1 style={{ color: '#1F2937', fontSize: '2rem', marginBottom: '2rem' }}>Dashboard</h1>
        
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '1rem',
          margin: '2rem 0'
        }}>
          {wallets && wallets.length > 0 ? (
            wallets.map((w, i) => (
              <div key={w.currency || i} style={{
                background: 'white',
                padding: '2rem',
                borderRadius: '12px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
              }}>
                <h3 style={{
                  color: '#6B7280',
                  marginBottom: '0.5rem',
                  fontSize: '0.875rem',
                  textTransform: 'uppercase'
                }}>{w.currency || 'Unknown'}</h3>
                <p style={{
                  fontSize: '2rem',
                  fontWeight: 'bold',
                  color: '#10B981'
                }}>{(w.balance || 0).toFixed(2)}</p>
              </div>
            ))
          ) : (
            <div style={{
              background: 'white',
              padding: '2rem',
              borderRadius: '12px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
            }}>
              <p>No wallets found</p>
            </div>
          )}
        </div>

        {rates && (
          <div style={{
            background: 'white',
            padding: '1.5rem',
            borderRadius: '12px',
            margin: '2rem 0',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
          }}>
            <h3 style={{ color: '#1F2937', marginBottom: '1rem', fontSize: '1.25rem' }}>
              Exchange Rates
            </h3>
            <p style={{ color: '#6B7280', margin: '0.5rem 0', fontSize: '1rem' }}>
              1 NGN = {rates.ngnToKsh || '0.00'} KSH
            </p>
            <p style={{ color: '#6B7280', margin: '0.5rem 0', fontSize: '1rem' }}>
              1 KSH = {rates.kshToNgn || '0.00'} NGN
            </p>
          </div>
        )}

        <div style={{
          display: 'flex',
          gap: '1rem',
          margin: '2rem 0',
          flexWrap: 'wrap'
        }}>
          <Link to="/swap" style={{
            flex: 1,
            padding: '1.5rem',
            background: '#10B981',
            color: 'white',
            borderRadius: '12px',
            textAlign: 'center',
            fontWeight: 'bold',
            fontSize: '1.25rem',
            minWidth: '200px',
            textDecoration: 'none'
          }}>💱 Swap</Link>
          <Link to="/withdraw" style={{
            flex: 1,
            padding: '1.5rem',
            background: '#10B981',
            color: 'white',
            borderRadius: '12px',
            textAlign: 'center',
            fontWeight: 'bold',
            fontSize: '1.25rem',
            minWidth: '200px',
            textDecoration: 'none'
          }}>💸 Withdraw</Link>
          <Link to="/history" style={{
            flex: 1,
            padding: '1.5rem',
            background: '#10B981',
            color: 'white',
            borderRadius: '12px',
            textAlign: 'center',
            fontWeight: 'bold',
            fontSize: '1.25rem',
            minWidth: '200px',
            textDecoration: 'none'
          }}>📊 History</Link>
        </div>
      </div>
    </div>
  );
}
