import React from 'react';
import { FitLevel } from '../types';

interface FilterToggleProps {
  currentFilter: FitLevel;
  onFilterChange: (level: FitLevel) => void;
}

export const FilterToggle: React.FC<FilterToggleProps> = ({ currentFilter, onFilterChange }) => {
  const options = [
    { label: 'High Fit', value: FitLevel.HIGH },
    { label: 'Mid Fit', value: FitLevel.MID },
    { label: 'Low Fit', value: FitLevel.LOW },
  ];

  return (
    <div className="px-5 py-4 bg-white sticky top-0 z-10 border-b border-toss-gray/50">
      <div className="flex bg-toss-gray rounded-xl p-1">
        {options.map((option) => {
          const isActive = currentFilter === option.value;
          return (
            <button
              key={option.value}
              onClick={() => onFilterChange(option.value)}
              className={`flex-1 py-2.5 text-sm font-bold rounded-lg transition-all duration-200 ${
                isActive
                  ? 'bg-toss-blue text-white shadow-sm'
                  : 'text-toss-textSecondary hover:text-toss-text'
              }`}
            >
              {option.label}
            </button>
          );
        })}
      </div>
    </div>
  );
};