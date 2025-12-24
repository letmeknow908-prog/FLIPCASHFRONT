import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const [wallets, setWallets] = useState([
    { currency: 'NGN', balance: 0 },
    { currency: 'KSH', balance: 0 }
  ]);
  const [rates] = useState({ ngnToKsh: 0.18, kshToNgn: 5.5 });
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Simulate loading
    setTimeout(() => {
      setLoading(false);
      console.log('Dashboard loaded successfully!');
    }, 1000);
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  if (loading) {
    return React.createElement('div', {
      style: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        fontSize: '1.5rem',
        color: '#10B981',
        background: '#F9FAFB'
      }
    }, 'Loading...');
  }

  return React.createElement('div', {
    style: {
      minHeight: '100vh',
      background: '#F9FAFB',
      paddingTop: '80px'
    }
  }, [
    // Navigation
    React.createElement('nav', {
      key: 'nav',
      style: {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        background: 'white',
        padding: '1rem',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        zIndex: 1000,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }
    }, [
      React.createElement('div', {
        key: 'logo',
        style: {
          fontSize: '1.5rem',
          fontWeight: 'bold',
          color: '#10B981'
        }
      }, '💰 FlipCash'),
      React.createElement('button', {
        key: 'logout',
        onClick: handleLogout,
        style: {
          padding: '0.5rem 1.5rem',
          background: '#EF4444',
          color: 'white',
          border: 'none',
          borderRadius: '8px',
          cursor: 'pointer',
          fontWeight: '600',
          fontSize: '0.9rem'
        }
      }, 'Logout')
    ]),

    // Main Content
    React.createElement('div', {
      key: 'content',
      style: {
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '2rem 1rem'
      }
    }, [
      // Title
      React.createElement('h1', {
        key: 'title',
        style: {
          color: '#1F2937',
          fontSize: '2rem',
          marginBottom: '2rem',
          fontWeight: 'bold'
        }
      }, 'Dashboard'),

      // Wallets
      React.createElement('div', {
        key: 'wallets',
        style: {
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '1rem',
          marginBottom: '2rem'
        }
      }, wallets.map((wallet, i) => 
        React.createElement('div', {
          key: i,
          style: {
            background: 'white',
            padding: '2rem',
            borderRadius: '12px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
          }
        }, [
          React.createElement('h3', {
            key: 'currency',
            style: {
              color: '#6B7280',
              fontSize: '0.875rem',
              marginBottom: '0.5rem',
              textTransform: 'uppercase',
              fontWeight: '600'
            }
          }, wallet.currency),
          React.createElement('p', {
            key: 'balance',
            style: {
              fontSize: '2.5rem',
              fontWeight: 'bold',
              color: '#10B981',
              margin: 0
            }
          }, wallet.balance.toFixed(2))
        ])
      )),

      // Exchange Rates
      React.createElement('div', {
        key: 'rates',
        style: {
          background: 'white',
          padding: '1.5rem',
          borderRadius: '12px',
          marginBottom: '2rem',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
        }
      }, [
        React.createElement('h3', {
          key: 'rates-title',
          style: {
            color: '#1F2937',
            fontSize: '1.25rem',
            marginBottom: '1rem',
            fontWeight: 'bold'
          }
        }, 'Exchange Rates'),
        React.createElement('p', {
          key: 'rate1',
          style: {
            color: '#6B7280',
            fontSize: '1rem',
            margin: '0.5rem 0'
          }
        }, `1 NGN = ${rates.ngnToKsh} KSH`),
        React.createElement('p', {
          key: 'rate2',
          style: {
            color: '#6B7280',
            fontSize: '1rem',
            margin: '0.5rem 0'
          }
        }, `1 KSH = ${rates.kshToNgn} NGN`)
      ]),

      // Action Buttons
      React.createElement('div', {
        key: 'actions',
        style: {
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '1rem'
        }
      }, [
        React.createElement('button', {
          key: 'swap',
          onClick: () => navigate('/swap'),
          style: {
            padding: '1.5rem',
            background: '#10B981',
            color: 'white',
            border: 'none',
            borderRadius: '12px',
            fontSize: '1.25rem',
            fontWeight: 'bold',
            cursor: 'pointer',
            boxShadow: '0 4px 12px rgba(16,185,129,0.3)'
          }
        }, '💱 Swap'),
        React.createElement('button', {
          key: 'withdraw',
          onClick: () => navigate('/withdraw'),
          style: {
            padding: '1.5rem',
            background: '#10B981',
            color: 'white',
            border: 'none',
            borderRadius: '12px',
            fontSize: '1.25rem',
            fontWeight: 'bold',
            cursor: 'pointer',
            boxShadow: '0 4px 12px rgba(16,185,129,0.3)'
          }
        }, '💸 Withdraw'),
        React.createElement('button', {
          key: 'history',
          onClick: () => navigate('/history'),
          style: {
            padding: '1.5rem',
            background: '#10B981',
            color: 'white',
            border: 'none',
            borderRadius: '12px',
            fontSize: '1.25rem',
            fontWeight: 'bold',
            cursor: 'pointer',
            boxShadow: '0 4px 12px rgba(16,185,129,0.3)'
          }
        }, '📊 History')
      ])
    ])
  ]);
}
