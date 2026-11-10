import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import BootLoader from './components/BootLoader';
import ScrollProgressTop from './components/ScrollProgressTop';
import Home from './pages/Home';
import Projects from './pages/Projects';
import Certificates from './pages/Certificates';

function App() {
  return (
    <Router>
      <BootLoader />
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
