import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "@/redux/store";

// Define a type for the slice state
interface UserState {
  id: string | null;
  email: string | null;
  fullname: string | null;
  imgUrl?: string;
  isLogin?: boolean;
  phone: number | null;
}

// Define the initial state using that type
const initialState: UserState = {
  id: null,
  fullname: null,
  email: null,
  phone: null,
  imgUrl:
    "https://cellphones.com.vn/sforum/wp-content/uploads/2023/10/avatar-trang-4.jpg",
  isLogin: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<UserState>) => {
      state.isLogin = true;
      state.fullname = action.payload.fullname;
      state.email = action.payload.email;
      state.id = action.payload.id;
      state.phone = action.payload.phone;
      if (action.payload.imgUrl) state.imgUrl = action.payload.imgUrl;
    },
    logout: (state) => {
      state.isLogin = false;
      state.fullname = null;
      state.email = null;
      state.imgUrl =
        "https://cellphones.com.vn/sforum/wp-content/uploads/2023/10/avatar-trang-4.jpg";
      state.id = null;
      state.phone = null;
    },
    addId: (state, action: PayloadAction<string>) => {
      state.id = action.payload;
    },
  },
});

export const { login, logout, addId } = userSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectIsLogin = (state: RootState) => state.user.isLogin;
export const selectUser = (state: RootState) => {
  return state.user;
};

export default userSlice.reducer;
