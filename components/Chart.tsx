import React, { useEffect, useRef } from 'react';
import { createChart, ColorType, IChartApi } from 'lightweight-charts';
import { ChartPoint } from '../types';

interface ChartProps {
  data: ChartPoint[];
  isPositive: boolean;
}

export const Chart: React.FC<ChartProps> = ({ data }) => {
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<IChartApi | null>(null);

  useEffect(() => {
    if (!chartContainerRef.current) return;

    const chart = createChart(chartContainerRef.current, {
      layout: {
        background: { type: ColorType.Solid, color: 'transparent' },
        textColor: '#8B95A1',
      },
      grid: {
        vertLines: { visible: false },
        horzLines: { color: '#F2F4F6', style: 1 },
      },
      width: chartContainerRef.current.clientWidth,
      height: 400,
      timeScale: {
        borderVisible: false,
        timeVisible: true,
        secondsVisible: false,
      },
      rightPriceScale: {
        borderVisible: false,
        scaleMargins: {
            top: 0.1,
            bottom: 0.1,
        },
      },
      crosshair: {
        vertLine: {
          color: '#B0B8C1',
          width: 1,
          style: 3,
          labelBackgroundColor: '#B0B8C1',
        },
        horzLine: {
          color: '#B0B8C1',
          width: 1,
          style: 3,
          labelBackgroundColor: '#B0B8C1',
        },
      },
    });

    // 1. Candlestick Series
    // User requested: Rise = Blue (#0064FF), Fall = Gray
    const candlestickSeries = chart.addCandlestickSeries({
      upColor: '#0064FF',
      borderUpColor: '#0064FF',
      wickUpColor: '#0064FF',
      downColor: '#9CA3AF',
      borderDownColor: '#9CA3AF',
      wickDownColor: '#9CA3AF',
    });

    const candleData = data.map(d => ({
      time: d.date,
      open: d.open,
      high: d.high,
      low: d.low,
      close: d.close,
    }));

    candlestickSeries.setData(candleData);

    // 2. Moving Averages (MA Lines)
    const ma5Series = chart.addLineSeries({
      color: '#000000',
      lineWidth: 1,
      title: 'MA5',
      crosshairMarkerVisible: false,
    });
    ma5Series.setData(data.map(d => ({ time: d.date, value: d.ma5 })));

    const ma20Series = chart.addLineSeries({
      color: '#EF4444', // Red for 20MA key support
      lineWidth: 2,
      title: 'MA20',
      crosshairMarkerVisible: false,
    });
    ma20Series.setData(data.map(d => ({ time: d.date, value: d.ma20 })));

    const ma60Series = chart.addLineSeries({
      color: '#10B981', // Green for trend
      lineWidth: 1,
      title: 'MA60',
      crosshairMarkerVisible: false,
    });
    ma60Series.setData(data.map(d => ({ time: d.date, value: d.ma60 })));

    
    // Fit content
    chart.timeScale().fitContent();

    // Resize handler
    const handleResize = () => {
      if (chartContainerRef.current) {
        chart.applyOptions({ width: chartContainerRef.current.clientWidth });
      }
    };
    window.addEventListener('resize', handleResize);

    chartRef.current = chart;

    return () => {
      window.removeEventListener('resize', handleResize);
      chart.remove();
    };
  }, [data]);

  return (
    <div className="relative">
        <div ref={chartContainerRef} className="w-full h-[400px]" />
        <div className="absolute top-2 left-2 flex gap-3 text-xs font-bold pointer-events-none opacity-70">
            <span className="text-black">MA5</span>
            <span className="text-red-500">MA20</span>
            <span className="text-emerald-500">MA60</span>
        </div>
    </div>
  );
};