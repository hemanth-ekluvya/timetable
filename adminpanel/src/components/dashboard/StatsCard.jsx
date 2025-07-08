
import React from 'react';
import { cn } from '../../lib/utils';

export const StatsCard = ({
  title,
  value,
  icon,
  className,
}) => {
  return (
    <div className={cn("stats-card", className)}>
      <div className="flex justify-between items-center">
        <div>
          <p className="stats-card-title">{title}</p>
          <p className="stats-card-value">{value}</p>
        </div>
        {icon && <div className="text-muted-foreground">{icon}</div>}
      </div>
    </div>
  );
};
