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
  price: number;
  quantity: number;
  total: number;
}

const AskTable = ({ asks }: { asks: Ask[] }) => {

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
        {asks.map((ask, index) => (
          <TableRow key={index}>
            <TableCell>{ask.price}</TableCell>
            <TableCell>{ask.quantity}</TableCell>
            <TableCell>{ask.price * ask.quantity}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
    </div>
  );
};

export default AskTable;
