import React, { useState, useEffect } from 'react';
import PrimaryTabNav from '../../components/navigation/PrimaryTabNav';
import AnalysisProgressIndicator from '../../components/navigation/AnalysisProgressIndicator';
import QuickActionToolbar from '../../components/navigation/QuickActionToolbar';
import AchievementNotificationSystem from '../../components/navigation/AchievementNotificationSystem';
import MessageTypeSelector from './components/MessageTypeSelector';
import FlagshipScenario from './components/FlagshipScenario';
import MessageInputArea from './components/MessageInputArea';
import AnalysisProgress from './components/AnalysisProgress';
import QuickAnalysisResults from './components/QuickAnalysisResults';
import SampleScenarioLibrary from './components/SampleScenarioLibrary';

const MessageAnalysis = () => {
  const [selectedType, setSelectedType] = useState('email');
  const [messageContent, setMessageContent] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisPhase, setAnalysisPhase] = useState('parsing');
  const [analysisResults, setAnalysisResults] = useState(null);

  const mockAnalysisResults = {
    riskLevel: 'High',
    riskScore: 87,
    quickAssessment: 'This message exhibits multiple characteristics of a phishing attempt, including urgent language, suspicious links, requests for sensitive information, and impersonation of authority figures. We strongly recommend not interacting with this message.',
    keyIndicators: [
      {
        severity: 'high',
        title: 'Suspicious Domain',
        description: 'The link points to "college-verify-portal.suspicious-domain.com" which is not affiliated with your institution'
      },
      {
        severity: 'high',
        title: 'Urgency Tactics',
        description: 'Creates artificial time pressure with "24 hours" deadline to bypass rational decision-making'
      },
      {
        severity: 'high',
        title: 'Credential Request',
        description: 'Asks for password and personal information, which legitimate institutions never request via email'
      },
      {
        severity: 'medium',
        title: 'Authority Impersonation',
        description: 'Claims to be from "IT Security Department" to establish false credibility'
      }
    ],
    recommendedActions: [
      'Do not click any links or provide any information',
      'Report this message to your college IT security team',
      'Delete the message from your inbox',
      'Verify account status by logging in directly through official college website',
      'Enable two-factor authentication on your college account if not already active'
    ]
  };

  const handleLoadSample = (scenario) => {
    setSelectedType(scenario?.type);
    setMessageContent(scenario?.content);
    setAnalysisResults(null);
    
    window.scrollTo({
      top: document.querySelector('.message-input-section')?.offsetTop - 100 || 0,
      behavior: 'smooth'
    });
  };

  const handleAnalyze = () => {
    if (!messageContent?.trim()) return;

    setIsAnalyzing(true);
    setAnalysisResults(null);
    setAnalysisPhase('parsing');

    const phases = ['parsing', 'technical', 'psychology', 'scoring'];
    let currentPhaseIndex = 0;

    const phaseInterval = setInterval(() => {
      currentPhaseIndex++;
      if (currentPhaseIndex < phases?.length) {
        setAnalysisPhase(phases?.[currentPhaseIndex]);
      } else {
        clearInterval(phaseInterval);
        setTimeout(() => {
          setIsAnalyzing(false);
          setAnalysisResults(mockAnalysisResults);
          
          window.dispatchEvent(new CustomEvent('achievement-unlocked', {
            detail: {
              title: 'First Analysis Complete!',
              description: 'You\'ve successfully analyzed your first suspicious message',
              icon: 'Award',
              points: 50
            }
          }));

          window.scrollTo({
            top: document.querySelector('.analysis-results-section')?.offsetTop - 100 || 0,
            behavior: 'smooth'
          });
        }, 500);
      }
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-background">
      <PrimaryTabNav />
      <AnalysisProgressIndicator currentStep={1} />
      <AchievementNotificationSystem />
      <QuickActionToolbar />

      <main className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-6 md:py-8 lg:py-10">
        <div className="mb-6 md:mb-8">
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-2 md:mb-3">
            Message Analysis
          </h1>
          <p className="text-sm md:text-base text-muted-foreground">
            Analyze suspicious messages to identify potential threats and learn how to protect yourself from digital scams
          </p>
        </div>

        <div className="space-y-6 md:space-y-8">
          <FlagshipScenario onLoadSample={handleLoadSample} />

          <div className="message-input-section">
            <MessageTypeSelector 
              selectedType={selectedType} 
              onTypeChange={setSelectedType} 
            />
          </div>

          <div className="message-input-section">
            <MessageInputArea
              messageType={selectedType}
              messageContent={messageContent}
              onContentChange={setMessageContent}
              onAnalyze={handleAnalyze}
              isAnalyzing={isAnalyzing}
            />
          </div>

          {isAnalyzing && (
            <div className="analysis-progress-section">
              <AnalysisProgress currentPhase={analysisPhase} />
            </div>
          )}

          {analysisResults && !isAnalyzing && (
            <div className="analysis-results-section">
              <QuickAnalysisResults results={analysisResults} />
            </div>
          )}

          <SampleScenarioLibrary onLoadSample={handleLoadSample} />
        </div>

        <div className="mt-8 md:mt-10 p-4 md:p-6 bg-card border-2 border-border rounded-xl">
          <div className="flex items-start gap-3 md:gap-4">
            <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-secondary/20 flex items-center justify-center flex-shrink-0">
              <svg className="w-5 h-5 md:w-6 md:h-6 text-secondary" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-base md:text-lg font-semibold text-foreground mb-2">
                Privacy & Security Notice
              </h3>
              <p className="text-sm text-muted-foreground">
                All message analysis is performed locally in your browser. We do not store, transmit, or share any message content you analyze. Your privacy and security are our top priorities.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default MessageAnalysis;