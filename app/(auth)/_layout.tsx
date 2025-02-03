import { Redirect, Slot, SplashScreen, Stack } from "expo-router";
import { useAuth, useUser } from "@clerk/clerk-expo";
export default function AuthLayout() {
  const { isSignedIn } = useAuth();
  if (isSignedIn) return <Redirect href={"/"} />;
  return <Slot />;
}
