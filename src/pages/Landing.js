import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Landing() {
  const navigate = useNavigate();

  return React.createElement('div', {
    style: {
      minHeight: '100vh',
      background: '#F9FAFB'
    }
  }, [
    // Fixed Navigation - NO OVERLAP
    React.createElement('nav', {
      key: 'nav',
      style: {
        position: 'sticky',
        top: 0,
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
      React.createElement('div', {
        key: 'buttons',
        style: {
          display: 'flex',
          gap: '0.5rem'
        }
      }, [
        React.createElement('button', {
          key: 'login',
          onClick: () => navigate('/login'),
          style: {
            padding: '0.5rem 1rem',
            border: '2px solid #10B981',
            background: 'transparent',
            color: '#10B981',
            borderRadius: '8px',
            fontWeight: '600',
            cursor: 'pointer',
            fontSize: '0.9rem'
          }
        }, 'Login'),
        React.createElement('button', {
          key: 'register',
          onClick: () => navigate('/register'),
          style: {
            padding: '0.5rem 1rem',
            background: '#10B981',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            fontWeight: '600',
            cursor: 'pointer',
            fontSize: '0.9rem'
          }
        }, 'Get Started')
      ])
    ]),

    // Hero Section
    React.createElement('section', {
      key: 'hero',
      style: {
        background: 'linear-gradient(135deg, #10B981, #059669)',
        color: 'white',
        padding: '4rem 1rem',
        textAlign: 'center',
        minHeight: '80vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
      }
    }, [
      React.createElement('h1', {
        key: 'title',
        style: {
          fontSize: 'clamp(2rem, 5vw, 3.5rem)',
          fontWeight: '800',
          marginBottom: '1.5rem',
          lineHeight: '1.2'
        }
      }, 'Exchange Currency Between Nigeria & Kenya Instantly'),
      React.createElement('p', {
        key: 'subtitle',
        style: {
          fontSize: 'clamp(1rem, 3vw, 1.5rem)',
          marginBottom: '3rem',
          maxWidth: '800px'
        }
      }, 'Fast, secure, and reliable currency conversion. No hidden fees.'),
      
      // App Store Buttons
      React.createElement('div', {
        key: 'apps',
        style: {
          display: 'flex',
          gap: '1rem',
          flexWrap: 'wrap',
          justifyContent: 'center'
        }
      }, [
        React.createElement('a', {
          key: 'appstore',
          href: 'https://apps.apple.com',
          target: '_blank',
          rel: 'noopener noreferrer',
          style: {
            display: 'flex',
            alignItems: 'center',
            gap: '1rem',
            background: 'white',
            color: '#1F2937',
            padding: '1rem 2rem',
            borderRadius: '12px',
            textDecoration: 'none',
            boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
          }
        }, [
          React.createElement('span', {
            key: 'icon',
            style: { fontSize: '2.5rem' }
          }, '🍎'),
          React.createElement('div', { key: 'text' }, [
            React.createElement('div', {
              key: 'label',
              style: {
                fontSize: '0.75rem',
                color: '#6B7280'
              }
            }, 'Download on the'),
            React.createElement('div', {
              key: 'name',
              style: {
                fontSize: '1.25rem',
                fontWeight: 'bold'
              }
            }, 'App Store')
          ])
        ]),
        React.createElement('a', {
          key: 'playstore',
          href: 'https://play.google.com',
          target: '_blank',
          rel: 'noopener noreferrer',
          style: {
            display: 'flex',
            alignItems: 'center',
            gap: '1rem',
            background: 'white',
            color: '#1F2937',
            padding: '1rem 2rem',
            borderRadius: '12px',
            textDecoration: 'none',
            boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
          }
        }, [
          React.createElement('span', {
            key: 'icon',
            style: { fontSize: '2.5rem' }
          }, '📱'),
          React.createElement('div', { key: 'text' }, [
            React.createElement('div', {
              key: 'label',
              style: {
                fontSize: '0.75rem',
                color: '#6B7280'
              }
            }, 'Get it on'),
            React.createElement('div', {
              key: 'name',
              style: {
                fontSize: '1.25rem',
                fontWeight: 'bold'
              }
            }, 'Google Play')
          ])
        ])
      ])
    ]),

    // Features Section
    React.createElement('section', {
      key: 'features',
      style: {
        padding: '4rem 1rem',
        background: 'white'
      }
    }, [
      React.createElement('h2', {
        key: 'title',
        style: {
          textAlign: 'center',
          fontSize: '2.5rem',
          fontWeight: '800',
          marginBottom: '3rem',
          color: '#1F2937'
        }
      }, 'Why Choose FlipCash?'),
      React.createElement('div', {
        key: 'grid',
        style: {
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '2rem',
          maxWidth: '1200px',
          margin: '0 auto'
        }
      }, [
        { icon: '⚡', title: 'Instant', desc: 'Exchange instantly' },
        { icon: '🔒', title: 'Secure', desc: 'Bank-level security' },
        { icon: '💰', title: 'Best Rates', desc: 'Transparent pricing' },
        { icon: '📱', title: 'Mobile', desc: 'iOS & Android' },
        { icon: '🌍', title: 'NG & KE', desc: 'NGN & KSH support' },
        { icon: '🎯', title: '24/7', desc: 'Always here' }
      ].map((f, i) => React.createElement('div', {
        key: i,
        style: {
          background: '#F9FAFB',
          padding: '2rem',
          borderRadius: '16px',
          textAlign: 'center'
        }
      }, [
        React.createElement('div', {
          key: 'icon',
          style: { fontSize: '3rem', marginBottom: '1rem' }
        }, f.icon),
        React.createElement('h3', {
          key: 'title',
          style: {
            fontSize: '1.25rem',
            fontWeight: 'bold',
            marginBottom: '0.5rem',
            color: '#1F2937'
          }
        }, f.title),
        React.createElement('p', {
          key: 'desc',
          style: { color: '#6B7280' }
        }, f.desc)
      ])))
    ]),

    // CTA Section
    React.createElement('section', {
      key: 'cta',
      style: {
        background: 'linear-gradient(135deg, #10B981, #059669)',
        color: 'white',
        padding: '4rem 1rem',
        textAlign: 'center'
      }
    }, [
      React.createElement('h2', {
        key: 'title',
        style: {
          fontSize: '2.5rem',
          fontWeight: '800',
          marginBottom: '1rem'
        }
      }, 'Ready to Get Started?'),
      React.createElement('p', {
        key: 'subtitle',
        style: {
          fontSize: '1.25rem',
          marginBottom: '2rem'
        }
      }, 'Join thousands of users who trust FlipCash.'),
      React.createElement('div', {
        key: 'buttons',
        style: {
          display: 'flex',
          gap: '1rem',
          justifyContent: 'center',
          flexWrap: 'wrap'
        }
      }, [
        React.createElement('button', {
          key: 'register',
          onClick: () => navigate('/register'),
          style: {
            padding: '1rem 3rem',
            background: 'white',
            color: '#10B981',
            border: 'none',
            borderRadius: '12px',
            fontWeight: 'bold',
            fontSize: '1.25rem',
            cursor: 'pointer'
          }
        }, 'Create Account'),
        React.createElement('button', {
          key: 'login',
          onClick: () => navigate('/login'),
          style: {
            padding: '1rem 3rem',
            background: 'transparent',
            color: 'white',
            border: '2px solid white',
            borderRadius: '12px',
            fontWeight: 'bold',
            fontSize: '1.25rem',
            cursor: 'pointer'
          }
        }, 'Login')
      ])
    ]),

    // Footer
    React.createElement('footer', {
      key: 'footer',
      style: {
        background: '#1F2937',
        color: 'white',
        padding: '3rem 1rem',
        textAlign: 'center'
      }
    }, [
      React.createElement('div', {
        key: 'logo',
        style: {
          fontSize: '1.5rem',
          fontWeight: 'bold',
          marginBottom: '1rem'
        }
      }, '💰 FlipCash'),
      React.createElement('p', {
        key: 'copyright',
        style: { color: '#9CA3AF' }
      }, '© 2025 FlipCash. All rights reserved.')
    ])
  ]);
}
