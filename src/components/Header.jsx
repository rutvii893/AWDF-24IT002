function Header({ name, themeColor }) {
  return (
    <header
      className="hero"
      style={{ background: `linear-gradient(135deg, ${themeColor} 0%, #111827 100%)` }}
    >
      <div className="hero-content">
        <span className="hero-badge">🎓 B.Tech Information Technology</span>
        <h1>{name}</h1>
        <p>
          Software developer passionate about AI, full-stack web development, and building innovative solutions.
          Experienced with React, Node.js, FastAPI, and modern AI technologies.
        </p>
        <div className="hero-actions">
          <a href="/projects" className="btn btn-primary">
            View Tasks & Projects
          </a>
          <a href="#about" className="btn btn-secondary">
            About Me
          </a>
        </div>
      </div>
    </header>
  );
}

export default Header;