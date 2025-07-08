import React from 'react';
import { cn } from '../../lib/utils';

export const TimetableDisplay = ({
  slots,
  days,
  periods,
  title,
  className,
}) => {
  // Group slots by day and period
  const timetable = {};

  for (const slot of slots) {
    if (!timetable[slot.day]) {
      timetable[slot.day] = {};
    }
    timetable[slot.day][slot.period] = slot;
  }

  return (
    <div className={cn("space-y-4", className)}>
      {title && <h3 className="text-lg font-medium">{title}</h3>}
      
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr>
              <th className="border bg-muted px-4 py-2 text-left font-medium">Period</th>
              {days.map((day) => (
                <th key={day} className="border bg-muted px-4 py-2 text-left font-medium">
                  {day}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {periods.map((period) => (
              <tr key={period}>
                <td className="border px-4 py-2 font-medium bg-muted-100">
                  {period}
                </td>
                {days.map((day) => {
                  const slot = timetable[day]?.[period];
                  return (
                    <td key={`${day}-${period}`} className="border px-4 py-2">
                      {slot ? (
                        <div>
                          <div className="font-medium">{slot.subject}</div>
                          <div className="text-xs text-muted-foreground">
                            {slot.teacher} • Room {slot.room}
                          </div>
                        </div>
                      ) : (
                        <span className="text-muted-foreground text-sm">Free</span>
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
