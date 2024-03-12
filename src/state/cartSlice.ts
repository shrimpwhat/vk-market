import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  count: number;
  picture: string;
}

const initialState: Product[] = []

const cartSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    increment: (state, action: PayloadAction<number>) => {
      const index = state.findIndex(p => p.id === action.payload)
      ++state[index].count
    },

    decrement: (state, action: PayloadAction<number>) => {
      const index = state.findIndex(p => p.id === action.payload)
      ++state[index].count
    },

    remove: (state, action: PayloadAction<number>) => {
      return state.filter(p => p.id !== action.payload)
    }
  }
})

export const { increment, decrement, remove } = cartSlice.actions
export default cartSlice.reducer