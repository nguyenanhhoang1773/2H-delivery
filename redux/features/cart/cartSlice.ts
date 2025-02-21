import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "@/redux/store";

// Define state
interface CartState {
  items: Record<number, number>; // { productId: quantity }
}

// Initial state
const initialState: CartState = {
  items: {},
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addCartItems: (state, action: PayloadAction<number>) => {
      const productId = action.payload;
      if (state.items[productId]) {
        state.items[productId] += 1; // Tăng số lượng nếu sản phẩm đã tồn tại
      } else {
        state.items[productId] = 1; // Thêm sản phẩm mới với số lượng 1
      }
    },
    removeCartItems: (state, action: PayloadAction<number>) => {
      const productId = action.payload;
      if (state.items[productId] && state.items[productId] > 1) {
        state.items[productId] -= 1; // Giảm số lượng nhưng không nhỏ hơn 1
      } else {
        delete state.items[productId]; // Nếu số lượng về 0 thì xóa khỏi giỏ hàng
      }
    },
  },
});

export const actions = cartSlice.actions;
export const selectCartItems = (state: RootState) => state.cart.items;
export default cartSlice.reducer;
