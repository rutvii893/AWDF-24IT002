import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Login from './components/Login';
import Register from './components/Register';
import Notfound from './pages/Notfound';
import Footer from './components/Footer';

function App() {
  return (
    <div id="top">
      <Navbar />
      <div className="page-shell">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<Notfound />} />
        </Routes>

        <Footer email="arorarutvi32@email.com" />
      </div>
    </div>
  );
}

export default App;