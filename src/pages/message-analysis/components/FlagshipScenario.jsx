import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const FlagshipScenario = ({ onLoadSample }) => {
  const flagshipScenario = {
    title: "College Admin Account Suspension",
    type: "email",
    description: "A common phishing scam targeting students with urgent account suspension warnings",
    riskLevel: "High",
    content: `Subject: URGENT: Your College Account Will Be Suspended

Dear Student,

Your college portal account has been flagged for suspicious activity and will be suspended within 24 hours unless you verify your identity immediately.

To prevent account suspension, click the link below and enter your student ID, password, and date of birth:

http://college-verify-portal.suspicious-domain.com/verify

Failure to verify within 24 hours will result in:
- Loss of access to course materials
- Inability to submit assignments
- Removal from class rosters
- Academic holds on your account

This is an automated security measure. Do not reply to this email.

IT Security Department
College Administration`
  };

  return (
    <div className="w-full bg-gradient-to-br from-accent/10 to-accent/5 border-2 border-accent/30 rounded-xl p-4 md:p-6">
      <div className="flex items-start gap-3 md:gap-4 mb-4">
        <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0">
          <Icon name="AlertTriangle" size={24} color="var(--color-accent)" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-2">
            <h3 className="text-lg md:text-xl font-semibold text-foreground">
              Featured Scenario
            </h3>
            <span className="px-2 py-1 bg-accent text-accent-foreground text-xs font-medium rounded-full whitespace-nowrap">
              {flagshipScenario?.riskLevel} Risk
            </span>
          </div>
          <p className="text-base md:text-lg font-medium text-foreground mb-1">
            {flagshipScenario?.title}
          </p>
          <p className="text-sm text-muted-foreground line-clamp-2">
            {flagshipScenario?.description}
          </p>
        </div>
      </div>
      <div className="bg-card/50 rounded-lg p-3 md:p-4 mb-4 max-h-[200px] overflow-y-auto">
        <pre className="text-xs md:text-sm text-foreground whitespace-pre-wrap font-mono">
          {flagshipScenario?.content}
        </pre>
      </div>
      <div className="flex flex-col sm:flex-row gap-3">
        <Button
          variant="default"
          iconName="Play"
          iconPosition="left"
          onClick={() => onLoadSample(flagshipScenario)}
          fullWidth
          className="sm:flex-1"
        >
          Try This Sample
        </Button>
        <Button
          variant="outline"
          iconName="BookOpen"
          iconPosition="left"
          onClick={() => {
            window.dispatchEvent(new CustomEvent('open-contextual-help', {
              detail: {
                title: 'Understanding Phishing Scams',
                sections: [
                  {
                    title: 'What is Phishing?',
                    content: 'Phishing is a cybercrime where attackers impersonate legitimate organizations to steal sensitive information like passwords, credit card numbers, or personal data.'
                  },
                  {
                    title: 'Common Warning Signs',
                    content: 'Urgent language, suspicious links, requests for personal information, poor grammar, generic greetings, and threats of account suspension are all red flags.'
                  },
                  {
                    title: 'How to Protect Yourself',
                    content: 'Always verify sender addresses, never click suspicious links, contact organizations directly through official channels, and use two-factor authentication.'
                  }
                ]
              }
            }));
          }}
          fullWidth
          className="sm:flex-1"
        >
          Learn More
        </Button>
      </div>
    </div>
  );
};

export default FlagshipScenario;