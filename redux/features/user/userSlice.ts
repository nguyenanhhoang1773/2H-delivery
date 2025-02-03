import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "@/redux/store";

// Define a type for the slice state
interface UserState {
  fullname: string | null;
  imgUrl: string | null;
  isLogin: boolean;
}

// Define the initial state using that type
const initialState: UserState = {
  fullname: null,
  imgUrl: null,
  isLogin: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (
      state,
      action: PayloadAction<{ fullname: string; imgUrl: string }>
    ) => {
      state.isLogin = true;
      state.fullname = action.payload.fullname;
      state.imgUrl = action.payload.imgUrl;
    },
    logout: (state) => {
      state.isLogin = false;
      state.fullname = null;
      state.imgUrl = null;
    },
  },
});

export const { login, logout } = userSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectIsLogin = (state: RootState) => state.user.isLogin;
export const selectUser = (state: RootState) => {
  return { fullname: state.user.fullname, imgUrl: state.user.imgUrl };
};

export default userSlice.reducer;
