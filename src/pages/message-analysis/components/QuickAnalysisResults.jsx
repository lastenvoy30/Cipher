import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const QuickAnalysisResults = ({ results }) => {
  const navigate = useNavigate();

  const getRiskColor = (level) => {
    switch (level?.toLowerCase()) {
      case 'critical':
        return 'text-error';
      case 'high':
        return 'text-accent';
      case 'medium':
        return 'text-warning';
      case 'low':
        return 'text-success';
      default:
        return 'text-muted-foreground';
    }
  };

  const getRiskBgColor = (level) => {
    switch (level?.toLowerCase()) {
      case 'critical':
        return 'bg-error/10 border-error/30';
      case 'high':
        return 'bg-accent/10 border-accent/30';
      case 'medium':
        return 'bg-warning/10 border-warning/30';
      case 'low':
        return 'bg-success/10 border-success/30';
      default:
        return 'bg-muted/10 border-border';
    }
  };

  return (
    <div className="w-full space-y-4 md:space-y-6">
      <div className={`p-4 md:p-6 rounded-xl border-2 ${getRiskBgColor(results?.riskLevel)}`}>
        <div className="flex items-start gap-3 md:gap-4 mb-4">
          <div className={`w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center flex-shrink-0 ${
            results?.riskLevel?.toLowerCase() === 'critical' || results?.riskLevel?.toLowerCase() === 'high'
              ? 'bg-error/20'
              : results?.riskLevel?.toLowerCase() === 'medium' ?'bg-warning/20' :'bg-success/20'
          }`}>
            <Icon 
              name={results?.riskLevel?.toLowerCase() === 'low' ? 'ShieldCheck' : 'AlertTriangle'} 
              size={24} 
              color={
                results?.riskLevel?.toLowerCase() === 'critical' || results?.riskLevel?.toLowerCase() === 'high'
                  ? 'var(--color-error)'
                  : results?.riskLevel?.toLowerCase() === 'medium' ?'var(--color-warning)' :'var(--color-success)'
              }
            />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-2">
              <h3 className="text-lg md:text-xl font-semibold text-foreground">
                Analysis Complete
              </h3>
              <span className={`px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap ${getRiskColor(results?.riskLevel)}`}>
                {results?.riskLevel} Risk
              </span>
            </div>
            <p className="text-sm md:text-base text-foreground">
              Risk Score: <span className="font-semibold">{results?.riskScore}/100</span>
            </p>
          </div>
        </div>

        <div className="space-y-3">
          <div>
            <h4 className="text-sm font-medium text-foreground mb-2">
              Quick Assessment
            </h4>
            <p className="text-sm text-muted-foreground">
              {results?.quickAssessment}
            </p>
          </div>
        </div>
      </div>
      <div className="bg-card border-2 border-border rounded-xl p-4 md:p-6">
        <h4 className="text-base md:text-lg font-semibold text-foreground mb-4">
          Key Threat Indicators
        </h4>
        <div className="space-y-3">
          {results?.keyIndicators?.map((indicator, index) => (
            <div
              key={index}
              className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg"
            >
              <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                indicator?.severity === 'high' ? 'bg-error/20' : 'bg-warning/20'
              }`}>
                <Icon 
                  name="AlertCircle" 
                  size={16} 
                  color={indicator?.severity === 'high' ? 'var(--color-error)' : 'var(--color-warning)'} 
                />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground mb-1">
                  {indicator?.title}
                </p>
                <p className="text-xs text-muted-foreground">
                  {indicator?.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="bg-card border-2 border-border rounded-xl p-4 md:p-6">
        <h4 className="text-base md:text-lg font-semibold text-foreground mb-4">
          Recommended Actions
        </h4>
        <div className="space-y-2">
          {results?.recommendedActions?.map((action, index) => (
            <div
              key={index}
              className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg"
            >
              <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-xs font-semibold text-primary">{index + 1}</span>
              </div>
              <p className="text-sm text-foreground flex-1">
                {action}
              </p>
            </div>
          ))}
        </div>
      </div>
      <div className="flex flex-col sm:flex-row gap-3">
        <Button
          variant="default"
          iconName="Code"
          iconPosition="left"
          onClick={() => navigate('/technical-analysis-results')}
          fullWidth
          className="sm:flex-1"
        >
          View Technical Analysis
        </Button>
        <Button
          variant="outline"
          iconName="Brain"
          iconPosition="left"
          onClick={() => navigate('/psychology-results')}
          fullWidth
          className="sm:flex-1"
        >
          View Psychology Analysis
        </Button>
      </div>
    </div>
  );
};

export default QuickAnalysisResults;