import React from 'react';
import Icon from '../../../components/AppIcon';

const BadgeShowcase = ({ badges, streak }) => {
  return (
    <div className="bg-card border border-border rounded-xl p-4 md:p-6">
      <div className="flex items-center justify-between mb-4 md:mb-6">
        <h3 className="text-base md:text-lg font-semibold text-foreground">Achievements</h3>
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-accent/15">
          <Icon name="Flame" size={16} color="var(--color-accent)" className="md:w-5 md:h-5" />
          <span className="text-xs md:text-sm font-medium text-accent">{streak} Day Streak</span>
        </div>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
        {badges?.map((badge) => (
          <div
            key={badge?.id}
            className={`relative rounded-xl p-3 md:p-4 transition-smooth ${
              badge?.unlocked 
                ? 'bg-primary/10 border-2 border-primary hover:shadow-glow-md cursor-pointer' 
                : 'bg-muted/50 border border-border opacity-60'
            }`}
            title={badge?.unlocked ? badge?.description : 'Locked'}
          >
            {badge?.unlocked && badge?.isNew && (
              <div className="absolute -top-2 -right-2 w-6 h-6 md:w-7 md:h-7 bg-accent rounded-full flex items-center justify-center border-2 border-card">
                <span className="text-[10px] md:text-xs font-bold text-white">NEW</span>
              </div>
            )}
            
            <div className="flex flex-col items-center text-center space-y-2">
              <div 
                className={`w-12 h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 rounded-full flex items-center justify-center ${
                  badge?.unlocked ? badge?.bgColor : 'bg-muted'
                }`}
              >
                <Icon 
                  name={badge?.icon} 
                  size={24} 
                  color={badge?.unlocked ? badge?.iconColor : 'var(--color-muted-foreground)'} 
                  className="md:w-7 md:h-7 lg:w-8 lg:h-8"
                />
              </div>
              <div>
                <p className={`text-xs md:text-sm font-medium ${
                  badge?.unlocked ? 'text-foreground' : 'text-muted-foreground'
                }`}>
                  {badge?.name}
                </p>
                {badge?.unlocked && (
                  <p className="text-[10px] md:text-xs text-muted-foreground mt-1">
                    {badge?.earnedDate}
                  </p>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-4 md:mt-6 pt-4 md:pt-6 border-t border-border">
        <div className="flex items-center justify-between text-xs md:text-sm">
          <span className="text-muted-foreground">Badges Earned</span>
          <span className="text-foreground font-medium">
            {badges?.filter(b => b?.unlocked)?.length} / {badges?.length}
          </span>
        </div>
      </div>
    </div>
  );
};

export default BadgeShowcase;