import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";

export const getMarketPriceAction = createAsyncThunk(
  'market/getMarketData',
  async (market_id: number, thunkAPI) => {
    try {
      const response = await axios.get(`http://localhost:8081/markets/${market_id}`);
      return response.data;
    } catch (err) {
      const error = err as AxiosError;
      return thunkAPI.rejectWithValue(error?.response?.data);
    }
  }
);