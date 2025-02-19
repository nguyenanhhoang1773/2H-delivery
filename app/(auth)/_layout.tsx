import { Redirect, Slot, SplashScreen, Stack } from "expo-router";
import { useAuth, useUser } from "@clerk/clerk-expo";
import { useAppSelector } from "@/redux/hooks";
import { selectIsLogin } from "@/redux/features/user/userSlice";
export default function AuthLayout() {
  const isLogin = useAppSelector(selectIsLogin);
  if (isLogin) return <Redirect href={"/"} />;
  return <Slot />;
}
