import { View, Text, TouchableOpacity, FlatList } from "react-native";
import React, { useState, useRef, useCallback } from "react";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import Feather from "@expo/vector-icons/Feather";
import { useAppSelector } from "@/redux/hooks";
import { selectCartItems } from "@/redux/features/cart/cartSlice";
import CartItem from "@/components/CartItem";
import { BottomSheetBackdrop, BottomSheetModal, BottomSheetView } from "@gorhom/bottom-sheet";
import { backgroundGray, backgroundLogout } from "@/constants/color";
import dimension from "@/constants/constant";

const promoCodes = [
  "3H4KURO", "SAVE10", "FREESHIP", "DISCOUNT20", "SALE50", "NEWYEAR",
  "HOLIDAY30", "SUMMER15", "BLACKFRIDAY", "CYBERMONDAY", "SPRING25", "GHFGHFG",
  "HFGHFGH"
];

const CartPage = () => {
  const insets = useSafeAreaInsets();
  const cartItems = useAppSelector(selectCartItems);
  const cartArray = Object.entries(cartItems).map(([id, quantity]) => ({
    id: Number(id),
    quantity,
  }));
  const subtotal = cartArray.reduce((sum, item) => sum + item.quantity * 20, 0); // Giả sử giá 20$/sp
  const discount = 6;
  const total = subtotal - discount;

  const [selectedPromo, setSelectedPromo] = useState("3H4KURO");
  const bottomSheetRef = useRef<BottomSheetModal>(null);

  const handleOpenBottomSheet = useCallback(() => {
    bottomSheetRef.current?.present();
  }, []);

  const handleSelectPromo = useCallback((code: string) => {
    setSelectedPromo(code);
    bottomSheetRef.current?.dismiss();
  }, []);

  return (
    <View className="flex-1" >
      <StatusBar style="light"/>
      <View className="bg-black rounded-b-3xl px-5 pb-4" style={{ paddingTop: insets.top }}>
        <View className="flex-row items-center justify-between pt-4">
          <Text className="text-white text-2xl font-bold">Order</Text>
          <Feather color="white" size={24} name="x" />
        </View>
      </View>

      <FlatList
        data={cartArray}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <CartItem id={item.id} />}
      />

      <View className="bg-white p-5 rounded-t-3xl shadow-md">
        <TouchableOpacity onPress={handleOpenBottomSheet}>
          <View className="flex-row justify-between p-3 bg-gray-100 rounded-lg">
            <Text className="text-lg font-semibold">~{selectedPromo}</Text>
            <Text className="text-green-600 bg-yellow-200 px-3 py-1 rounded-full">
              Promocode Confirmed
            </Text>
          </View>
        </TouchableOpacity>

        <BottomSheetModal 
          ref={bottomSheetRef} 
          style={{ flex: 1 }}
          handleStyle={{ position: "absolute", right: 0, bottom: -20, left: 0 }}>

          <BottomSheetView className="p-4 flex-1"
            style={{ height: (dimension.height * 7) / 10, overflow: "hidden" }}
            >
            <Text className="text-xl font-bold mb-4">Chọn mã giảm giá</Text>
            <FlatList
              data={promoCodes}
              keyExtractor={(item) => item}
              renderItem={({ item }) => (
                <TouchableOpacity onPress={() => handleSelectPromo(item)} className="p-3 bg-gray-200 rounded-lg mb-2">
                  <Text className="text-lg font-semibold text-center">{item}</Text>
                </TouchableOpacity>
              )}
            />
          </BottomSheetView>
        </BottomSheetModal>

        <View className="mt-4 border-t pt-3 border-gray-200">
          <View className="flex-row justify-between mb-2">
            <Text className="text-gray-500">Subtotal</Text>
            <Text className="text-gray-900">${subtotal.toFixed(2)}</Text>
          </View>
          <View className="flex-row justify-between mb-2">
            <Text className="text-gray-500">Promocode</Text>
            <Text className="text-green-600">-${discount.toFixed(2)}</Text>
          </View>
          <View className="flex-row justify-between mt-2">
            <Text className="text-xl font-bold">Total</Text>
            <Text className="text-xl font-bold text-black">${total.toFixed(2)}</Text>
          </View>
        </View>
        <TouchableOpacity className="bg-black py-4 mt-5 rounded-xl items-center">
          <Text className="text-white text-lg font-bold">Order</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CartPage;