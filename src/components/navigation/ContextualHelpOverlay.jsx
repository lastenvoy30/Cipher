import React, { useState, useEffect } from 'react';
import Icon from '../AppIcon';

const ContextualHelpOverlay = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [helpContent, setHelpContent] = useState(null);

  const openHelp = (content) => {
    setHelpContent(content);
    setIsOpen(true);
  };

  const closeHelp = () => {
    setIsOpen(false);
    setTimeout(() => setHelpContent(null), 250);
  };

  useEffect(() => {
    const handleOpenHelp = (event) => {
      openHelp(event?.detail);
    };

    const handleKeyDown = (event) => {
      if (event?.key === 'Escape' && isOpen) {
        closeHelp();
      }
    };

    window.addEventListener('open-contextual-help', handleOpenHelp);
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('open-contextual-help', handleOpenHelp);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  if (!isOpen || !helpContent) return null;

  return (
    <div className="contextual-help-overlay" onClick={closeHelp}>
      <div className="contextual-help-content" onClick={(e) => e?.stopPropagation()}>
        <div className="contextual-help-header">
          <h2 className="contextual-help-title">
            {helpContent?.title || 'Help & Information'}
          </h2>
          <button
            onClick={closeHelp}
            className="contextual-help-close"
            aria-label="Close help overlay"
          >
            <Icon name="X" size={20} color="var(--color-muted-foreground)" />
          </button>
        </div>

        <div className="contextual-help-body">
          {helpContent?.sections?.map((section, index) => (
            <div key={index} className="contextual-help-section">
              {section?.title && (
                <h3 className="contextual-help-section-title">{section?.title}</h3>
              )}
              <div className="contextual-help-section-content">
                {section?.content}
              </div>
            </div>
          ))}

          {helpContent?.relatedQuiz && (
            <div className="contextual-help-section">
              <h3 className="contextual-help-section-title">Test Your Knowledge</h3>
              <div className="contextual-help-section-content">
                <p className="mb-4">{helpContent?.relatedQuiz?.description}</p>
                <button
                  onClick={() => {
                    closeHelp();
                    window.dispatchEvent(new CustomEvent('start-quiz', { 
                      detail: helpContent.relatedQuiz 
                    }));
                  }}
                  className="px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium transition-smooth hover:shadow-glow-md"
                >
                  Start Quiz
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ContextualHelpOverlay;