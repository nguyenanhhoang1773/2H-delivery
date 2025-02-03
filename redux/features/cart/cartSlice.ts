import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "@/redux/store";

// Define a type for the slice state
interface CartSlice {
  quantity: number;
  items: number[];
}

// Define the initial state using that type
const initialState: CartSlice = {
  quantity: 0,
  items: [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    removeCartItems: (state, action: PayloadAction<number>) => {
      state.quantity -= 1;
      state.items = state.items.filter((item) => item !== action.payload);
    },
    addCartItems: (state, action: PayloadAction<number>) => {
      state.quantity += 1;
      state.items.push(action.payload);
    },
  },
});

export const actions = cartSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectQuantity = (state: RootState) => state.cart.quantity;
export const selectCartItems = (state: RootState) => state.cart.items;
export default cartSlice.reducer;
