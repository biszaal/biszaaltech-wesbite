import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfService from './pages/TermsOfService';
import Games from './pages/Games';
import HelicopterPage from './pages/HelicopterPage';
import GamePrivacyPolicy from './pages/GamePrivacyPolicy';
import SiteNav from './components/SiteNav';
import Footer from './components/Footer';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <a href="#main" className="skip-link">Skip to content</a>
        <SiteNav />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/terms" element={<TermsOfService />} />
          <Route path="/games" element={<Games />} />
          <Route path="/games/helicopter" element={<HelicopterPage />} />
          <Route
            path="/games/helicopter/privacy"
            element={<GamePrivacyPolicy gameName="Helicopter Game" dataPractices="local-only" />}
          />
          <Route
            path="/games/ludo/privacy"
            element={<GamePrivacyPolicy gameName="Ludo Game" dataPractices="online-multiplayer" />}
          />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
