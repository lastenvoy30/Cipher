import React from 'react';
import Icon from '../../../components/AppIcon';

const AnalysisProgress = ({ currentPhase }) => {
  const phases = [
    {
      id: 'parsing',
      label: 'Parsing Message',
      icon: 'FileText',
      description: 'Extracting content and metadata'
    },
    {
      id: 'technical',
      label: 'Technical Analysis',
      icon: 'Code',
      description: 'Checking URLs, domains, and headers'
    },
    {
      id: 'psychology',
      label: 'Psychology Analysis',
      icon: 'Brain',
      description: 'Analyzing language and tactics'
    },
    {
      id: 'scoring',
      label: 'Risk Scoring',
      icon: 'Target',
      description: 'Calculating threat level'
    }
  ];

  const currentIndex = phases?.findIndex(phase => phase?.id === currentPhase);

  return (
    <div className="w-full bg-card border-2 border-border rounded-xl p-4 md:p-6">
      <div className="flex items-center gap-3 mb-4 md:mb-6">
        <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-primary/20 flex items-center justify-center animate-pulse">
          <Icon name="Loader" size={20} color="var(--color-primary)" className="animate-spin" />
        </div>
        <div>
          <h3 className="text-base md:text-lg font-semibold text-foreground">
            Analyzing Message
          </h3>
          <p className="text-sm text-muted-foreground">
            Please wait while we process your message
          </p>
        </div>
      </div>
      <div className="space-y-3 md:space-y-4">
        {phases?.map((phase, index) => {
          const isCompleted = index < currentIndex;
          const isActive = index === currentIndex;
          const isPending = index > currentIndex;

          return (
            <div
              key={phase?.id}
              className={`flex items-center gap-3 md:gap-4 p-3 md:p-4 rounded-lg transition-smooth ${
                isActive ? 'bg-primary/10 border-2 border-primary' : 'bg-muted/50 border-2 border-transparent'
              }`}
            >
              <div className={`w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                isCompleted ? 'bg-success' : isActive ? 'bg-primary animate-pulse' : 'bg-muted'
              }`}>
                {isCompleted ? (
                  <Icon name="Check" size={16} color="var(--color-success-foreground)" />
                ) : (
                  <Icon 
                    name={phase?.icon} 
                    size={16} 
                    color={isActive ? 'var(--color-primary-foreground)' : 'var(--color-muted-foreground)'} 
                  />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p className={`text-sm md:text-base font-medium ${
                  isActive ? 'text-primary' : isCompleted ? 'text-success' : 'text-muted-foreground'
                }`}>
                  {phase?.label}
                </p>
                <p className="text-xs text-muted-foreground line-clamp-1">
                  {phase?.description}
                </p>
              </div>
              {isActive && (
                <div className="flex-shrink-0">
                  <Icon name="Loader" size={16} color="var(--color-primary)" className="animate-spin" />
                </div>
              )}
            </div>
          );
        })}
      </div>
      <div className="mt-4 md:mt-6 pt-4 md:pt-6 border-t border-border">
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Progress</span>
          <span className="text-foreground font-medium">
            {currentIndex + 1} of {phases?.length}
          </span>
        </div>
        <div className="mt-2 h-2 bg-muted rounded-full overflow-hidden">
          <div
            className="h-full bg-primary transition-all duration-500"
            style={{ width: `${((currentIndex + 1) / phases?.length) * 100}%` }}
          />
        </div>
      </div>
    </div>
  );
};

export default AnalysisProgress;