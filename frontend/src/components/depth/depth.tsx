"use client";
import React, { useEffect, useState } from "react";
import AskTable from "./ask-table";
import BidTable from "./bid-table";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

const Depth = () => {
  const { buyOrders, sellOrders, trades, market } = useSelector(
    (state: RootState) => state.market
  );

  return (
    <>
    <div style={{display: 'flex', flexDirection: 'column', width: '30%'}}>
      <AskTable asks={sellOrders} />
      {/* <p>{trades[0].price}</p> */}
      <BidTable bids= {buyOrders}/>
      </div>
    </>
  );
};

export default Depth;
