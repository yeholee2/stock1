import React, { useState, useMemo, useEffect } from 'react';
import { Layout } from './components/Layout';
import { FilterToggle } from './components/FilterToggle';
import { RegionToggle } from './components/RegionToggle';
import { StockCard } from './components/StockCard';
import { StockDetail } from './components/StockDetail';
import { SortModal } from './components/SortModal';
import { CriteriaInfo } from './components/CriteriaInfo';
import { Stock, FitLevel, SortOption, Region } from './types';
import { MOCK_STOCKS } from './services/mockData';
import { SlidersHorizontal } from 'lucide-react';

const App: React.FC = () => {
  const [view, setView] = useState<'list' | 'detail'>('list');
  const [selectedStock, setSelectedStock] = useState<Stock | null>(null);
  const [filterLevel, setFilterLevel] = useState<FitLevel>(FitLevel.HIGH);
  const [region, setRegion] = useState<Region>('KR');
  const [sortOption, setSortOption] = useState<SortOption>('GAIN_DESC');
  const [isSortModalOpen, setIsSortModalOpen] = useState(false);

  // Auto-select first stock on PC on initial load
  useEffect(() => {
    if (window.innerWidth >= 768 && !selectedStock && MOCK_STOCKS.length > 0) {
        // Find first stock of default region
        const defaultStock = MOCK_STOCKS.find(s => s.region === 'KR' && s.fitLevel === FitLevel.HIGH);
        if (defaultStock) setSelectedStock(defaultStock);
    }
  }, []);

  const filteredAndSortedStocks = useMemo(() => {
    let result = MOCK_STOCKS.filter(s => s.region === region);
    result = result.filter(s => s.fitLevel === filterLevel);

    result = result.sort((a, b) => {
      switch (sortOption) {
        case 'GAIN_DESC':
          return ((b.currentPrice - b.discoveryPrice) / b.discoveryPrice) - ((a.currentPrice - a.discoveryPrice) / a.discoveryPrice);
        case 'RS_DESC':
          return b.rsScore - a.rsScore;
        case 'DATE_DESC':
          return a.discoveryDaysAgo - b.discoveryDaysAgo; 
        case 'VOLUME_DESC':
          return b.volumeSpike - a.volumeSpike;
        default:
          return 0;
      }
    });

    return result;
  }, [filterLevel, region, sortOption]);

  const handleStockClick = (stock: Stock) => {
    setSelectedStock(stock);
    setView('detail');
  };

  const handleBack = () => {
    setView('list');
    // On mobile we clear selectedStock to return to list view properly
    // On desktop we might want to keep it selected, but for shared state simplicity:
    setSelectedStock(null);
  };

  return (
    <Layout>
      <div className="flex flex-1 overflow-hidden h-screen">
        
        {/* Left Panel: List (Always visible on PC, hidden on Mobile if view=='detail') */}
        <div className={`
            w-full md:w-[400px] bg-white flex flex-col border-r border-toss-gray relative z-10
            ${view === 'detail' ? 'hidden md:flex' : 'flex'}
        `}>
          {/* Header Area */}
          <div className="bg-white sticky top-0 z-20 pb-0 shadow-sm">
            <header className="px-5 pt-6 pb-2 flex justify-between items-center">
                <div className="flex flex-col">
                    <span className="text-sm text-toss-textSecondary font-semibold mb-1">Minervini Scanner</span>
                    <RegionToggle region={region} onRegionChange={setRegion} />
                </div>
                <button 
                  onClick={() => setIsSortModalOpen(true)}
                  className="p-2 -mr-2 text-toss-textTertiary hover:bg-gray-100 rounded-full transition-colors"
                >
                  <SlidersHorizontal className="w-5 h-5" />
                </button>
            </header>
            <FilterToggle currentFilter={filterLevel} onFilterChange={setFilterLevel} />
          </div>

          <div className="flex-1 overflow-y-auto no-scrollbar">
            <CriteriaInfo level={filterLevel} />
            <div className="pb-10">
                {filteredAndSortedStocks.length > 0 ? (
                filteredAndSortedStocks.map(stock => (
                    <div 
                        key={stock.id} 
                        className={selectedStock?.id === stock.id ? 'bg-toss-lightBlue/30' : ''}
                    >
                        <StockCard stock={stock} onClick={handleStockClick} />
                    </div>
                ))
                ) : (
                <div className="flex flex-col items-center justify-center py-20 text-toss-textTertiary">
                    <span className="text-4xl mb-2">∅</span>
                    <p>No stocks found.</p>
                </div>
                )}
            </div>
          </div>
        </div>

        {/* Right Panel: Detail (Hidden on Mobile if view=='list', visible on PC) */}
        <div className={`
            flex-1 bg-gray-50 flex flex-col h-full overflow-hidden
            ${view === 'list' ? 'hidden md:flex' : 'flex'}
        `}>
            {selectedStock ? (
                <StockDetail stock={selectedStock} onBack={handleBack} />
            ) : (
                <div className="hidden md:flex flex-1 items-center justify-center text-toss-textTertiary flex-col gap-4">
                    <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center">
                        <SlidersHorizontal className="w-8 h-8 text-gray-300" />
                    </div>
                    <p className="font-medium">Select a stock to view details</p>
                </div>
            )}
        </div>

      </div>

      <SortModal 
        isOpen={isSortModalOpen} 
        onClose={() => setIsSortModalOpen(false)}
        currentSort={sortOption}
        onSortChange={setSortOption}
      />
    </Layout>
  );
};

export default App;