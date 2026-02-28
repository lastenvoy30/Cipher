import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';

const QuickActionToolbar = () => {
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const actions = [
    {
      id: 'analyze',
      label: 'Analyze New Message',
      icon: 'Shield',
      path: '/message-analysis',
      color: 'var(--color-primary)'
    },
    {
      id: 'practice',
      label: 'Practice Mode',
      icon: 'Target',
      path: '/practice-mode',
      color: 'var(--color-secondary)'
    }
  ];

  const handleActionClick = (path) => {
    navigate(path);
    setIsMobileMenuOpen(false);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <div className="quick-action-toolbar">
      <div className="quick-action-toolbar-desktop">
        {actions?.map((action) => (
          <button
            key={action?.id}
            onClick={() => handleActionClick(action?.path)}
            className="quick-action-fab"
            title={action?.label}
            aria-label={action?.label}
          >
            <Icon name={action?.icon} size={24} color="var(--color-primary-foreground)" />
          </button>
        ))}
      </div>
      <div className="quick-action-toolbar-mobile">
        <button
          onClick={toggleMobileMenu}
          className="quick-action-fab"
          aria-label="Quick actions menu"
          aria-expanded={isMobileMenuOpen}
        >
          <Icon 
            name={isMobileMenuOpen ? 'X' : 'Plus'} 
            size={24} 
            color="var(--color-primary-foreground)" 
          />
        </button>

        {isMobileMenuOpen && (
          <div className="quick-action-menu">
            {actions?.map((action) => (
              <button
                key={action?.id}
                onClick={() => handleActionClick(action?.path)}
                className="quick-action-menu-item"
              >
                <Icon name={action?.icon} size={20} color={action?.color} />
                <span>{action?.label}</span>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default QuickActionToolbar;