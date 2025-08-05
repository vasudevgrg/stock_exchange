'use client';

import React, { useRef, useEffect } from 'react';
import {
  createChart,
  CandlestickSeriesOptions,
  IChartApi,
} from 'lightweight-charts';

type CandlePoint = {
  time: string;
  open: number;
  high: number;
  low: number;
  close: number;
};

interface CandlestickChartProps {
  candlestickData: CandlePoint[];
}

const CandlestickChart: React.FC<CandlestickChartProps> = ({ candlestickData }) => {
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<IChartApi | null>(null);

  useEffect(() => {
    if (!chartContainerRef.current) return;

    // Create chart
    chartRef.current = createChart(chartContainerRef.current, {
      layout: {
        textColor: 'black',
        background: { type: 'solid', color: 'white' },
      },
      width: chartContainerRef.current.clientWidth,
      height: 400,
    });

    const chart = chartRef.current;

    // Candlestick Series
    const candleSeries = chart.addCandlestickSeries({
      upColor: '#26a69a',
      downColor: '#ef5350',
      borderVisible: false,
      wickUpColor: '#26a69a',
      wickDownColor: '#ef5350',
    } as CandlestickSeriesOptions);
    candleSeries.setData(candlestickData);

    chart.timeScale().fitContent();

    // Cleanup on unmount
    return () => chart.remove();
  }, [candlestickData]);

  return <div ref={chartContainerRef} style={{ width: '100%', height: 400 }} />;
};

export default CandlestickChart;
