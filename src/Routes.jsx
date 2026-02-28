import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import ErrorBoundary from "./components/ErrorBoundary";
import NotFound from "./pages/NotFound";
import MessageAnalysis from './pages/message-analysis';
import Dashboard from './pages/dashboard';
import TechnicalAnalysisResults from './pages/technical-analysis-results';

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your route here */}
        <Route path="/" element={<Dashboard />} />
        <Route path="/message-analysis" element={<MessageAnalysis />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/technical-analysis-results" element={<TechnicalAnalysisResults />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;
