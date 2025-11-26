import React from 'react';
import { Region } from '../types';

interface RegionToggleProps {
  region: Region;
  onRegionChange: (region: Region) => void;
}

export const RegionToggle: React.FC<RegionToggleProps> = ({ region, onRegionChange }) => {
  return (
    <div className="flex gap-6 px-5 pt-2 mb-2">
      <button
        onClick={() => onRegionChange('KR')}
        className={`pb-2 text-xl font-bold transition-colors relative ${
          region === 'KR' ? 'text-toss-text' : 'text-toss-textTertiary'
        }`}
      >
        국내
        {region === 'KR' && (
          <div className="absolute bottom-0 left-0 w-full h-[3px] bg-toss-text rounded-full" />
        )}
      </button>
      <button
        onClick={() => onRegionChange('US')}
        className={`pb-2 text-xl font-bold transition-colors relative ${
          region === 'US' ? 'text-toss-text' : 'text-toss-textTertiary'
        }`}
      >
        미국
        {region === 'US' && (
          <div className="absolute bottom-0 left-0 w-full h-[3px] bg-toss-text rounded-full" />
        )}
      </button>
    </div>
  );
};