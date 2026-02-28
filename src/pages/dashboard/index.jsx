import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PrimaryTabNav from '../../components/navigation/PrimaryTabNav';
import QuickActionToolbar from '../../components/navigation/QuickActionToolbar';
import MetricCard from './components/MetricCard';
import SafetyScoreWidget from './components/SafetyScoreWidget';
import RecentAnalysisCard from './components/RecentAnalysisCard';
import BadgeShowcase from './components/BadgeShowcase';
import QuickAccessToolbar from './components/QuickAccessToolbar';
import MetricDetailModal from './components/MetricDetailModal';

const Dashboard = () => {
  const navigate = useNavigate();
  const [selectedMetric, setSelectedMetric] = useState(null);

  const metrics = [
    {
      id: 'scans',
      label: 'Total Scans',
      value: '247',
      subtitle: 'Messages analyzed',
      change: '+18%',
      trend: 'up',
      icon: 'Search',
      iconColor: 'var(--color-primary)',
      bgColor: 'bg-primary/10',
      progress: 75,
      breakdown: [
        { label: 'Email', value: '142', color: 'var(--color-primary)' },
        { label: 'SMS', value: '68', color: 'var(--color-secondary)' },
        { label: 'Direct Messages', value: '37', color: 'var(--color-accent)' }
      ],
      weeklyData: [
        { day: 'Mon', value: 32 },
        { day: 'Tue', value: 45 },
        { day: 'Wed', value: 38 },
        { day: 'Thu', value: 52 },
        { day: 'Fri', value: 41 },
        { day: 'Sat', value: 23 },
        { day: 'Sun', value: 16 }
      ]
    },
    {
      id: 'threats',
      label: 'Threats Detected',
      value: '89',
      subtitle: 'Potential dangers identified',
      change: '+12%',
      trend: 'up',
      icon: 'ShieldAlert',
      iconColor: 'var(--color-error)',
      bgColor: 'bg-error/10',
      progress: 60,
      breakdown: [
        { label: 'Critical', value: '12', color: 'var(--color-error)' },
        { label: 'High', value: '28', color: 'var(--color-warning)' },
        { label: 'Medium', value: '34', color: 'var(--color-accent)' },
        { label: 'Low', value: '15', color: 'var(--color-success)' }
      ],
      weeklyData: [
        { day: 'Mon', value: 11 },
        { day: 'Tue', value: 15 },
        { day: 'Wed', value: 13 },
        { day: 'Thu', value: 18 },
        { day: 'Fri', value: 14 },
        { day: 'Sat', value: 10 },
        { day: 'Sun', value: 8 }
      ]
    },
    {
      id: 'accuracy',
      label: 'Detection Accuracy',
      value: '94%',
      subtitle: 'Correct threat identification',
      change: '+3%',
      trend: 'up',
      icon: 'Target',
      iconColor: 'var(--color-success)',
      bgColor: 'bg-success/10',
      progress: 94,
      breakdown: [
        { label: 'True Positives', value: '84', color: 'var(--color-success)' },
        { label: 'False Positives', value: '5', color: 'var(--color-warning)' },
        { label: 'Missed Threats', value: '3', color: 'var(--color-error)' }
      ],
      weeklyData: [
        { day: 'Mon', value: 92 },
        { day: 'Tue', value: 95 },
        { day: 'Wed', value: 93 },
        { day: 'Thu', value: 96 },
        { day: 'Fri', value: 94 },
        { day: 'Sat', value: 93 },
        { day: 'Sun', value: 94 }
      ]
    },
    {
      id: 'learning',
      label: 'Learning Progress',
      value: '68%',
      subtitle: 'Course completion',
      change: '+15%',
      trend: 'up',
      icon: 'GraduationCap',
      iconColor: 'var(--color-secondary)',
      bgColor: 'bg-secondary/10',
      progress: 68,
      breakdown: [
        { label: 'Phishing Basics', value: '100%', color: 'var(--color-success)' },
        { label: 'Social Engineering', value: '85%', color: 'var(--color-secondary)' },
        { label: 'Advanced Threats', value: '45%', color: 'var(--color-warning)' },
        { label: 'Incident Response', value: '20%', color: 'var(--color-error)' }
      ],
      weeklyData: [
        { day: 'Mon', value: 53 },
        { day: 'Tue', value: 56 },
        { day: 'Wed', value: 60 },
        { day: 'Thu', value: 63 },
        { day: 'Fri', value: 65 },
        { day: 'Sat', value: 67 },
        { day: 'Sun', value: 68 }
      ]
    }
  ];

  const recentAnalyses = [
    {
      id: 1,
      subject: 'Urgent: College Admin Account Suspension Notice',
      preview: 'Your student account will be suspended within 24 hours due to suspicious activity. Click here to verify your identity immediately.',
      type: 'email',
      threatLevel: 'Critical',
      timestamp: new Date(Date.now() - 1800000)
    },
    {
      id: 2,
      subject: 'Scholarship Award Notification',
      preview: 'Congratulations! You have been selected for a $5,000 scholarship. Provide your bank details to claim your award.',
      type: 'email',
      threatLevel: 'High',
      timestamp: new Date(Date.now() - 7200000)
    },
    {
      id: 3,
      subject: 'Library Book Overdue Fine',
      preview: 'You have an overdue library book. Please pay the $15 fine through this secure payment link to avoid account restrictions.',
      type: 'sms',
      threatLevel: 'Medium',
      timestamp: new Date(Date.now() - 14400000)
    },
    {
      id: 4,
      subject: 'Campus Event Registration Confirmation',
      preview: 'Thank you for registering for the Career Fair on March 15th. Your confirmation number is CF2026-1234.',
      type: 'email',
      threatLevel: 'Safe',
      timestamp: new Date(Date.now() - 28800000)
    },
    {
      id: 5,
      subject: 'IT Department Security Update',
      preview: 'Important security update required for all student accounts. Download and install the attached security patch immediately.',
      type: 'email',
      threatLevel: 'High',
      timestamp: new Date(Date.now() - 43200000)
    }
  ];

  const badges = [
    {
      id: 1,
      name: 'First Scan',
      description: 'Completed your first message analysis',
      icon: 'Award',
      iconColor: 'var(--color-primary)',
      bgColor: 'bg-primary/15',
      unlocked: true,
      isNew: false,
      earnedDate: '02/15/2026'
    },
    {
      id: 2,
      name: 'Threat Hunter',
      description: 'Detected 50 threats successfully',
      icon: 'Target',
      iconColor: 'var(--color-error)',
      bgColor: 'bg-error/15',
      unlocked: true,
      isNew: false,
      earnedDate: '02/20/2026'
    },
    {
      id: 3,
      name: 'Quick Learner',
      description: 'Completed 10 learning modules',
      icon: 'Brain',
      iconColor: 'var(--color-secondary)',
      bgColor: 'bg-secondary/15',
      unlocked: true,
      isNew: true,
      earnedDate: '02/25/2026'
    },
    {
      id: 4,
      name: 'Streak Master',
      description: 'Maintained a 7-day learning streak',
      icon: 'Flame',
      iconColor: 'var(--color-accent)',
      bgColor: 'bg-accent/15',
      unlocked: true,
      isNew: true,
      earnedDate: '02/26/2026'
    },
    {
      id: 5,
      name: 'Expert Analyst',
      description: 'Achieve 95% detection accuracy',
      icon: 'Star',
      iconColor: 'var(--color-warning)',
      bgColor: 'bg-warning/15',
      unlocked: false,
      isNew: false,
      earnedDate: null
    },
    {
      id: 6,
      name: 'Security Champion',
      description: 'Complete all advanced modules',
      icon: 'Shield',
      iconColor: 'var(--color-success)',
      bgColor: 'bg-success/15',
      unlocked: false,
      isNew: false,
      earnedDate: null
    },
    {
      id: 7,
      name: 'Community Helper',
      description: 'Help 25 peers identify threats',
      icon: 'Users',
      iconColor: 'var(--color-primary)',
      bgColor: 'bg-primary/15',
      unlocked: false,
      isNew: false,
      earnedDate: null
    },
    {
      id: 8,
      name: 'Master Detective',
      description: 'Analyze 500 messages',
      icon: 'Search',
      iconColor: 'var(--color-secondary)',
      bgColor: 'bg-secondary/15',
      unlocked: false,
      isNew: false,
      earnedDate: null
    }
  ];

  const handleMetricClick = (metric) => {
    setSelectedMetric(metric);
  };

  const handleReAccess = (analysisId) => {
    navigate('/technical-analysis-results', { state: { analysisId } });
  };

  return (
    <div className="min-h-screen bg-background">
      <PrimaryTabNav />
      <main className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-6 md:py-8 lg:py-10">
        <div className="mb-6 md:mb-8">
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-2">
            Welcome Back, Student!
          </h1>
          <p className="text-sm md:text-base text-muted-foreground">
            Track your cybersecurity learning progress and analyze new threats
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8 mb-6 md:mb-8">
          <div className="lg:col-span-2 space-y-4 md:space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
              {metrics?.map((metric) => (
                <MetricCard
                  key={metric?.id}
                  metric={metric}
                  onClick={() => handleMetricClick(metric)}
                />
              ))}
            </div>

            <QuickAccessToolbar />

            <div>
              <div className="flex items-center justify-between mb-4 md:mb-6">
                <h2 className="text-lg md:text-xl font-semibold text-foreground">Recent Analyses</h2>
                <button
                  onClick={() => navigate('/message-analysis')}
                  className="text-xs md:text-sm text-primary hover:text-primary/80 transition-smooth font-medium"
                >
                  View All
                </button>
              </div>
              <div className="space-y-3 md:space-y-4">
                {recentAnalyses?.slice(0, 5)?.map((analysis) => (
                  <RecentAnalysisCard
                    key={analysis?.id}
                    analysis={analysis}
                    onReAccess={handleReAccess}
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-4 md:space-y-6">
            <SafetyScoreWidget
              score={87}
              level="Advanced"
              pointsToNext={230}
              totalPoints={2770}
            />

            <BadgeShowcase badges={badges} streak={7} />
          </div>
        </div>
      </main>
      <QuickActionToolbar />
      {selectedMetric && (
        <MetricDetailModal
          metric={selectedMetric}
          onClose={() => setSelectedMetric(null)}
        />
      )}
    </div>
  );
};

export default Dashboard;