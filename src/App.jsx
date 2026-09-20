import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import LoadingFallback from './components/LoadingFallback';
import Notfound from './pages/Notfound';
import Footer from './components/Footer';

// Lazy loaded route components
const Projects = lazy(() => import('./components/Projects'));
const Contact = lazy(() => import('./components/Contact'));
const Login = lazy(() => import('./components/Login'));
const Register = lazy(() => import('./components/Register'));

function App() {
  return (
    <div id="top">
      <Navbar />
      <div className="page-shell">
        <Suspense fallback={<LoadingFallback />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="*" element={<Notfound />} />
          </Routes>
        </Suspense>

        <Footer email="arorarutvi32@email.com" />
      </div>
    </div>
  );
}

export default App;