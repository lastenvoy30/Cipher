import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';

const QuickAccessToolbar = () => {
  const navigate = useNavigate();

  const actions = [
    {
      id: 'analyze',
      label: 'Analyze New Message',
      description: 'Check if a message is a threat',
      icon: 'Shield',
      path: '/message-analysis'
    },
    {
      id: 'practice',
      label: 'Practice Mode',
      description: 'Test your threat detection skills',
      icon: 'Target',
      path: '/message-analysis'
    }
  ];

  return (
    <div className="bg-card border border-border rounded-xl p-4 md:p-6">
      <h3 className="text-base md:text-lg font-semibold text-foreground mb-4 md:mb-6">Quick Actions</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
        {actions.map((action) => (
          <button
            key={action.id}
            onClick={() => navigate(action.path)}
            className="flex items-start gap-3 md:gap-4 p-4 md:p-5 rounded-xl border-2 border-border transition-smooth hover:border-primary hover:shadow-glow-md text-left group"
          >
            <div className="w-12 h-12 md:w-14 md:h-14 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 transition-smooth group-hover:bg-primary/20">
              <Icon name={action.icon} size={24} className="text-primary" />
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="text-sm md:text-base font-semibold text-foreground mb-1 group-hover:text-primary transition-smooth">
                {action.label}
              </h4>
              <p className="text-xs md:text-sm text-muted-foreground line-clamp-2">
                {action.description}
              </p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuickAccessToolbar;