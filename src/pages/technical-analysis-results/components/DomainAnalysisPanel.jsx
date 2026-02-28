import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const DomainAnalysisPanel = ({ domain, analysis }) => {
  const [activeTab, setActiveTab] = useState('overview');

  const tabs = [
    { id: 'overview', label: 'Overview', icon: 'Globe' },
    { id: 'whois', label: 'WHOIS Data', icon: 'FileText' },
    { id: 'reputation', label: 'Reputation', icon: 'Shield' },
    { id: 'security', label: 'Security', icon: 'Lock' }
  ];

  const getReputationColor = (score) => {
    if (score >= 80) return 'success';
    if (score >= 50) return 'warning';
    return 'error';
  };

  return (
    <div className="bg-card border border-border rounded-xl overflow-hidden">
      <div className="p-4 md:p-6 border-b border-border">
        <div className="flex items-center gap-3 mb-2">
          <Icon name="Globe" size={24} color="var(--color-primary)" />
          <h3 className="text-lg md:text-xl lg:text-2xl font-semibold text-foreground">Domain Analysis</h3>
        </div>
        <div className="flex items-center gap-2 mt-3">
          <code className="text-sm md:text-base text-primary font-medium break-all">{domain}</code>
        </div>
      </div>
      <div className="border-b border-border overflow-x-auto">
        <div className="flex items-center gap-2 p-2 min-w-max">
          {tabs?.map((tab) => (
            <button
              key={tab?.id}
              onClick={() => setActiveTab(tab?.id)}
              className={`flex items-center gap-2 px-4 py-2 md:px-6 md:py-3 rounded-lg font-medium transition-smooth whitespace-nowrap ${
                activeTab === tab?.id
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted'
              }`}
            >
              <Icon name={tab?.icon} size={18} color={activeTab === tab?.id ? 'var(--color-primary-foreground)' : 'currentColor'} />
              <span className="text-sm md:text-base">{tab?.label}</span>
            </button>
          ))}
        </div>
      </div>
      <div className="p-4 md:p-6">
        {activeTab === 'overview' && (
          <div className="space-y-4 md:space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              <div className="space-y-2">
                <span className="text-xs md:text-sm text-muted-foreground">Domain Age</span>
                <div className="flex items-center gap-2">
                  <Icon name="Calendar" size={18} color="var(--color-foreground)" />
                  <span className="text-sm md:text-base font-medium text-foreground">{analysis?.age}</span>
                </div>
              </div>
              <div className="space-y-2">
                <span className="text-xs md:text-sm text-muted-foreground">Registration Date</span>
                <div className="flex items-center gap-2">
                  <Icon name="Clock" size={18} color="var(--color-foreground)" />
                  <span className="text-sm md:text-base font-medium text-foreground">{analysis?.registrationDate}</span>
                </div>
              </div>
              <div className="space-y-2">
                <span className="text-xs md:text-sm text-muted-foreground">Registrar</span>
                <div className="flex items-center gap-2">
                  <Icon name="Building" size={18} color="var(--color-foreground)" />
                  <span className="text-sm md:text-base font-medium text-foreground">{analysis?.registrar}</span>
                </div>
              </div>
              <div className="space-y-2">
                <span className="text-xs md:text-sm text-muted-foreground">Country</span>
                <div className="flex items-center gap-2">
                  <Icon name="MapPin" size={18} color="var(--color-foreground)" />
                  <span className="text-sm md:text-base font-medium text-foreground">{analysis?.country}</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'whois' && (
          <div className="space-y-3 md:space-y-4">
            {analysis?.whoisData?.map((item, index) => (
              <div key={index} className="p-3 md:p-4 bg-muted/30 rounded-lg">
                <div className="text-xs md:text-sm text-muted-foreground mb-1">{item?.label}</div>
                <div className="text-sm md:text-base text-foreground font-medium break-all">{item?.value}</div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'reputation' && (
          <div className="space-y-4 md:space-y-6">
            <div className="flex items-center justify-between p-4 md:p-6 bg-muted/30 rounded-lg">
              <div>
                <div className="text-xs md:text-sm text-muted-foreground mb-1">Reputation Score</div>
                <div className={`text-2xl md:text-3xl lg:text-4xl font-bold text-${getReputationColor(analysis?.reputationScore)}`}>
                  {analysis?.reputationScore}/100
                </div>
              </div>
              <div className={`w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center bg-${getReputationColor(analysis?.reputationScore)}/10`}>
                <Icon name="TrendingDown" size={32} color={`var(--color-${getReputationColor(analysis?.reputationScore)})`} />
              </div>
            </div>

            <div className="space-y-3">
              <h4 className="text-sm md:text-base font-semibold text-foreground">Blacklist Status</h4>
              <div className="grid grid-cols-1 gap-2 md:gap-3">
                {analysis?.blacklists?.map((blacklist, index) => (
                  <div key={index} className="flex items-center justify-between p-3 md:p-4 bg-card border border-border rounded-lg">
                    <span className="text-sm md:text-base text-foreground">{blacklist?.name}</span>
                    <div className="flex items-center gap-2">
                      <Icon 
                        name={blacklist?.listed ? 'XCircle' : 'CheckCircle'} 
                        size={18} 
                        color={blacklist?.listed ? 'var(--color-error)' : 'var(--color-success)'} 
                      />
                      <span className={`text-xs md:text-sm font-medium ${blacklist?.listed ? 'text-error' : 'text-success'}`}>
                        {blacklist?.listed ? 'Listed' : 'Clean'}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'security' && (
          <div className="space-y-3 md:space-y-4">
            {analysis?.securityFeatures?.map((feature, index) => (
              <div key={index} className="flex items-start gap-3 p-3 md:p-4 bg-muted/30 rounded-lg">
                <Icon 
                  name={feature?.enabled ? 'CheckCircle' : 'XCircle'} 
                  size={20} 
                  color={feature?.enabled ? 'var(--color-success)' : 'var(--color-error)'} 
                  className="flex-shrink-0 mt-1"
                />
                <div className="flex-1 min-w-0">
                  <div className="text-sm md:text-base font-medium text-foreground mb-1">{feature?.name}</div>
                  <p className="text-xs md:text-sm text-muted-foreground">{feature?.description}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default DomainAnalysisPanel;