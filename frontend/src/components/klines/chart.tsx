
import {  createChart, ColorType } from 'lightweight-charts';
import React, { useEffect, useRef } from 'react';

export const ChartComponent = props => {
    const {
        data,
        colors: {
            backgroundColor = 'white',
            lineColor = '#2962FF',
            textColor = 'black',
            areaTopColor = '#2962FF',
            areaBottomColor = 'rgba(41, 98, 255, 0.28)',
        } = {},
    } = props;

    const chartContainerRef = useRef();

useEffect(() => {
  const chart = createChart(chartContainerRef.current, {
    layout: {
      background: { type: ColorType.Solid, color: backgroundColor },
      textColor,
    },
    width: chartContainerRef.current.clientWidth || 600,
    height: chartContainerRef.current.clientHeight || 400,
  });

  const handleResize = () => {
    chart.applyOptions({
      width: chartContainerRef.current.clientWidth,
      height: chartContainerRef.current.clientHeight,
    });
  };

  chart.timeScale().fitContent();

  const newSeries = chart.addCandlestickSeries({
    upColor: areaTopColor,
    downColor: areaBottomColor,
  });

  newSeries.setData(data);

  window.addEventListener("resize", handleResize);

  return () => {
    window.removeEventListener("resize", handleResize);
    chart.remove();
  };
}, [data]);

    return (
        <div
            ref={chartContainerRef}
        />
    );
};