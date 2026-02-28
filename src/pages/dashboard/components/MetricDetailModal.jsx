import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const MetricDetailModal = ({ metric, onClose }) => {
  if (!metric) return null;

  return (
    <div 
      className="fixed inset-0 z-[200] bg-background/80 backdrop-blur-sm flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div 
        className="bg-card border border-border rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e?.stopPropagation()}
      >
        <div className="sticky top-0 bg-card border-b border-border p-4 md:p-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 md:w-12 md:h-12 rounded-lg flex items-center justify-center ${metric?.bgColor}`}>
              <Icon name={metric?.icon} size={24} color={metric?.iconColor} />
            </div>
            <div>
              <h2 className="text-lg md:text-xl font-semibold text-foreground">{metric?.label}</h2>
              <p className="text-sm text-muted-foreground">{metric?.subtitle}</p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            iconName="X"
            iconSize={20}
            aria-label="Close modal"
          />
        </div>

        <div className="p-4 md:p-6 space-y-4 md:space-y-6">
          <div className="grid grid-cols-2 gap-3 md:gap-4">
            <div className="bg-muted/50 rounded-lg p-3 md:p-4">
              <p className="text-xs md:text-sm text-muted-foreground mb-1">Current Value</p>
              <p className="text-2xl md:text-3xl font-bold text-foreground">{metric?.value}</p>
            </div>
            <div className="bg-muted/50 rounded-lg p-3 md:p-4">
              <p className="text-xs md:text-sm text-muted-foreground mb-1">Change</p>
              <p className="text-2xl md:text-3xl font-bold text-success">{metric?.change}</p>
            </div>
          </div>

          {metric?.breakdown && (
            <div>
              <h3 className="text-base md:text-lg font-semibold text-foreground mb-3 md:mb-4">Breakdown</h3>
              <div className="space-y-3">
                {metric?.breakdown?.map((item, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center gap-2 flex-1">
                      <div 
                        className="w-3 h-3 rounded-full flex-shrink-0"
                        style={{ background: item?.color }}
                      />
                      <span className="text-sm md:text-base text-foreground">{item?.label}</span>
                    </div>
                    <span className="text-sm md:text-base font-semibold text-foreground">{item?.value}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {metric?.weeklyData && (
            <div>
              <h3 className="text-base md:text-lg font-semibold text-foreground mb-3 md:mb-4">Weekly Trend</h3>
              <div className="space-y-2">
                {metric?.weeklyData?.map((day, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <span className="text-xs md:text-sm text-muted-foreground w-12">{day?.day}</span>
                    <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                      <div 
                        className="h-full rounded-full transition-all duration-500"
                        style={{ 
                          width: `${(day?.value / Math.max(...metric?.weeklyData?.map(d => d?.value))) * 100}%`,
                          background: metric?.iconColor
                        }}
                      />
                    </div>
                    <span className="text-xs md:text-sm font-medium text-foreground w-8 text-right">{day?.value}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MetricDetailModal;