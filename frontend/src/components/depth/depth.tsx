"use client";
import React, { useEffect, useState } from "react";
import AskTable from "./ask-table";
import BidTable from "./bid-table";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

const Depth = () => {
 const orders = [
  { price: 100, quantity: 5, orderId: "b1", filled: 0, side: "buy", userId: "u1" },
  { price: 101, quantity: 3, orderId: "b2", filled: 1, side: "buy", userId: "u2" },
  { price: 102, quantity: 2, orderId: "b3", filled: 0, side: "buy", userId: "u3" },
  { price: 103, quantity: 7, orderId: "b4", filled: 2, side: "buy", userId: "u4" },
  { price: 104, quantity: 1, orderId: "b5", filled: 0, side: "buy", userId: "u5" },
  { price: 105, quantity: 4, orderId: "b6", filled: 1, side: "buy", userId: "u6" },
  { price: 106, quantity: 6, orderId: "b7", filled: 0, side: "buy", userId: "u7" },
  { price: 107, quantity: 8, orderId: "b8", filled: 3, side: "buy", userId: "u8" },
  { price: 108, quantity: 2, orderId: "b9", filled: 0, side: "buy", userId: "u9" },
  { price: 109, quantity: 9, orderId: "b10", filled: 4, side: "buy", userId: "u10" },
  { price: 110, quantity: 5, orderId: "b11", filled: 0, side: "buy", userId: "u11" },
  { price: 111, quantity: 3, orderId: "b12", filled: 0, side: "buy", userId: "u12" },
  { price: 112, quantity: 4, orderId: "b13", filled: 1, side: "buy", userId: "u13" },
  { price: 113, quantity: 6, orderId: "b14", filled: 0, side: "buy", userId: "u14" },
  { price: 114, quantity: 7, orderId: "b15", filled: 2, side: "buy", userId: "u15" },
  { price: 115, quantity: 1, orderId: "b16", filled: 0, side: "buy", userId: "u16" },
  { price: 116, quantity: 5, orderId: "b17", filled: 1, side: "buy", userId: "u17" },
  { price: 117, quantity: 2, orderId: "b18", filled: 0, side: "buy", userId: "u18" },
  { price: 118, quantity: 3, orderId: "b19", filled: 0, side: "buy", userId: "u19" },
  { price: 119, quantity: 4, orderId: "b20", filled: 1, side: "buy", userId: "u20" },

  { price: 120, quantity: 5, orderId: "s1", filled: 0, side: "sell", userId: "u21" },
  { price: 121, quantity: 3, orderId: "s2", filled: 1, side: "sell", userId: "u22" },
  { price: 122, quantity: 2, orderId: "s3", filled: 0, side: "sell", userId: "u23" },
  { price: 123, quantity: 7, orderId: "s4", filled: 2, side: "sell", userId: "u24" },
  { price: 124, quantity: 1, orderId: "s5", filled: 0, side: "sell", userId: "u25" },
  { price: 125, quantity: 4, orderId: "s6", filled: 1, side: "sell", userId: "u26" },
  { price: 126, quantity: 6, orderId: "s7", filled: 0, side: "sell", userId: "u27" },
  { price: 127, quantity: 8, orderId: "s8", filled: 3, side: "sell", userId: "u28" },
  { price: 128, quantity: 2, orderId: "s9", filled: 0, side: "sell", userId: "u29" },
  { price: 129, quantity: 9, orderId: "s10", filled: 4, side: "sell", userId: "u30" },
  { price: 130, quantity: 5, orderId: "s11", filled: 0, side: "sell", userId: "u31" },
  { price: 131, quantity: 3, orderId: "s12", filled: 0, side: "sell", userId: "u32" },
  { price: 132, quantity: 4, orderId: "s13", filled: 1, side: "sell", userId: "u33" },
  { price: 133, quantity: 6, orderId: "s14", filled: 0, side: "sell", userId: "u34" },
  { price: 134, quantity: 7, orderId: "s15", filled: 2, side: "sell", userId: "u35" },
  { price: 135, quantity: 1, orderId: "s16", filled: 0, side: "sell", userId: "u36" },
  { price: 136, quantity: 5, orderId: "s17", filled: 1, side: "sell", userId: "u37" },
  { price: 137, quantity: 2, orderId: "s18", filled: 0, side: "sell", userId: "u38" },
  { price: 138, quantity: 3, orderId: "s19", filled: 0, side: "sell", userId: "u39" },
  { price: 139, quantity: 4, orderId: "s20", filled: 1, side: "sell", userId: "u40" }
];

const buy = orders.filter((o) => o.side === "buy").sort((a, b) => b.price - a.price);
const sell = orders.filter((o) => o.side === "sell").sort((a, b) => a.price - b.price);       

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
