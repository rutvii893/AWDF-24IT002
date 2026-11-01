function Footer({ email }) {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div>
          <p>📧 <a href={`mailto:${email}`}>{email}</a></p>
          <p>🎓 CHARUSAT University | B.Tech Information Technology</p>
        </div>
        <p>© 2026 Rutvi Arora. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;