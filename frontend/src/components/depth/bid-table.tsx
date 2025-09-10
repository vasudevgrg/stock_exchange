'use client';

import { Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import React, { useEffect, useState } from "react";

interface Bid {
  size: number;
  price: number;
  total: number;
}

const BidTable = ({ bids = [] }) => {

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
          {bids.map((ask, index) => (
            <TableRow key={index}>
              <TableCell>{ask.price}</TableCell>
              <TableCell>{ask.quantity}</TableCell>
              <TableCell>{ask.total}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default BidTable;
