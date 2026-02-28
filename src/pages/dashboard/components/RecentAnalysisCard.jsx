import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const RecentAnalysisCard = ({ analysis, onReAccess }) => {
  const getThreatLevelColor = () => {
    if (analysis?.threatLevel === 'Critical') return 'var(--color-error)';
    if (analysis?.threatLevel === 'High') return 'var(--color-warning)';
    if (analysis?.threatLevel === 'Medium') return 'var(--color-accent)';
    return 'var(--color-success)';
  };

  const getThreatIcon = () => {
    if (analysis?.threatLevel === 'Critical' || analysis?.threatLevel === 'High') return 'AlertTriangle';
    if (analysis?.threatLevel === 'Medium') return 'AlertCircle';
    return 'CheckCircle';
  };

  const formatTimestamp = (date) => {
    const now = new Date();
    const diff = now - date;
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    return `${days}d ago`;
  };

  return (
    <div className="bg-card border border-border rounded-xl p-4 md:p-5 transition-smooth hover:shadow-glow-md hover:border-primary/40">
      <div className="flex items-start justify-between gap-3 mb-3 md:mb-4">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-2">
            <div 
              className="w-2 h-2 md:w-2.5 md:h-2.5 rounded-full flex-shrink-0"
              style={{ background: getThreatLevelColor() }}
            />
            <span 
              className="text-xs md:text-sm font-semibold"
              style={{ color: getThreatLevelColor() }}
            >
              {analysis?.threatLevel} Threat
            </span>
          </div>
          <h4 className="text-sm md:text-base font-medium text-foreground line-clamp-2 mb-1">
            {analysis?.subject}
          </h4>
          <p className="text-xs md:text-sm text-muted-foreground line-clamp-2">
            {analysis?.preview}
          </p>
        </div>
        <div 
          className="w-10 h-10 md:w-12 md:h-12 rounded-lg flex items-center justify-center flex-shrink-0"
          style={{ background: `${getThreatLevelColor()}20` }}
        >
          <Icon name={getThreatIcon()} size={20} color={getThreatLevelColor()} className="md:w-6 md:h-6" />
        </div>
      </div>
      <div className="flex items-center justify-between gap-3 pt-3 md:pt-4 border-t border-border">
        <div className="flex items-center gap-4 md:gap-6 text-xs md:text-sm text-muted-foreground">
          <div className="flex items-center gap-1.5">
            <Icon name="Clock" size={14} color="var(--color-muted-foreground)" className="md:w-4 md:h-4" />
            <span>{formatTimestamp(analysis?.timestamp)}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Icon name="Mail" size={14} color="var(--color-muted-foreground)" className="md:w-4 md:h-4" />
            <span className="capitalize">{analysis?.type}</span>
          </div>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onReAccess(analysis?.id)}
          iconName="ExternalLink"
          iconPosition="right"
          iconSize={14}
          className="flex-shrink-0"
        >
          View
        </Button>
      </div>
    </div>
  );
};

export default RecentAnalysisCard;