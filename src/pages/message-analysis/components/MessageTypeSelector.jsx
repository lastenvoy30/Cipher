import React from 'react';
import Icon from '../../../components/AppIcon';

const MessageTypeSelector = ({ selectedType, onTypeChange }) => {
  const messageTypes = [
    {
      id: 'email',
      label: 'Email',
      icon: 'Mail',
      description: 'Analyze suspicious emails and phishing attempts'
    },
    {
      id: 'sms',
      label: 'SMS',
      icon: 'MessageSquare',
      description: 'Check text messages for scams and fraud'
    },
    {
      id: 'dm',
      label: 'DM',
      icon: 'Send',
      description: 'Verify direct messages from social platforms'
    },
    {
      id: 'portal',
      label: 'Portal',
      icon: 'Globe',
      description: 'Validate college portal notifications'
    }
  ];

  return (
    <div className="w-full">
      <h3 className="text-base md:text-lg font-semibold text-foreground mb-3 md:mb-4">
        Select Message Type
      </h3>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
        {messageTypes?.map((type) => (
          <button
            key={type?.id}
            onClick={() => onTypeChange(type?.id)}
            className={`p-4 md:p-5 rounded-xl border-2 transition-smooth min-h-[100px] md:min-h-[120px] flex flex-col items-center justify-center gap-2 md:gap-3 ${
              selectedType === type?.id
                ? 'border-primary bg-primary/10 shadow-glow'
                : 'border-border bg-card hover:border-primary/50 hover:bg-muted'
            }`}
            aria-label={`Select ${type?.label} message type`}
            aria-pressed={selectedType === type?.id}
          >
            <div className={`w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center ${
              selectedType === type?.id ? 'bg-primary' : 'bg-muted'
            }`}>
              <Icon 
                name={type?.icon} 
                size={20} 
                color={selectedType === type?.id ? 'var(--color-primary-foreground)' : 'var(--color-muted-foreground)'} 
              />
            </div>
            <div className="text-center">
              <p className={`text-sm md:text-base font-medium ${
                selectedType === type?.id ? 'text-primary' : 'text-foreground'
              }`}>
                {type?.label}
              </p>
              <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                {type?.description}
              </p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default MessageTypeSelector;