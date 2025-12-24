import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Landing.css';

export default function Landing() {
  return (
    <div className="landing">
      <nav className="nav">
        <div className="container">
          <div className="logo">💰 FlipCash</div>
          <div>
            <Link to="/login" className="btn-sec">Login</Link>
            <Link to="/register" className="btn-pri">Get Started</Link>
          </div>
        </div>
      </nav>

      <section className="hero">
        <h1>Exchange Currency Between Nigeria & Kenya Instantly</h1>
        <p>Fast, secure, and reliable currency conversion. No hidden fees.</p>
        
        <div className="apps">
          <a href="https://apps.apple.com" className="app-btn" target="_blank" rel="noopener noreferrer">
            <span className="icon">🍎</span>
            <div>
              <small>Download on the</small>
              <strong>App Store</strong>
            </div>
          </a>
          <a href="https://play.google.com" className="app-btn" target="_blank" rel="noopener noreferrer">
            <span className="icon">📱</span>
            <div>
              <small>Get it on</small>
              <strong>Google Play</strong>
            </div>
          </a>
        </div>
      </section>

      <section className="features">
        <h2>Why Choose FlipCash?</h2>
        <div className="grid">
          <div className="card"><span>⚡</span><h3>Instant</h3><p>Exchange instantly</p></div>
          <div className="card"><span>🔒</span><h3>Secure</h3><p>Bank-level security</p></div>
          <div className="card"><span>💰</span><h3>Best Rates</h3><p>Transparent pricing</p></div>
          <div className="card"><span>📱</span><h3>Mobile</h3><p>iOS & Android</p></div>
          <div className="card"><span>🌍</span><h3>NG & KE</h3><p>NGN & KSH support</p></div>
          <div className="card"><span>🎯</span><h3>24/7</h3><p>Always here</p></div>
        </div>
      </section>

      <section className="cta">
        <h2>Ready to Get Started?</h2>
        <p>Join thousands of users who trust FlipCash.</p>
        <div>
          <Link to="/register" className="btn-lg">Create Account</Link>
          <Link to="/login" className="btn-lg-out">Login</Link>
        </div>
      </section>

      <footer>
        <p>© 2025 FlipCash. All rights reserved.</p>
      </footer>
    </div>
  );
}
