'use client';

import { Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import React, { useEffect, useState } from "react";

interface Bid {
  size: number;
  price: number;
  total: number;
}

const BidTable = ({ bids = [] }) => {
  const [sortedBids, setSortedBids] = useState<Bid[]>([]);

  useEffect(() => {
    const sorted = [...bids].sort((a, b) => a[0] - b[0]);
    console.log('bids: ', bids);

    let prevTotal = 0;
    const calculated = sorted.map(([price, size]) => {
      const entry: Bid = {
        price,
        size,
        total: (Number(prevTotal) + Number(size)).toFixed(5),
      };
      prevTotal += Number(size);
      return entry;
    });

    setSortedBids(calculated);
  }, [bids]);
  return (
    <div style={{ background: "green", height: "400px", overflow: "scroll" }}>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>
              <strong>Price</strong>
            </TableCell>
            <TableCell>
              <strong>Size</strong>
            </TableCell>
            <TableCell>
              <strong>Total</strong>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {sortedBids.map((ask, index) => (
            <TableRow key={index}>
              <TableCell>{ask.price}</TableCell>
              <TableCell>{ask.size}</TableCell>
              <TableCell>{ask.total}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default BidTable;
