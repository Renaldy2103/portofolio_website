import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollProgressTop from './components/ScrollProgressTop';
import SmoothScroll from './components/SmoothScroll';
import CyberBackground from './components/CyberBackground';
import Home from './pages/Home';
import Projects from './pages/Projects';
import Certificates from './pages/Certificates';
import { markBootComplete } from './lib/boot';

function RouteBootSync() {
  const { pathname } = useLocation();

  useEffect(() => {
    // On subpages without the home InkSplash bootloader, release hero headings immediately
    if (pathname !== '/') {
      markBootComplete();
    }
  }, [pathname]);

  return null;
}

function App() {
  return (
    <Router>
      <SmoothScroll />
      <RouteBootSync />
      <CyberBackground />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/certificates" element={<Certificates />} />
      </Routes>
      <ScrollProgressTop />
      <Footer />
    </Router>
  );
}

export default App;
