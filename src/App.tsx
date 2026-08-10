import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfService from './pages/TermsOfService';
import Games from './pages/Games';
import GamePrivacyPolicy from './pages/GamePrivacyPolicy';
import ITrackHabitPrivacy from './pages/ITrackHabitPrivacy';
import NotFound from './pages/NotFound';
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
          <Route
            path="/games/helicopter/privacy"
            element={<GamePrivacyPolicy gameName="Helicopter Game" dataPractices="local-only" />}
          />
          <Route
            path="/games/ludo/privacy"
            element={<GamePrivacyPolicy gameName="Ludo Game" dataPractices="online-multiplayer" hasAds hasInAppPurchases />}
          />
          {/* App store listings link to /apps/…; the short path is kept as an alias. */}
          <Route path="/apps/itrackhabit/privacy" element={<ITrackHabitPrivacy />} />
          <Route path="/itrackhabit/privacy" element={<ITrackHabitPrivacy />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
