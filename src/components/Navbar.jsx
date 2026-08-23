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
          <button onClick={handleLogout} style={{ background: 'transparent', border: 'none', color: 'inherit', cursor: 'pointer', padding: '0 10px', fontSize: '1rem', textDecoration: 'underline' }}>
            Logout
          </button>
        ) : (
          <NavLink to="/login">Login</NavLink>
        )}
      </div>
    </nav>
  );
}

export default Navbar;