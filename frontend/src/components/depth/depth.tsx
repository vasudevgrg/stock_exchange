"use client";
import React, { useEffect, useState } from "react";
import AskTable from "./ask-table";
import BidTable from "./bid-table";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import useWebSocket from "@/websocket/websocket";

const Depth = () => {
  const {messages, sendMessage, isConnected} = useWebSocket('ws://localhost:3003');
useEffect(() => {
  sendMessage(
    JSON.stringify({
      action: "subscribe",
      market: "TATA/INR",
    })
  );

  console.log("messaes", messages)
}, [sendMessage]);

const buy = messages.filter((o) => o.side === "buy").sort((a, b) => b.price - a.price);
const sell = messages.filter((o) => o.side === "sell").sort((a, b) => a.price - b.price);       

  return (
    <>
    <div style={{display: 'flex', flexDirection: 'column', width: '30%'}}>
      <AskTable asks={sell} />
      {/* <p>{trades[0].price}</p> */}
      <BidTable bids= {buy}/>
      </div>
    </>
  );
};

export default Depth;
