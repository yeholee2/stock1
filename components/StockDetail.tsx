import React from 'react';
import { Stock } from '../types';
import { ArrowLeft, TrendingUp, TrendingDown } from 'lucide-react';
import { Chart } from './Chart';

interface StockDetailProps {
  stock: Stock;
  onBack: () => void;
}

export const StockDetail: React.FC<StockDetailProps> = ({ stock, onBack }) => {
  const isPositive = stock.changeRate >= 0;
  const discoveryGain = ((stock.currentPrice - stock.discoveryPrice) / stock.discoveryPrice) * 100;
  
  const formattedPrice = stock.currency === 'KRW' 
    ? stock.currentPrice.toLocaleString() + '원'
    : '$' + stock.currentPrice.toLocaleString();

  const formattedDiscoveryPrice = stock.currency === 'KRW'
    ? stock.discoveryPrice.toLocaleString() + '원'
    : '$' + stock.discoveryPrice.toLocaleString();

  return (
    <div className="bg-white h-full flex flex-col animate-in fade-in duration-300 overflow-y-auto">
      {/* Navbar - Hidden on Desktop split view usually, but good to have title */}
      <div className="sticky top-0 bg-white/95 backdrop-blur-sm z-20 px-4 h-14 flex items-center border-b border-toss-gray shrink-0">
        <button onClick={onBack} className="md:hidden p-2 -ml-2 hover:bg-gray-100 rounded-full">
          <ArrowLeft className="w-6 h-6 text-toss-text" />
        </button>
        <div className="ml-2 flex-1 flex justify-between items-center pr-2">
            <div className="flex flex-col md:flex-row md:items-baseline md:gap-2">
                <span className="font-bold text-lg text-toss-text">{stock.name}</span>
                <span className="text-sm text-toss-textTertiary">{stock.ticker}</span>
            </div>
            <div className={`font-bold ${isPositive ? 'text-toss-blue' : 'text-gray-400'}`}>
                 {isPositive ? '+' : ''}{stock.changeRate}%
            </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
          {/* Header Info */}
          <div className="p-6 text-center md:text-left md:flex md:justify-between md:items-end">
             <div>
                <div className="text-3xl font-bold text-toss-text mb-1">
                    {formattedPrice}
                </div>
                <div className="inline-block bg-toss-gray px-3 py-1 rounded-full">
                    <span className="text-xs font-bold text-toss-textSecondary">Fit Level: </span>
                    <span className="text-xs font-bold text-toss-blue">{stock.fitLevel}</span>
                </div>
             </div>
             <div className="mt-4 md:mt-0 text-right hidden md:block">
                <div className="text-sm text-toss-textTertiary">Discovery Gain</div>
                <div className="text-xl font-bold text-toss-blue">+{discoveryGain.toFixed(2)}%</div>
             </div>
          </div>

          <div className="h-2 bg-toss-gray"></div>

          {/* Section: Chart */}
          <div className="p-6">
            <h2 className="text-lg font-bold text-toss-text mb-4">Chart (Daily)</h2>
            <Chart data={stock.history} isPositive={isPositive} />
          </div>

          <div className="h-2 bg-toss-gray"></div>

          {/* Section: Momentum Summary */}
          <div className="p-6">
            <h2 className="text-lg font-bold text-toss-text mb-4">Core Momentum</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-toss-gray/30 p-4 rounded-2xl">
                    <div className="text-sm text-toss-textSecondary mb-1">RS Score</div>
                    <div className="text-2xl font-bold text-toss-blue">{stock.rsScore}</div>
                </div>
                <div className="bg-toss-gray/30 p-4 rounded-2xl">
                    <div className="text-sm text-toss-textSecondary mb-1">Alignment</div>
                    <div className="flex items-center gap-1 text-xl font-bold text-toss-text">
                        {stock.isAligned ? <TrendingUp className="w-5 h-5 text-toss-blue" /> : <TrendingDown className="w-5 h-5 text-gray-400" />}
                        <span className="text-base">{stock.isAligned ? 'Perfect' : 'Mixed'}</span>
                    </div>
                </div>
                <div className="bg-toss-gray/30 p-4 rounded-2xl">
                    <div className="text-sm text-toss-textSecondary mb-1">Vol Spike</div>
                    <div className="text-xl font-bold text-toss-blue">+{stock.volumeSpike}%</div>
                </div>
                <div className="bg-toss-gray/30 p-4 rounded-2xl">
                    <div className="text-sm text-toss-textSecondary mb-1">Industry RS</div>
                    <div className="text-xl font-bold text-toss-text">{stock.industryRs}</div>
                </div>
            </div>
          </div>

           {/* Section: Discovery Record */}
           <div className="p-6 pb-20">
            <h2 className="text-lg font-bold text-toss-text mb-4">Discovery Record</h2>
            <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                        <span className="block text-xs text-toss-textSecondary mb-1">First Picked Date</span>
                        <span className="block font-bold text-lg">{stock.discoveryDate} <span className="text-sm font-normal text-gray-500">(D+{stock.discoveryDaysAgo})</span></span>
                    </div>
                    <div>
                        <span className="block text-xs text-toss-textSecondary mb-1">Pick Price</span>
                        <span className="block font-bold text-lg">{formattedDiscoveryPrice}</span>
                    </div>
                    <div>
                         <span className="block text-xs text-toss-textSecondary mb-1">Total Return</span>
                         <span className="block font-bold text-xl text-toss-blue">+{discoveryGain.toFixed(2)}%</span>
                    </div>
                </div>
            </div>
           </div>
      </div>
    </div>
  );
};