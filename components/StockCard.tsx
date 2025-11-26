import React from 'react';
import { Stock } from '../types';
import { ChevronRight } from 'lucide-react';

interface StockCardProps {
  stock: Stock;
  onClick: (stock: Stock) => void;
}

export const StockCard: React.FC<StockCardProps> = ({ stock, onClick }) => {
  const isPositive = stock.changeRate >= 0;
  
  // Calculate gain from discovery
  const discoveryGain = ((stock.currentPrice - stock.discoveryPrice) / stock.discoveryPrice) * 100;
  
  const formattedPrice = stock.currency === 'KRW' 
    ? stock.currentPrice.toLocaleString() + '원'
    : '$' + stock.currentPrice.toLocaleString();
    
  const formattedDiscoveryPrice = stock.currency === 'KRW'
    ? stock.discoveryPrice.toLocaleString()
    : '$' + stock.discoveryPrice.toLocaleString();
    
  const formattedCurrentPriceSimple = stock.currency === 'KRW'
    ? stock.currentPrice.toLocaleString()
    : '$' + stock.currentPrice.toLocaleString();

  return (
    <div 
      onClick={() => onClick(stock)}
      className="p-5 border-b border-toss-gray active:bg-gray-50 transition-colors cursor-pointer"
    >
      {/* Header */}
      <div className="flex justify-between items-start mb-2">
        <div>
          <h3 className="text-lg font-bold text-toss-text leading-tight">
            {stock.name} <span className="text-sm font-normal text-toss-textTertiary ml-1">{stock.ticker}</span>
          </h3>
        </div>
        <ChevronRight className="w-5 h-5 text-toss-textTertiary" />
      </div>

      {/* Price */}
      <div className="flex items-baseline gap-2 mb-3">
        <span className="text-xl font-bold text-toss-text">
          {formattedPrice}
        </span>
        <span className={`text-base font-medium ${isPositive ? 'text-toss-blue' : 'text-gray-400'}`}>
          {isPositive ? '+' : ''}{stock.changeRate}%
        </span>
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-2 mb-4">
        <span className="bg-toss-lightBlue text-toss-blue text-xs font-bold px-2 py-1 rounded-md">
          RS {stock.rsScore}↑
        </span>
        {stock.volumeSpike >= 150 && (
          <span className="bg-toss-lightBlue text-toss-blue text-xs font-bold px-2 py-1 rounded-md">
            Vol ↑ {stock.volumeSpike}%
          </span>
        )}
        {stock.isAligned && (
          <span className="bg-toss-lightBlue text-toss-blue text-xs font-bold px-2 py-1 rounded-md">
            Aligned
          </span>
        )}
        {stock.marketStrength > 0 && (
          <span className="bg-toss-lightBlue text-toss-blue text-xs font-bold px-2 py-1 rounded-md">
            Mkt +{stock.marketStrength}%
          </span>
        )}
      </div>

      {/* Discovery Info - Toss Style Footer */}
      <div className="bg-toss-gray/50 rounded-xl p-3">
        <div className="flex justify-between items-center text-xs text-toss-textSecondary mb-1">
          <span>First Picked: {stock.discoveryDate} (D+{stock.discoveryDaysAgo})</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm text-toss-textSecondary">
             {formattedDiscoveryPrice} → <span className="text-toss-text font-medium">{formattedCurrentPriceSimple}</span>
          </span>
          <span className="text-sm font-bold text-toss-blue">
             +{discoveryGain.toFixed(2)}%
          </span>
        </div>
      </div>
    </div>
  );
};