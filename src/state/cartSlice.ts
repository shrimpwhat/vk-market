import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "./store";

export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  count: number;
  image: string;
}

interface CartState {
  products: Product[];
  total: number;
}

const initialState: CartState = {
  products: [],
  total: 0,
};

const cartSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    loadCart: (state, action: PayloadAction<Product[]>) => {
      state.products = action.payload;
      state.total = action.payload.reduce(
        (acc, current) => acc + current.count * current.price,
        0
      );
    },

    increment: (state, action: PayloadAction<number>) => {
      const index = state.products.findIndex((p) => p.id === action.payload);
      const product = state.products[index]
      if (product.count < 10) {
        ++product.count;
        state.total += product.price
      }
    },

    decrement: (state, action: PayloadAction<number>) => {
      const index = state.products.findIndex((p) => p.id === action.payload);
      const product = state.products[index]
      if (product.count > 1) {
        --product.count;
        state.total -= product.price
      }
    },

    remove: (state, action: PayloadAction<number>) => {
      state.products = state.products.filter((p) => {
        const flag = p.id !== action.payload
        if (!flag)
          state.total -= p.count * p.price
        return flag
      });
    },
  },
});

export const { loadCart, increment, decrement, remove } = cartSlice.actions;

export const localeSum = (value: number) =>
  value.toLocaleString("ru-RU", {
    maximumFractionDigits: 2
  }).concat(" руб.")

export const selectTotalSum = (state: RootState) => localeSum(state.cart.total)

export default cartSlice.reducer;
