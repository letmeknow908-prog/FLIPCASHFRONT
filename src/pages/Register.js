import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { apiService } from '../services/api';
import '../styles/Auth.css';

export default function Register() {
  const [form, setForm] = useState({ firstName: '', lastName: '', email: '', phone: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await apiService.register(form);
      alert('Account created! Please login.');
      navigate('/login');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-box">
        <h1>💰 FlipCash</h1>
        <h2>Create Account</h2>
        {error && <div className="error">{error}</div>}
        <form onSubmit={handleSubmit}>
          <input placeholder="First Name" value={form.firstName} onChange={e => setForm({...form, firstName: e.target.value})} required />
          <input placeholder="Last Name" value={form.lastName} onChange={e => setForm({...form, lastName: e.target.value})} required />
          <input type="email" placeholder="Email" value={form.email} onChange={e => setForm({...form, email: e.target.value})} required />
          <input placeholder="Phone" value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} required />
          <input type="password" placeholder="Password" value={form.password} onChange={e => setForm({...form, password: e.target.value})} required />
          <button type="submit" disabled={loading}>
            {loading ? 'Creating...' : 'Create Account'}
          </button>
        </form>
        <p>Have an account? <Link to="/login">Login</Link></p>
        <Link to="/" className="back">← Back to Home</Link>
      </div>
    </div>
  );
}
