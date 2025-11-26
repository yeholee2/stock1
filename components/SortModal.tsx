import React from 'react';
import { SortOption } from '../types';

interface SortModalProps {
  currentSort: SortOption;
  onSortChange: (option: SortOption) => void;
  isOpen: boolean;
  onClose: () => void;
}

export const SortModal: React.FC<SortModalProps> = ({ currentSort, onSortChange, isOpen, onClose }) => {
  if (!isOpen) return null;

  const options: { label: string; value: SortOption }[] = [
    { label: 'Highest Return %', value: 'GAIN_DESC' },
    { label: 'Highest RS Score', value: 'RS_DESC' },
    { label: 'Newest Pick', value: 'DATE_DESC' },
    { label: 'Highest Volume', value: 'VOLUME_DESC' },
  ];

  return (
    <div className="absolute inset-0 z-50 flex items-end sm:items-center justify-center bg-black/40 backdrop-blur-sm" onClick={onClose}>
      <div className="w-full max-w-md bg-white rounded-t-2xl sm:rounded-2xl p-6 animate-in slide-in-from-bottom duration-200" onClick={e => e.stopPropagation()}>
        <h3 className="text-lg font-bold mb-4 text-toss-text">Sort by</h3>
        <div className="space-y-1">
          {options.map((opt) => (
            <button
              key={opt.value}
              onClick={() => {
                onSortChange(opt.value);
                onClose();
              }}
              className={`w-full text-left py-3 px-2 rounded-lg text-base font-medium flex justify-between items-center ${
                currentSort === opt.value ? 'text-toss-blue bg-toss-lightBlue' : 'text-toss-text hover:bg-gray-50'
              }`}
            >
              {opt.label}
              {currentSort === opt.value && <span className="text-toss-blue text-lg">✓</span>}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};