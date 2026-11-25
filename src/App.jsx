import { useEffect, lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollProgressTop from './components/ScrollProgressTop';
import SmoothScroll from './components/SmoothScroll';
import CyberBackground from './components/CyberBackground';
import SeoManager from './components/SeoManager';
import { markBootComplete } from './lib/boot';

const Home = lazy(() => import('./pages/Home'));
const Projects = lazy(() => import('./pages/Projects'));
const Certificates = lazy(() => import('./pages/Certificates'));

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

function RouteFallback() {
  return (
    <div
      role="status"
      aria-live="polite"
      className="min-h-[85vh] flex items-center justify-center px-6"
    >
      <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-[#0b101b]/90 border border-[#00bfff]/25 text-xs font-mono uppercase tracking-widest text-[#00bfff]">
        <span className="w-2 h-2 rounded-full bg-[#00bfff] animate-ping" />
        <span>Loading Interface...</span>
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <SeoManager />
      <SmoothScroll />
      <RouteBootSync />
      <CyberBackground />
      <Navbar />
      <Suspense fallback={<RouteFallback />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/certificates" element={<Certificates />} />
        </Routes>
      </Suspense>
      <ScrollProgressTop />
      <Footer />
    </Router>
  );
}

export default App;
