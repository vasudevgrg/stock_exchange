import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface TickerState {
  firstPrice: string; // Opening price
  high: string; // Highest price
  lastPrice: string; // Most recent traded price
  low: string; // Lowest price
  priceChange: string; // Absolute price change
  priceChangePercent: string; // Percentage price change (in decimal, e.g., 0.032773 means 3.28%)
  quoteVolume: string; // Volume in quote currency (e.g., USDC)
  symbol: string; // Trading pair symbol (e.g., AAVE_USDC)
  trades: string; // Number of trades
  volume: string;
}

const initialState: TickerState = {
  firstPrice: "281.63",
  high: "293.59",
  lastPrice: "290.86",
  low: "280.98",
  priceChange: "9.23",
  priceChangePercent: "0.032773",
  quoteVolume: "7407.99439",
  symbol: "AAVE_USDC",
  trades: "55",
  volume: "25.409",
};

export const tickerSlice = createSlice({
  name: "ticker",
  initialState,
  reducers: {
    updateCurrentValue: (state, action: PayloadAction<TickerState>) => {
      state= action.payload;
    },
  },
});

export const { updateCurrentValue } = tickerSlice.actions;

export default tickerSlice.reducer;
