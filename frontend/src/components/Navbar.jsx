import { NavLink, useNavigate } from 'react-router-dom';

function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const links = [
    { to: '/', label: 'Home' },
    { to: '/projects', label: 'Projects' },
    { to: '/contact', label: 'Contact' },
  ];

  return (
    <nav className="top-nav" aria-label="Main navigation">
      <NavLink className="brand-mark" to="/">
        RA
      </NavLink>
      <div className="nav-links">
        {links.map((link) => (
          <NavLink key={link.label} to={link.to}>
            {link.label}
          </NavLink>
        ))}
        {token ? (
          <button 
            onClick={handleLogout} 
            className="btn"
            style={{ 
              background: 'rgba(239, 68, 68, 0.15)', 
              color: '#f87171', 
              border: '1px solid rgba(239, 68, 68, 0.3)',
              padding: '6px 14px', 
              fontSize: '0.9rem',
              borderRadius: '8px'
            }}
          >
            Logout
          </button>
        ) : (
          <NavLink to="/login" style={{
            background: 'var(--accent-gradient)',
            color: '#fff',
            fontWeight: 600,
            borderRadius: '8px'
          }}>
            Login
          </NavLink>
        )}
      </div>
    </nav>
  );
}

export default Navbar;