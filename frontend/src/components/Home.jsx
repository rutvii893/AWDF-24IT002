import Header from './Header';
import About from './About';
import Skills from './Skills';

function Home() {
  const skillsByCategory = {
    languages: ['C++', 'Java', 'JavaScript', 'Python', 'PHP'],
    frontend: ['React.js', 'HTML5', 'CSS3', 'Tailwind CSS', 'Vite'],
    backend: ['Node.js', 'Express.js', 'FastAPI', 'Python'],
    database: ['MySQL'],
    ai: ['Google Gemini API', 'LangChain', 'FAISS', 'OpenAI'],
    tools: ['Git & GitHub', 'VS Code'],
  };

  return (
    <>
      <Header name="Rutvi Arora" themeColor="#2563eb" />
      <main>
        <About />
        <Skills skillsByCategory={skillsByCategory} />
      </main>
    </>
  );
}

export default Home;
