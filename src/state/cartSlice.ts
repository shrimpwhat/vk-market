import { PayloadAction, createSlice, isAnyOf } from "@reduxjs/toolkit";
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
    },

    increment: (state, action: PayloadAction<number>) => {
      const index = state.products.findIndex((p) => p.id === action.payload);
      if (state.products[index].count < 10) ++state.products[index].count;
    },

    decrement: (state, action: PayloadAction<number>) => {
      const index = state.products.findIndex((p) => p.id === action.payload);
      if (state.products[index].count > 1) --state.products[index].count;
    },

    remove: (state, action: PayloadAction<number>) => {
      state.products = state.products.filter((p) => p.id !== action.payload);
    },
  },

  extraReducers: (builder) => {
    builder.addMatcher(
      isAnyOf(loadCart, increment, decrement, remove),
      (state) => {
        state.total = state.products.reduce(
          (acc, current) => acc + current.count * current.price,
          0
        );
      }
    );
  },
});

export const { loadCart, increment, decrement, remove } = cartSlice.actions;

export const selectTotalSum = (state: RootState) =>
  state.cart.total.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  });

export default cartSlice.reducer;
