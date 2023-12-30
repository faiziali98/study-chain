import './App.css';
import React from 'react';
import { AppProvider } from './context/AppContext';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import SurveyPage from './pages/SurveyPage';
import ScorePage from './pages/ScorePage';
import Container from './components/Container';
import VideoTutorialPage from './pages/VideoTutorialPage';
import ApplicationPage from './pages/ApplicationPage';
import HomePage from './pages/HomePage';
import DemoPage from './pages/DemoPage';

// Main component that renders the form with multiple questions
const App = () => {
  return (
    <Container>
      <AppProvider>
        <Router>
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/initial-survey" element={<SurveyPage id="initial"/>} />
              <Route path="/video-tutorial" element={<VideoTutorialPage />} />
              <Route path="/final-survey" element={<SurveyPage id="final"/>} />
              <Route path="/score" element={<ScorePage />} />
              <Route path="/application" element={<ApplicationPage />} />
              <Route path="/homepage" element={<HomePage />} />
              <Route path="/demo" element={<DemoPage />} />
            </Routes>
        </Router>
      </AppProvider>
    </Container>
  );
};

export default App;
