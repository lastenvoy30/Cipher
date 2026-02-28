import React, { useState, useEffect } from 'react';
import Icon from '../AppIcon';

const AchievementNotificationSystem = () => {
  const [notifications, setNotifications] = useState([]);

  const addNotification = (achievement) => {
    const newNotification = {
      id: Date.now(),
      ...achievement
    };
    setNotifications(prev => [...prev, newNotification]);

    setTimeout(() => {
      removeNotification(newNotification?.id);
    }, 5000);
  };

  const removeNotification = (id) => {
    setNotifications(prev => prev?.filter(notif => notif?.id !== id));
  };

  useEffect(() => {
    const handleAchievementUnlock = (event) => {
      addNotification(event?.detail);
    };

    window.addEventListener('achievement-unlocked', handleAchievementUnlock);

    return () => {
      window.removeEventListener('achievement-unlocked', handleAchievementUnlock);
    };
  }, []);

  if (notifications?.length === 0) return null;

  return (
    <div className="fixed top-6 right-6 z-[200] space-y-3">
      {notifications?.map((notification) => (
        <div key={notification?.id} className="achievement-notification">
          <div className="achievement-notification-header">
            <div className="achievement-notification-icon">
              <Icon 
                name={notification?.icon || 'Award'} 
                size={24} 
                color="var(--color-accent)" 
              />
            </div>
            <button
              onClick={() => removeNotification(notification?.id)}
              className="achievement-notification-close"
              aria-label="Close notification"
            >
              <Icon name="X" size={16} color="var(--color-muted-foreground)" />
            </button>
          </div>
          <div className="achievement-notification-content">
            <h3 className="achievement-notification-title">
              {notification?.title || 'Achievement Unlocked!'}
            </h3>
            <p className="achievement-notification-description">
              {notification?.description || 'You\'ve earned a new badge!'}
            </p>
            {notification?.points && (
              <div className="flex items-center gap-2 mt-2">
                <Icon name="Star" size={16} color="var(--color-warning)" />
                <span className="text-sm font-medium text-warning">
                  +{notification?.points} points
                </span>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default AchievementNotificationSystem;