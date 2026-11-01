import { useState, useEffect } from 'react';
import Spinner from './Spinner';
import ErrorMessage from './ErrorMessage';

function Projects() {
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState('');

  const fetchRepos = () => {
    setLoading(true);
    setError(null);
    
    fetch('https://api.github.com/users/rutvii893/repos')
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch data');
        return res.json();
      })
      .then((data) => setRepos(data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchRepos();
  }, []);

  const filteredRepos = repos.filter(repo => 
    repo.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <section id="projects" className="section">
      <div className="section-heading">
        <span className="section-label">Projects</span>
        <h2>Selected work</h2>
      </div>

      <input 
        type="text" 
        placeholder="Search projects..." 
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{ width: '100%', padding: '10px', marginBottom: '30px', borderRadius: '4px', border: '1px solid #ccc' }}
      />

      {loading && <Spinner />}
      {error && <ErrorMessage message={error} onRetry={fetchRepos} />}

      {!loading && !error && (
        <div className="project-grid">
          {filteredRepos.map((repo) => (
            <article className="project-card" key={repo.id}>
              <h3>{repo.name}</h3>
              <p>{repo.description || 'No description provided.'}</p>
              <div className="project-tags">
                <span>⭐ {repo.stargazers_count} Stars</span>
                {repo.language && <span>{repo.language}</span>}
              </div>
              <a className="project-link" href={repo.html_url} target="_blank" rel="noreferrer">
                View on GitHub
              </a>
            </article>
          ))}
        </div>
      )}
      {!loading && !error && filteredRepos.length === 0 && (
        <p>No projects found.</p>
      )}
    </section>
  );
}

export default Projects;