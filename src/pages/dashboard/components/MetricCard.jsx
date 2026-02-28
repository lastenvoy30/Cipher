import React from 'react';
import Icon from '../../../components/AppIcon';

const MetricCard = ({ metric, onClick }) => {
  const getTrendIcon = () => {
    if (metric?.trend === 'up') return 'TrendingUp';
    if (metric?.trend === 'down') return 'TrendingDown';
    return 'Minus';
  };

  const getTrendColor = () => {
    if (metric?.trend === 'up') return 'var(--color-success)';
    if (metric?.trend === 'down') return 'var(--color-error)';
    return 'var(--color-muted-foreground)';
  };

  return (
    <button
      onClick={onClick}
      className="w-full bg-card border border-border rounded-xl p-4 md:p-6 transition-smooth hover:shadow-glow-md hover:border-primary/40 text-left group"
      aria-label={`${metric?.label}: ${metric?.value}. ${metric?.change} change. Click for details.`}
    >
      <div className="flex items-start justify-between mb-3 md:mb-4">
        <div className={`w-10 h-10 md:w-12 md:h-12 rounded-lg flex items-center justify-center transition-smooth ${metric?.bgColor}`}>
          <Icon name={metric?.icon} size={20} color={metric?.iconColor} className="md:w-6 md:h-6" />
        </div>
        <div className="flex items-center gap-1 md:gap-2">
          <Icon name={getTrendIcon()} size={16} color={getTrendColor()} className="md:w-5 md:h-5" />
          <span className="text-xs md:text-sm font-medium" style={{ color: getTrendColor() }}>
            {metric?.change}
          </span>
        </div>
      </div>
      <div className="space-y-1 md:space-y-2">
        <p className="text-xs md:text-sm text-muted-foreground">{metric?.label}</p>
        <p className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground">{metric?.value}</p>
        {metric?.subtitle && (
          <p className="text-xs md:text-sm text-muted-foreground">{metric?.subtitle}</p>
        )}
      </div>
      {metric?.progress !== undefined && (
        <div className="mt-3 md:mt-4">
          <div className="w-full h-1.5 md:h-2 bg-muted rounded-full overflow-hidden">
            <div 
              className="h-full transition-all duration-500 rounded-full"
              style={{ 
                width: `${metric?.progress}%`,
                background: metric?.iconColor 
              }}
            />
          </div>
        </div>
      )}
    </button>
  );
};

export default MetricCard;