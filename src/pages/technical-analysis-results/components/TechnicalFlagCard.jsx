import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';


const TechnicalFlagCard = ({ title, icon, flags, category }) => {
  const [expandedIndex, setExpandedIndex] = useState(null);

  const getCategoryColor = (cat) => {
    const colors = {
      critical: 'error',
      warning: 'warning',
      info: 'primary'
    };
    return colors?.[cat] || 'muted';
  };

  const toggleExpand = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <div className="bg-card border border-border rounded-xl p-4 md:p-6">
      <div className="flex items-center gap-3 mb-4 md:mb-6">
        <div className={`w-10 h-10 md:w-12 md:h-12 rounded-lg flex items-center justify-center bg-${getCategoryColor(category)}/10`}>
          <Icon name={icon} size={24} color={`var(--color-${getCategoryColor(category)})`} />
        </div>
        <h3 className="text-lg md:text-xl lg:text-2xl font-semibold text-foreground">{title}</h3>
      </div>
      <div className="space-y-3 md:space-y-4">
        {flags?.map((flag, index) => (
          <div key={index} className="border border-border rounded-lg overflow-hidden">
            <button
              onClick={() => toggleExpand(index)}
              className="w-full flex items-center justify-between gap-3 p-3 md:p-4 bg-muted/30 hover:bg-muted/50 transition-smooth"
              aria-expanded={expandedIndex === index}
            >
              <div className="flex items-center gap-3 flex-1 min-w-0">
                <Icon 
                  name={flag?.status === 'detected' ? 'AlertTriangle' : flag?.status === 'suspicious' ? 'AlertCircle' : 'CheckCircle'} 
                  size={20} 
                  color={flag?.status === 'detected' ? 'var(--color-error)' : flag?.status === 'suspicious' ? 'var(--color-warning)' : 'var(--color-success)'} 
                  className="flex-shrink-0"
                />
                <span className="text-sm md:text-base font-medium text-foreground text-left">{flag?.label}</span>
              </div>
              <Icon 
                name={expandedIndex === index ? 'ChevronUp' : 'ChevronDown'} 
                size={20} 
                color="var(--color-muted-foreground)" 
                className="flex-shrink-0"
              />
            </button>

            {expandedIndex === index && (
              <div className="p-3 md:p-4 bg-card space-y-3">
                <div className="space-y-2">
                  <div className="flex items-start gap-2">
                    <Icon name="Info" size={16} color="var(--color-primary)" className="flex-shrink-0 mt-1" />
                    <p className="text-sm md:text-base text-foreground">{flag?.details}</p>
                  </div>
                  {flag?.value && (
                    <div className="p-2 md:p-3 bg-muted/50 rounded-lg">
                      <code className="text-xs md:text-sm text-foreground break-all">{flag?.value}</code>
                    </div>
                  )}
                </div>
                {flag?.explanation && (
                  <div className="p-3 md:p-4 bg-primary/5 border border-primary/20 rounded-lg">
                    <div className="flex items-start gap-2 mb-2">
                      <Icon name="Lightbulb" size={16} color="var(--color-primary)" className="flex-shrink-0 mt-1" />
                      <span className="text-xs md:text-sm font-semibold text-primary">Why This Matters</span>
                    </div>
                    <p className="text-xs md:text-sm text-muted-foreground">{flag?.explanation}</p>
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TechnicalFlagCard;
