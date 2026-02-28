import React from 'react';
import Icon from '../../../components/AppIcon';

const SafetyScoreWidget = ({ score, level, pointsToNext, totalPoints }) => {
  const getScoreColor = () => {
    if (score >= 80) return 'var(--color-success)';
    if (score >= 60) return 'var(--color-warning)';
    return 'var(--color-error)';
  };

  const getLevelIcon = () => {
    if (level === 'Expert') return 'Award';
    if (level === 'Advanced') return 'Star';
    if (level === 'Intermediate') return 'Shield';
    return 'ShieldAlert';
  };

  const progressPercentage = ((totalPoints % 1000) / 1000) * 100;

  return (
    <div className="bg-card border border-border rounded-xl p-4 md:p-6 lg:p-8">
      <div className="flex items-center justify-between mb-4 md:mb-6">
        <h3 className="text-base md:text-lg font-semibold text-foreground">Safety Score</h3>
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg" style={{ background: 'rgba(13, 115, 119, 0.15)' }}>
          <Icon name={getLevelIcon()} size={16} color="var(--color-primary)" className="md:w-5 md:h-5" />
          <span className="text-xs md:text-sm font-medium text-primary">{level}</span>
        </div>
      </div>
      <div className="flex flex-col items-center mb-4 md:mb-6">
        <div className="relative w-32 h-32 md:w-40 md:h-40 lg:w-48 lg:h-48 mb-3 md:mb-4">
          <svg className="w-full h-full transform -rotate-90">
            <circle
              cx="50%"
              cy="50%"
              r="45%"
              fill="none"
              stroke="var(--color-muted)"
              strokeWidth="8"
            />
            <circle
              cx="50%"
              cy="50%"
              r="45%"
              fill="none"
              stroke={getScoreColor()}
              strokeWidth="8"
              strokeDasharray={`${(score / 100) * 283} 283`}
              strokeLinecap="round"
              className="transition-all duration-1000"
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-3xl md:text-4xl lg:text-5xl font-bold" style={{ color: getScoreColor() }}>
              {score}
            </span>
            <span className="text-xs md:text-sm text-muted-foreground">out of 100</span>
          </div>
        </div>

        <div className="text-center">
          <p className="text-sm md:text-base text-foreground font-medium mb-1">
            {totalPoints?.toLocaleString()} Total Points
          </p>
          <p className="text-xs md:text-sm text-muted-foreground">
            {pointsToNext} points to next level
          </p>
        </div>
      </div>
      <div className="space-y-2 md:space-y-3">
        <div className="flex items-center justify-between text-xs md:text-sm">
          <span className="text-muted-foreground">Progress to {level === 'Beginner' ? 'Intermediate' : level === 'Intermediate' ? 'Advanced' : 'Master'}</span>
          <span className="text-foreground font-medium">{Math.round(progressPercentage)}%</span>
        </div>
        <div className="w-full h-2 md:h-2.5 bg-muted rounded-full overflow-hidden">
          <div 
            className="h-full transition-all duration-500 rounded-full"
            style={{ 
              width: `${progressPercentage}%`,
              background: getScoreColor()
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default SafetyScoreWidget;
