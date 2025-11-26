import React from 'react';
import { FitLevel } from '../types';

interface CriteriaInfoProps {
  level: FitLevel;
}

export const CriteriaInfo: React.FC<CriteriaInfoProps> = ({ level }) => {
  const getCriteria = () => {
    switch (level) {
      case FitLevel.HIGH:
        return [
          'RS Score ≥ 90',
          'Perfect Alignment (5 > 20 > 60)',
          'Volume ≥ +180%',
          'Market Strength +20% ↑'
        ];
      case FitLevel.MID:
        return [
          'RS Score ≥ 80',
          'Aligned or Pre-aligned',
          'Volume ≥ +130%',
        ];
      case FitLevel.LOW:
        return [
          'RS Score 70 ~ 80',
          'Above 20MA',
          'Volume ≥ 100% Avg',
        ];
    }
  };

  return (
    <div className="px-5 py-4 bg-white mb-2">
      <div className="bg-toss-gray/30 rounded-xl p-4 border border-toss-gray">
        <h4 className="text-xs font-bold text-toss-textSecondary mb-2 uppercase tracking-wide">
            Algorithm Logic ({level})
        </h4>
        <div className="flex flex-wrap gap-2">
            {getCriteria().map((crit, idx) => (
                <span key={idx} className="text-xs font-medium text-toss-text bg-white px-2 py-1 rounded shadow-sm border border-gray-100">
                    {crit}
                </span>
            ))}
        </div>
      </div>
    </div>
  );
};