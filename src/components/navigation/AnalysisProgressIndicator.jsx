import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';

const AnalysisProgressIndicator = ({ currentStep = 0 }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const steps = [
    {
      id: 1,
      label: 'Message Input',
      path: '/message-analysis',
      icon: 'Mail'
    },
    {
      id: 2,
      label: 'Technical Analysis',
      path: '/technical-analysis-results',
      icon: 'Code'
    },
    {
      id: 3,
      label: 'Psychology Analysis',
      path: '/psychology-results',
      icon: 'Brain'
    },
    {
      id: 4,
      label: 'Attack Timeline',
      path: '/attack-timeline',
      icon: 'Clock'
    }
  ];

  const getCurrentStepIndex = () => {
    const currentPath = location?.pathname;
    const stepIndex = steps?.findIndex(step => step?.path === currentPath);
    return stepIndex !== -1 ? stepIndex : currentStep;
  };

  const activeStepIndex = getCurrentStepIndex();

  const handleStepClick = (step, index) => {
    if (index <= activeStepIndex) {
      navigate(step?.path);
    }
  };

  const getStepStatus = (index) => {
    if (index < activeStepIndex) return 'completed';
    if (index === activeStepIndex) return 'active';
    return 'pending';
  };

  return (
    <div className="analysis-progress-indicator">
      <div className="analysis-progress-steps">
        {steps?.map((step, index) => {
          const status = getStepStatus(index);
          const isClickable = index <= activeStepIndex;

          return (
            <div 
              key={step?.id} 
              className={`analysis-progress-step ${status}`}
            >
              <button
                onClick={() => handleStepClick(step, index)}
                disabled={!isClickable}
                className="analysis-progress-step-circle"
                aria-label={`${step?.label} - ${status}`}
                aria-current={status === 'active' ? 'step' : undefined}
              >
                {status === 'completed' ? (
                  <Icon name="Check" size={20} color="var(--color-success-foreground)" />
                ) : (
                  <Icon 
                    name={step?.icon} 
                    size={20} 
                    color={status === 'active' ? 'var(--color-primary-foreground)' : 'var(--color-muted-foreground)'} 
                  />
                )}
              </button>
              <span className="analysis-progress-step-label">{step?.label}</span>
              {index < steps?.length - 1 && (
                <div className="analysis-progress-connector" />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AnalysisProgressIndicator;