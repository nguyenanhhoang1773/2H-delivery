import { View, Text } from "react-native";
import React from "react";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import * as colors from "@/constants/color";
import Feather from "@expo/vector-icons/Feather";
import CartItem from "@/components/CartItem";
const CartPage = () => {
  const insets = useSafeAreaInsets();
  return (
    <View className="">
      <StatusBar style="light" translucent />
      <View
        className="bg-backgroundPrimary rounded-b-3xl px-5 pb-4  "
        style={{
          paddingTop: insets.top,
        }}
      >
        <View className=" flex-row items-center justify-between pt-4">
          <Text className="font-NunitoBold text-2xl text-white">Order</Text>
          <Feather color="white" size={20} name="x" />
        </View>
      </View>
      <View className="px-5 py-2">
        <CartItem id={1} handlePress={() => {}} />
        <CartItem id={1} handlePress={() => {}} />
        <CartItem id={1} handlePress={() => {}} />
      </View>
    </View>
  );
};

export default CartPage;
