import { SplashScreen, Stack } from "expo-router";
import "../global.css";
import { useFonts } from "expo-font";
import { useEffect } from "react";
import { ClerkProvider, ClerkLoaded } from "@clerk/clerk-expo";
import { tokenCache } from "@/cache";
import Toast from "react-native-toast-message";
import toastConfig from "@/lib/toast";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import {
  BottomSheetModal,
  BottomSheetView,
  BottomSheetModalProvider,
} from "@gorhom/bottom-sheet";
import { StyleSheet } from "react-native";
import { Provider } from "react-redux";
import store from "@/redux/store";
import { PortalProvider } from "@gorhom/portal";
export default function RootLayout() {
  const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!;
  if (!publishableKey) {
    throw new Error("Add EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY to your .env file");
  }
  const [loaded, error] = useFonts({
    "Nunito-Light": require("@/assets/fonts/Nunito-Light.ttf"),
    "Nunito-Medium": require("@/assets/fonts/Nunito-Medium.ttf"),
    "Nunito-SemiBold": require("@/assets/fonts/Nunito-SemiBold.ttf"),
    "Nunito-Bold": require("@/assets/fonts/Nunito-Bold.ttf"),
    "Nunito-Black": require("@/assets/fonts/Nunito-Black.ttf"),
  });
  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);
  if (!loaded) return null;

  return (
    <Provider store={store}>
      <ClerkProvider
        tokenCache={tokenCache}
        publishableKey={publishableKey}
      >
        <ClerkLoaded>
          <PortalProvider>
            <GestureHandlerRootView style={styles.container}>
              <BottomSheetModalProvider>
                <Stack screenOptions={{ headerShown: false }} />
                <Toast config={toastConfig} />
              </BottomSheetModalProvider>
            </GestureHandlerRootView>
          </PortalProvider>
        </ClerkLoaded>
      </ClerkProvider>
    </Provider>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
