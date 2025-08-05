"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import React, { useEffect, useState } from "react";

interface Ask {
  size: number;
  price: number;
  total: number;
}

const AskTable = ({ asks = [] }) => {
  const [sortedAsks, setSortedAsks] = useState<Ask[]>([]);

  useEffect(() => {
    let sorted = [...asks].sort((a, b) => b[0] - a[0]);

    let prevTotal = 0;
    const calculated = sorted.map(([price, size]) => {
      const entry: Ask = {
        price,
        size,
        total: (Number(prevTotal) + Number(size)).toFixed(5),
      };
      prevTotal += Number(size);
      return entry;
    });

    setSortedAsks(calculated);
  }, [asks]);

  return (
    <div style={{background:"red", height:"400px", overflow:"scroll"}}>
    <Table  size="small">
      <TableHead>
        <TableRow>
          <TableCell><strong>Price</strong></TableCell>
          <TableCell><strong>Size</strong></TableCell>
          <TableCell><strong>Total</strong></TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {sortedAsks.map((ask, index) => (
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

export default AskTable;
