function About() {
  return (
    <section id="about" className="section about-section">
      <div className="section-heading">
        <span className="section-label">About Me</span>
        <h2>Building practical solutions with AI and web technologies</h2>
      </div>

      <div className="about-content">
        <div className="about-main">
          <div className="about-info">
            <h3>Professional Summary</h3>
            <p>
              I'm a B.Tech Information Technology student at CHARUSAT University with a strong passion for software development, artificial intelligence, and full-stack web development. I enjoy building practical applications that solve real-world problems using modern technologies and continuously improve my problem-solving skills through Data Structures and Algorithms practice.
            </p>
          </div>

          <div className="about-info">
            <h3>Education</h3>
            <p><strong>Bachelor of Technology (B.Tech)</strong><br />Information Technology<br />CHARUSAT University</p>
          </div>
        </div>

        <div className="about-card">
          <h3>Areas of Interest</h3>
          <ul>
            <li>Artificial Intelligence &amp; Generative AI</li>
            <li>Full-Stack Web Development</li>
            <li>Data Structures &amp; Algorithms</li>
            <li>Problem Solving</li>
            <li>UI/UX Design</li>
          </ul>
        </div>
      </div>
    </section>
  );
}

export default About;