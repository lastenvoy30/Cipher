import React from 'react';
import Icon from '../../../components/AppIcon';

const RiskScoreCard = ({ score, severity, factors }) => {
  const getSeverityColor = (level) => {
    const colors = {
      critical: 'text-error',
      high: 'text-warning',
      medium: 'text-accent',
      low: 'text-success'
    };
    return colors?.[level] || 'text-muted-foreground';
  };

  const getSeverityBg = (level) => {
    const backgrounds = {
      critical: 'bg-error/10 border-error/20',
      high: 'bg-warning/10 border-warning/20',
      medium: 'bg-accent/10 border-accent/20',
      low: 'bg-success/10 border-success/20'
    };
    return backgrounds?.[level] || 'bg-muted/10 border-border';
  };

  return (
    <div className={`rounded-xl border-2 p-4 md:p-6 lg:p-8 ${getSeverityBg(severity)}`}>
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 lg:gap-6 mb-6">
        <div className="flex items-center gap-3 md:gap-4">
          <div className={`w-12 h-12 md:w-16 md:h-16 lg:w-20 lg:h-20 rounded-full flex items-center justify-center ${getSeverityBg(severity)}`}>
            <Icon name="ShieldAlert" size={32} color={`var(--color-${severity === 'critical' ? 'error' : severity === 'high' ? 'warning' : severity === 'medium' ? 'accent' : 'success'})`} />
          </div>
          <div>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-1">Risk Score</h2>
            <p className="text-sm md:text-base text-muted-foreground">Overall threat assessment</p>
          </div>
        </div>
        <div className="text-center lg:text-right">
          <div className={`text-5xl md:text-6xl lg:text-7xl font-bold ${getSeverityColor(severity)}`}>
            {score}
          </div>
          <div className={`text-lg md:text-xl lg:text-2xl font-semibold uppercase mt-2 ${getSeverityColor(severity)}`}>
            {severity}
          </div>
        </div>
      </div>
      <div className="space-y-3 md:space-y-4">
        <h3 className="text-base md:text-lg font-semibold text-foreground">Contributing Factors</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
          {factors?.map((factor, index) => (
            <div key={index} className="flex items-start gap-3 p-3 md:p-4 rounded-lg bg-card border border-border">
              <Icon name={factor?.icon} size={20} color={`var(--color-${factor?.severity})`} className="flex-shrink-0 mt-1" />
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2 mb-1">
                  <span className="text-sm md:text-base font-medium text-foreground">{factor?.name}</span>
                  <span className={`text-xs md:text-sm font-semibold ${getSeverityColor(factor?.severity)}`}>
                    +{factor?.points}
                  </span>
                </div>
                <p className="text-xs md:text-sm text-muted-foreground line-clamp-2">{factor?.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RiskScoreCard;