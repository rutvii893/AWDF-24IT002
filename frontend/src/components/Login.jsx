import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    
    try {
      const response = await fetch('http://localhost:5000/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      const data = await response.json();

      if (response.ok && data.success) {
        localStorage.setItem('token', data.token);
        alert('Login successful!');
        navigate('/projects');
        window.location.reload(); // Quick way to update Navbar state
      } else {
        setError(data.message || 'Login failed');
      }
    } catch (err) {
      setError('Server error');
    }
  };

  return (
    <div style={{ 
      maxWidth: '420px', 
      margin: '60px auto', 
      padding: '36px', 
      background: 'var(--bg-card)', 
      border: '1px solid var(--border-subtle)', 
      borderRadius: 'var(--radius-lg)',
      boxShadow: 'var(--shadow-card)',
      backdropFilter: 'blur(16px)'
    }}>
      <h2 style={{ 
        fontSize: '1.8rem', 
        fontFamily: 'var(--font-sans)', 
        marginBottom: '20px', 
        textAlign: 'center',
        background: 'var(--accent-gradient)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent'
      }}>
        Welcome Back
      </h2>
      {error && (
        <div style={{
          padding: '10px 14px',
          background: 'rgba(239, 68, 68, 0.12)',
          border: '1px solid rgba(239, 68, 68, 0.3)',
          borderRadius: 'var(--radius-sm)',
          color: '#f87171',
          fontSize: '0.9rem',
          marginBottom: '18px',
          textAlign: 'center'
        }}>
          {error}
        </div>
      )}
      <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <input 
          type="email" 
          placeholder="Email address" 
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input 
          type="password" 
          placeholder="Password" 
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button 
          type="submit" 
          className="btn btn-primary"
          style={{ width: '100%', marginTop: '8px' }}
        >
          Sign In
        </button>
      </form>
      <p style={{ marginTop: '22px', textAlign: 'center', fontSize: '0.95rem', color: 'var(--text-muted)' }}>
        Don't have an account? <Link to="/register" style={{ color: '#818cf8', fontWeight: 600 }}>Register here</Link>
      </p>
    </div>
  );
}

export default Login;
