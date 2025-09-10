import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getMarketPriceAction } from './market.action';

export interface Order {
  id: number;
  type: 'buy' | 'sell';
  price: number;
  quantity: number;
  total: number;
  market_id: number;
  user_id: number;
}

interface Trade {
  id: number;
  seller_order_ids: number[];
  buyer_order_ids: number[];
  market_id: number;
  price: number;
  quantity: number;
}

interface Market {
  id: number;
  name: string;
  last_trade_id: number | null;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

interface MarketState {
  buyOrders: Order[];
  sellOrders: Order[];
  trades: Trade[];
  market: Market | null;
}

const initialState: MarketState = {
  buyOrders: [],
  sellOrders: [],
  trades: [],
  market: null,
};

export const marketSlice = createSlice({
  name: 'market',
  initialState,
  reducers: {
    setMarketData: (state, action: PayloadAction<MarketState>) => {
      state.buyOrders = action.payload.buyOrders;
      state.sellOrders = action.payload.sellOrders;
      state.trades = action.payload.trades;
      state.market = action.payload.market;
    },
    addBuyOrder: (state, action: PayloadAction<Order>) => {
      state.buyOrders.push(action.payload);
      state.buyOrders.sort((a, b) => b.price - a.price); // descending
    },
    addSellOrder: (state, action: PayloadAction<Order>) => {
      state.sellOrders.push(action.payload);
      state.sellOrders.sort((a, b) => a.price - b.price); // ascending
    },
    updateOrder: (state, action: PayloadAction<Order>) => {
      const orderList = action.payload.type === 'buy' ? state.buyOrders : state.sellOrders;
      const index = orderList.findIndex(o => o.id === action.payload.id);
      if (index !== -1) {
        orderList[index] = action.payload;
      }
    },
    removeOrder: (state, action: PayloadAction<{ id: number; type: 'buy' | 'sell' }>) => {
      if (action.payload.type === 'buy') {
        state.buyOrders = state.buyOrders.filter(o => o.id !== action.payload.id);
      } else {
        state.sellOrders = state.sellOrders.filter(o => o.id !== action.payload.id);
      }
    },
    addTrade: (state, action: PayloadAction<Trade>) => {
      state.trades.push(action.payload);
    },
    updateMarket: (state, action: PayloadAction<Partial<Market>>) => {
      if (state.market) {
        state.market = { ...state.market, ...action.payload };
      }
    },
  },
  extraReducers: (builder)=> {
    builder.addCase(getMarketPriceAction.fulfilled, (state, action)=> {
      state.buyOrders = action.payload.buyOrders;
      state.sellOrders = action.payload.sellOrders;
      state.trades = action.payload.trades;
      state.market = action.payload.market;
    })
  }
});

export const {
  setMarketData,
  addBuyOrder,
  addSellOrder,
  updateOrder,
  removeOrder,
  addTrade,
  updateMarket,
} = marketSlice.actions;

export default marketSlice.reducer;
