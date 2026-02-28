import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const ComparisonToolCard = ({ legitimatePatterns, suspiciousPatterns }) => {
  const [selectedCategory, setSelectedCategory] = useState('headers');

  const categories = [
    { id: 'headers', label: 'Email Headers', icon: 'Mail' },
    { id: 'links', label: 'Link Structure', icon: 'Link' },
    { id: 'content', label: 'Content Patterns', icon: 'FileText' },
    { id: 'sender', label: 'Sender Info', icon: 'User' }
  ];

  const getPatternData = (category) => {
    const data = {
      headers: {
        legitimate: legitimatePatterns?.headers,
        suspicious: suspiciousPatterns?.headers
      },
      links: {
        legitimate: legitimatePatterns?.links,
        suspicious: suspiciousPatterns?.links
      },
      content: {
        legitimate: legitimatePatterns?.content,
        suspicious: suspiciousPatterns?.content
      },
      sender: {
        legitimate: legitimatePatterns?.sender,
        suspicious: suspiciousPatterns?.sender
      }
    };
    return data?.[category];
  };

  const currentData = getPatternData(selectedCategory);

  return (
    <div className="bg-card border border-border rounded-xl overflow-hidden">
      <div className="p-4 md:p-6 border-b border-border">
        <div className="flex items-center gap-3">
          <Icon name="GitCompare" size={24} color="var(--color-primary)" />
          <h3 className="text-lg md:text-xl lg:text-2xl font-semibold text-foreground">Pattern Comparison</h3>
        </div>
        <p className="text-sm md:text-base text-muted-foreground mt-2">
          Learn to identify differences between legitimate and suspicious patterns
        </p>
      </div>
      <div className="border-b border-border overflow-x-auto">
        <div className="flex items-center gap-2 p-2 min-w-max">
          {categories?.map((category) => (
            <button
              key={category?.id}
              onClick={() => setSelectedCategory(category?.id)}
              className={`flex items-center gap-2 px-4 py-2 md:px-6 md:py-3 rounded-lg font-medium transition-smooth whitespace-nowrap ${
                selectedCategory === category?.id
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted'
              }`}
            >
              <Icon name={category?.icon} size={18} color={selectedCategory === category?.id ? 'var(--color-primary-foreground)' : 'currentColor'} />
              <span className="text-sm md:text-base">{category?.label}</span>
            </button>
          ))}
        </div>
      </div>
      <div className="p-4 md:p-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
          <div className="space-y-3 md:space-y-4">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 md:w-10 md:h-10 rounded-lg bg-success/10 flex items-center justify-center">
                <Icon name="CheckCircle" size={20} color="var(--color-success)" />
              </div>
              <h4 className="text-base md:text-lg font-semibold text-success">Legitimate Pattern</h4>
            </div>
            <div className="space-y-2 md:space-y-3">
              {currentData?.legitimate?.map((item, index) => (
                <div key={index} className="p-3 md:p-4 bg-success/5 border border-success/20 rounded-lg">
                  <div className="flex items-start gap-2 mb-2">
                    <Icon name="Check" size={16} color="var(--color-success)" className="flex-shrink-0 mt-1" />
                    <span className="text-sm md:text-base font-medium text-foreground">{item?.label}</span>
                  </div>
                  <p className="text-xs md:text-sm text-muted-foreground ml-6">{item?.description}</p>
                  {item?.example && (
                    <div className="mt-2 ml-6 p-2 bg-muted/50 rounded">
                      <code className="text-xs text-foreground break-all">{item?.example}</code>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-3 md:space-y-4">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 md:w-10 md:h-10 rounded-lg bg-error/10 flex items-center justify-center">
                <Icon name="XCircle" size={20} color="var(--color-error)" />
              </div>
              <h4 className="text-base md:text-lg font-semibold text-error">Suspicious Pattern</h4>
            </div>
            <div className="space-y-2 md:space-y-3">
              {currentData?.suspicious?.map((item, index) => (
                <div key={index} className="p-3 md:p-4 bg-error/5 border border-error/20 rounded-lg">
                  <div className="flex items-start gap-2 mb-2">
                    <Icon name="AlertTriangle" size={16} color="var(--color-error)" className="flex-shrink-0 mt-1" />
                    <span className="text-sm md:text-base font-medium text-foreground">{item?.label}</span>
                  </div>
                  <p className="text-xs md:text-sm text-muted-foreground ml-6">{item?.description}</p>
                  {item?.example && (
                    <div className="mt-2 ml-6 p-2 bg-muted/50 rounded">
                      <code className="text-xs text-foreground break-all">{item?.example}</code>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComparisonToolCard;