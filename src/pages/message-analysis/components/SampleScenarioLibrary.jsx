import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const SampleScenarioLibrary = ({ onLoadSample }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const sampleScenarios = [
    {
      id: 1,
      title: "Fake Scholarship Offer",
      type: "email",
      riskLevel: "High",
      description: "Fraudulent scholarship program requesting personal information and payment",
      content: `Subject: Congratulations! You've Been Selected for $10,000 Scholarship

Dear Student,

You have been pre-selected for our exclusive Merit Scholarship Program worth $10,000. This is a limited-time opportunity available to only 50 students nationwide.

To claim your scholarship, you must:
1. Pay a one-time processing fee of $99
2. Provide your Social Security Number for verification
3. Submit bank account details for direct deposit

Click here to claim: http://fake-scholarship-portal.com

This offer expires in 48 hours. Act now!

National Scholarship Foundation`
    },
    {
      id: 2,
      title: "Fake Job Offer",
      type: "email",
      riskLevel: "Medium",
      description: "Suspicious remote job offer with upfront payment request",
      content: `Subject: Remote Work Opportunity - $25/hour

Hi there,

We found your profile and think you'd be perfect for our remote data entry position. No experience needed!

Pay: $25/hour
Hours: Flexible
Location: Work from home

To get started, you'll need to purchase our training materials ($149) and software license ($99). These are one-time fees and you'll make it back in your first week!

Reply with your phone number and we'll call you today.

Best regards,
HR Department`
    },
    {
      id: 3,
      title: "Package Delivery Scam",
      type: "sms",
      riskLevel: "High",
      description: "Fake delivery notification with malicious link",
      content: `From: +1-555-0199

USPS: Your package is waiting for delivery. Confirm your address and pay $2.99 shipping fee to receive it today.

Track package: http://usps-track-delivery.suspicious.com

Package ID: US9847562341`
    },
    {
      id: 4,
      title: "Social Media Account Verification",
      type: "dm",
      riskLevel: "Medium",
      description: "Fake verification badge offer on social media",
      content: `@instagram_official: Hello! Your account has been selected for verification. To receive your blue checkmark, please verify your identity by clicking this link and entering your login credentials.

Verify now: http://instagram-verify.fake-site.com

This is a limited-time offer. Accounts that don't verify within 24 hours will lose eligibility.

- Instagram Verification Team`
    }
  ];

  return (
    <div className="w-full">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between p-4 bg-card border-2 border-border rounded-xl hover:border-primary/50 transition-smooth"
        aria-expanded={isExpanded}
        aria-label="Toggle sample scenario library"
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-secondary/20 flex items-center justify-center">
            <Icon name="Library" size={20} color="var(--color-secondary)" />
          </div>
          <div className="text-left">
            <h3 className="text-base md:text-lg font-semibold text-foreground">
              Sample Scenario Library
            </h3>
            <p className="text-sm text-muted-foreground">
              {sampleScenarios?.length} practice scenarios available
            </p>
          </div>
        </div>
        <Icon 
          name={isExpanded ? 'ChevronUp' : 'ChevronDown'} 
          size={20} 
          color="var(--color-muted-foreground)" 
        />
      </button>
      {isExpanded && (
        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
          {sampleScenarios?.map((scenario) => (
            <div
              key={scenario?.id}
              className="bg-card border-2 border-border rounded-xl p-4 hover:border-primary/50 transition-smooth"
            >
              <div className="flex items-start justify-between gap-3 mb-3">
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm md:text-base font-semibold text-foreground mb-1 line-clamp-1">
                    {scenario?.title}
                  </h4>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-2 py-0.5 bg-muted text-muted-foreground text-xs rounded-full">
                      {scenario?.type?.toUpperCase()}
                    </span>
                    <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${
                      scenario?.riskLevel === 'High' ?'bg-accent/20 text-accent' :'bg-warning/20 text-warning'
                    }`}>
                      {scenario?.riskLevel} Risk
                    </span>
                  </div>
                </div>
              </div>
              <p className="text-xs text-muted-foreground mb-3 line-clamp-2">
                {scenario?.description}
              </p>
              <Button
                variant="outline"
                size="sm"
                iconName="Play"
                iconPosition="left"
                onClick={() => onLoadSample(scenario)}
                fullWidth
              >
                Load Sample
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SampleScenarioLibrary;