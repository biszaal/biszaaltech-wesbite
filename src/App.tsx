import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfService from './pages/TermsOfService';
import Games from './pages/Games';
import LudoLanding from './pages/LudoLanding';
import CascadeLanding from './pages/CascadeLanding';
import InvertalkLanding from './pages/InvertalkLanding';
import InvertalkPrivacy from './pages/InvertalkPrivacy';
import Projects from './pages/Projects';
import GamePrivacyPolicy from './pages/GamePrivacyPolicy';
import GameDeleteAccount from './pages/GameDeleteAccount';
import HelicopterDeleteData from './pages/HelicopterDeleteData';
import ITrackHabitPrivacy from './pages/ITrackHabitPrivacy';
import ExpenzezPrivacy from './pages/ExpenzezPrivacy';
import NotFound from './pages/NotFound';
import SiteNav from './components/SiteNav';
import Footer from './components/Footer';
import ScrollToHash from './components/ScrollToHash';
import './App.css';

function App() {
  return (
    <Router>
      <ScrollToHash />
      <div className="App">
        <a href="#main" className="skip-link">Skip to content</a>
        <SiteNav />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/terms" element={<TermsOfService />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/games" element={<Games />} />
          {/* Ad landing page — the link used in the Instagram campaign. */}
          <Route path="/games/ludo" element={<LudoLanding />} />
          {/* Game page and App Store support URL for Cascade. */}
          <Route path="/games/cascade" element={<CascadeLanding />} />
          {/* Game page and store support URL for Invertalk (not on a store yet). */}
          <Route path="/games/invertalk" element={<InvertalkLanding />} />
          <Route
            path="/games/helicopter/privacy"
            element={
              <GamePrivacyPolicy
                gameName="Helicopter Game"
                storeName="Helicopter Game: Cave Edition"
                dataPractices="online-leaderboard"
                deleteAccountPath="/games/helicopter/delete-account"
                lastUpdated="November 20, 2026"
              />
            }
          />
          <Route path="/games/helicopter/delete-account" element={<HelicopterDeleteData />} />
          <Route
            path="/games/ludo/privacy"
            element={
              <GamePrivacyPolicy
                gameName="Ludo Game"
                dataPractices="online-multiplayer"
                hasAds
                hasInAppPurchases
                hasPushNotifications
                hasCountryFlags
                hasReferrals
                hasInstallAttribution
                deleteAccountPath="/games/ludo/delete-account"
                lastUpdated="November 21, 2026"
              />
            }
          />
          <Route
            path="/games/ludo/delete-account"
            element={
              <GameDeleteAccount
                gameName="Ludo Game"
                storeName="Ludo Classic: Board Game"
                bundleId="com.biszaal.mobile"
              />
            }
          />
          <Route
            path="/games/cascade/privacy"
            element={
              <GamePrivacyPolicy
                gameName="Cascade"
                storeName="Cascade: Colour Sorting"
                dataPractices="online-sync"
                hasLocalReminders
                contactEmail="biszaalgames@gmail.com"
                lastUpdated="November 19, 2026"
              />
            }
          />
          {/* Invertalk's practices (on-device audio, anonymous analytics) don't fit GamePrivacyPolicy's variants. */}
          <Route path="/games/invertalk/privacy" element={<InvertalkPrivacy />} />
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
