import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';

const PrimaryTabNav = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const tabs = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      path: '/dashboard',
      icon: 'LayoutDashboard',
      tooltip: 'Track your progress and start new analyses'
    },
    {
      id: 'analysis',
      label: 'Analysis',
      path: '/message-analysis',
      icon: 'Shield',
      tooltip: 'Analyze suspicious messages step-by-step'
    },
    {
      id: 'profile',
      label: 'Profile',
      path: '/profile',
      icon: 'User',
      tooltip: 'View achievements and practice skills'
    }
  ];

  const isActiveTab = (tabPath) => {
    if (tabPath === '/message-analysis') {
      return location?.pathname?.startsWith('/message-analysis') || 
             location?.pathname?.startsWith('/technical-analysis-results') ||
             location?.pathname?.startsWith('/psychology-results') ||
             location?.pathname?.startsWith('/attack-timeline');
    }
    return location?.pathname === tabPath;
  };

  const handleTabClick = (path) => {
    navigate(path);
  };

  return (
    <nav className="primary-tab-nav">
      <div className="primary-tab-nav-container">
        <div className="primary-tab-nav-logo">
          <div className="primary-tab-nav-logo-icon">
            <Icon name="ShieldCheck" size={24} color="var(--color-primary)" />
          </div>
          <span className="primary-tab-nav-logo-text">CyberGuard Academy</span>
        </div>

        <div className="primary-tab-nav-tabs">
          {tabs?.map((tab) => (
            <button
              key={tab?.id}
              onClick={() => handleTabClick(tab?.path)}
              className={`primary-tab-nav-tab ${isActiveTab(tab?.path) ? 'active' : ''}`}
              title={tab?.tooltip}
              aria-label={tab?.tooltip}
              aria-current={isActiveTab(tab?.path) ? 'page' : undefined}
            >
              <Icon 
                name={tab?.icon} 
                size={20} 
                color={isActiveTab(tab?.path) ? 'var(--color-primary-foreground)' : 'currentColor'} 
              />
              <span>{tab?.label}</span>
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default PrimaryTabNav;