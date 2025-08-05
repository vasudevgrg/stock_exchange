"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import CandlestickChart from "./chart";

const Klines = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    axios
      .get(
        "https://api.backpack.exchange/api/v1/klines?symbol=SOL_USDC&interval=1h&startTime=1719782400&endTime=1719868800"
      )
      .then((e) => {
        console.log("ssddsds", e.data);
        setData(formattedData(e.data));
      });
  },[]);

  const formattedData = (rawData) =>
    rawData.map((entry) => ({
      time: Math.floor(new Date(entry.start).getTime() / 1000),
      open: parseFloat(entry.open),
      high: parseFloat(entry.high),
      low: parseFloat(entry.low),
      close: parseFloat(entry.close),
    }));
  return (
    <>
      <CandlestickChart candlestickData={data} />
      {/* <ChartComponent data= {data}></ChartComponent> */}
    </>
  );
};

export default Klines;
