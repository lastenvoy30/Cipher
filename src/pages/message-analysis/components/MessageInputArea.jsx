import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const MessageInputArea = ({ messageType, messageContent, onContentChange, onAnalyze, isAnalyzing }) => {
  const [charCount, setCharCount] = useState(0);

  const placeholders = {
    email: `Subject: Your account needs verification

From: support@example.com
To: student@college.edu

Dear Student,

Please verify your account by clicking the link below...`,
    sms: `From: +1-555-0123

URGENT: Your bank account has been locked. Click here to unlock: http://suspicious-link.com`,
    dm: `@official_account: Hey! I noticed you're interested in our scholarship program. Click this link to apply: http://fake-scholarship.com`,
    portal: `College Portal Notification

Your course registration is incomplete. Update your information immediately to avoid being dropped from classes.

Click here: http://fake-portal.com`
  };

  const handleContentChange = (e) => {
    const content = e?.target?.value;
    setCharCount(content?.length);
    onContentChange(content);
  };

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard?.readText();
      onContentChange(text);
      setCharCount(text?.length);
    } catch (err) {
      console.error('Failed to read clipboard:', err);
    }
  };

  const handleClear = () => {
    onContentChange('');
    setCharCount(0);
  };

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-3 md:mb-4">
        <h3 className="text-base md:text-lg font-semibold text-foreground">
          Message Content
        </h3>
        <div className="flex items-center gap-2">
          <button
            onClick={handlePaste}
            className="px-3 py-2 text-sm text-muted-foreground hover:text-foreground transition-smooth flex items-center gap-2"
            aria-label="Paste from clipboard"
          >
            <Icon name="Clipboard" size={16} />
            <span className="hidden sm:inline">Paste</span>
          </button>
          {messageContent && (
            <button
              onClick={handleClear}
              className="px-3 py-2 text-sm text-muted-foreground hover:text-foreground transition-smooth flex items-center gap-2"
              aria-label="Clear message content"
            >
              <Icon name="X" size={16} />
              <span className="hidden sm:inline">Clear</span>
            </button>
          )}
        </div>
      </div>
      <div className="relative">
        <textarea
          value={messageContent}
          onChange={handleContentChange}
          placeholder={placeholders?.[messageType]}
          className="w-full h-[300px] md:h-[400px] p-4 md:p-5 bg-card border-2 border-border rounded-xl text-sm md:text-base text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-smooth resize-none font-mono"
          aria-label="Message content input"
        />
        <div className="absolute bottom-3 right-3 px-3 py-1 bg-muted/80 backdrop-blur-sm rounded-lg text-xs text-muted-foreground">
          {charCount} characters
        </div>
      </div>
      <div className="mt-4 md:mt-6 flex flex-col sm:flex-row gap-3">
        <Button
          variant="default"
          iconName="Shield"
          iconPosition="left"
          onClick={onAnalyze}
          disabled={!messageContent?.trim() || isAnalyzing}
          loading={isAnalyzing}
          fullWidth
          className="sm:flex-1"
        >
          {isAnalyzing ? 'Analyzing Message...' : 'Analyze Message'}
        </Button>
        <Button
          variant="outline"
          iconName="BookOpen"
          iconPosition="left"
          onClick={() => {
            window.dispatchEvent(new CustomEvent('open-contextual-help', {
              detail: {
                title: 'How Message Analysis Works',
                sections: [
                  {
                    title: 'Technical Analysis',
                    content: 'Our AI examines URLs, email headers, sender domains, and technical indicators to identify potential threats and security risks.'
                  },
                  {
                    title: 'Psychology Analysis',
                    content: 'We analyze the language, urgency tactics, authority claims, and manipulation techniques used in the message to detect social engineering attempts.'
                  },
                  {
                    title: 'Risk Assessment',
                    content: 'Based on technical and psychological factors, we provide a comprehensive risk score and actionable recommendations to protect yourself.'
                  }
                ]
              }
            }));
          }}
          fullWidth
          className="sm:flex-1"
        >
          How It Works
        </Button>
      </div>
    </div>
  );
};

export default MessageInputArea;