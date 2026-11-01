function Skills({ skillsByCategory }) {
  return (
    <section id="skills" className="section">
      <div className="section-heading">
        <span className="section-label">Technical Skills</span>
        <h2>Tools and technologies I work with</h2>
      </div>

      <div className="skills-by-category">
        {Object.entries(skillsByCategory).map(([category, skills]) => (
          <div key={category} className="skill-category">
            <h4>{category.charAt(0).toUpperCase() + category.slice(1).replace(/([A-Z])/g, ' $1')}</h4>
            <div className="skill-list">
              {skills.map((skill) => (
                <span className="skill-pill" key={skill}>
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Skills;