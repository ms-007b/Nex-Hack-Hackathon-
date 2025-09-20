import React, { useState, useEffect } from 'react';
import { TrendingUp } from 'lucide-react';

interface WeeklyCalendarProps {
  onStreakChange?: (streak: number) => void;
}

const WeeklyCalendar: React.FC<WeeklyCalendarProps> = ({ onStreakChange }) => {
  // State for tracking user progress
  const [streak, setStreak] = useState<number>(0);
  const [daysData, setDaysData] = useState<string[]>([]);
  const [lastPlayedDate, setLastPlayedDate] = useState<string | null>(null);

  // Day names for the calendar
  const dayNames = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  // Load state from localStorage on component mount
  useEffect(() => {
    const loadState = () => {
      const savedStreak = localStorage.getItem("streak");
      const savedDaysData = localStorage.getItem("daysData");
      const savedLastPlayedDate = localStorage.getItem("lastPlayedDate");

      setStreak(savedStreak ? parseInt(savedStreak) : 0);
      setDaysData(savedDaysData ? JSON.parse(savedDaysData) : []);
      setLastPlayedDate(savedLastPlayedDate);

      // Notify parent component about streak if callback provided
      if (onStreakChange && savedStreak) {
        onStreakChange(parseInt(savedStreak));
      }
    };

    loadState();
    handleMissedDays();
  }, [onStreakChange]);

  // Save state to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("streak", streak.toString());
    localStorage.setItem("daysData", JSON.stringify(daysData));
    if (lastPlayedDate) {
      localStorage.setItem("lastPlayedDate", lastPlayedDate);
    }
  }, [streak, daysData, lastPlayedDate]);

  // Handle missed days logic
  const handleMissedDays = () => {
    if (!lastPlayedDate) return;
    
    let lastDate = new Date(lastPlayedDate);
    let today = new Date();
    today.setHours(0, 0, 0, 0);
    lastDate.setHours(0, 0, 0, 0);
    
    let diff = Math.floor((today.getTime() - lastDate.getTime()) / (1000 * 60 * 60 * 24));
    
    if (diff > 1) {
      // Reset streak if more than one day missed (no streak freeze implemented here)
      setStreak(0);
      // Could show a notification here
    }
  };

  // Mark a day as completed
  const markDayAsCompleted = (dayIndex: number) => {
    const newDaysData = [...daysData];
    newDaysData[dayIndex] = "done";
    setDaysData(newDaysData);
    
    // Update streak
    setStreak(prev => prev + 1);
    
    // Update last played date
    const today = new Date().toISOString().split("T")[0];
    setLastPlayedDate(today);
    
    // Check for weekly completion bonus
    const today_day = new Date().getDay();
    if (today_day === 0 && newDaysData.filter(d => d === "done").length === 7) {
      // Weekly bonus logic could go here
      setDaysData([]);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-lg font-semibold text-gray-900">Weekly Progress</h3>
        <div className="flex items-center space-x-1">
          <TrendingUp className="h-4 w-4 text-green-500" />
          <span className="text-sm font-semibold text-green-600">
            {streak} day{streak !== 1 ? 's' : ''}
          </span>
        </div>
      </div>
      
      <div className="grid grid-cols-7 gap-2">
        {dayNames.map((day, index) => (
          <div 
            key={index}
            className={`
              text-center py-3 px-1 rounded-lg border text-sm font-medium
              ${daysData[index] === "done" 
                ? "bg-green-100 border-green-300 text-green-800" 
                : "bg-gray-50 border-gray-200 text-gray-700"}
            `}
          >
            <div>{day}</div>
            <div className="mt-1">
              {daysData[index] === "done" && (
                <span role="img" aria-label="completed">✅</span>
              )}
            </div>
          </div>
        ))}
      </div>
      
      {/* For testing purposes - in a real app this would be triggered by video completion */}
      <button 
        onClick={() => {
          const today = new Date();
          const dayIndex = today.getDay() === 0 ? 6 : today.getDay() - 1;
          if (!daysData[dayIndex]) {
            markDayAsCompleted(dayIndex);
          }
        }}
        className="mt-4 w-full py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
      >
        Mark Today Complete
      </button>
    </div>
  );
};

export default WeeklyCalendar;