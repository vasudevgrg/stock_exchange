"use client";
import React, { useEffect, useState } from "react";
import AskTable from "./ask-table";
import BidTable from "./bid-table";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

const Depth = () => {
  const [data, setData] = useState({ asks: [], bids: [] });
  const currentPrice = useSelector((state: RootState) => state.ticker.firstPrice);

  useEffect(() => {
    fetch("https://api.backpack.exchange/api/v1/depth?symbol=SOL_USDC")
      .then((res) => res.json())
      .then((data)=> {        setData(data);
      });
  }, []);

  return (
    <>
    <div style={{display: 'flex', flexDirection: 'column'}}>
      <AskTable asks={data.asks} />
      <p>{currentPrice}</p>
      <BidTable bids= {data.bids}/>
      </div>
    </>
  );
};

export default Depth;
