"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { ChartComponent } from "./chart";

const Klines = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    axios
      .get(
        "http://localhost:3002/klines?market=TATA_INR&interval=1m"
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
      <ChartComponent data={data}></ChartComponent>
    </>
  );
};

export default Klines;
