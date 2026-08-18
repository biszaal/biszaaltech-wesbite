import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfService from './pages/TermsOfService';
import Games from './pages/Games';
import GamePrivacyPolicy from './pages/GamePrivacyPolicy';
import GameDeleteAccount from './pages/GameDeleteAccount';
import ITrackHabitPrivacy from './pages/ITrackHabitPrivacy';
import ExpenzezPrivacy from './pages/ExpenzezPrivacy';
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
            element={
              <GamePrivacyPolicy
                gameName="Ludo Game"
                dataPractices="online-multiplayer"
                hasAds
                hasInAppPurchases
                hasPushNotifications
                deleteAccountPath="/games/ludo/delete-account"
                lastUpdated="August 19, 2026"
              />
            }
          />
          <Route
            path="/games/ludo/delete-account"
            element={
              <GameDeleteAccount
                gameName="Ludo Game"
                storeName="Ludo: Classic Board Game"
                bundleId="com.biszaal.mobile"
              />
            }
          />
          {/* App store listings link to /apps/…; the short path is kept as an alias. */}
          <Route path="/apps/itrackhabit/privacy" element={<ITrackHabitPrivacy />} />
          <Route path="/itrackhabit/privacy" element={<ITrackHabitPrivacy />} />
          <Route path="/apps/expenzez/privacy" element={<ExpenzezPrivacy />} />
          <Route path="/expenzez/privacy" element={<ExpenzezPrivacy />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
