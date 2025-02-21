import { View, Text, Image, TouchableOpacity } from "react-native";
import images from "@/constants/images";
import * as colors from "@/constants/color";
import React from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { actions, selectCartItems } from "@/redux/features/cart/cartSlice";
import Entypo from "@expo/vector-icons/Entypo";

const CartItem = ({ id }: { id: number }) => {
  const dispatch = useAppDispatch();
  const cartItems = useAppSelector(selectCartItems);

  // Lấy số lượng sản phẩm từ Redux, nếu không có thì mặc định là 0
  const quantity = cartItems[id] ?? 0;

  const handleIncrease = () => {
    dispatch(actions.addCartItems(id));
  };

  const handleDecrease = () => {
    if (quantity > 1) {
      dispatch(actions.removeCartItems(id));
    }
  };

  return (
    <View className="mt-4 p-3 relative shadow bg-white rounded-xl flex-row items-center">
      <Image className="size-28 rounded-xl" source={images.comGa} />

      <View className="justify-between flex-1 ml-4">
        <View className="flex-1">
          <Text className="font-NunitoBold text-2xl">Cơm đùi gà lớn</Text>
          <Text className="font-NunitoBold text-textPrimary text-lg">
            108 đã bán
          </Text>
        </View>
        <View className="flex-row items-center justify-between">
          <View className="items-center flex-row py-1 bg-thirdBg rounded-full justify-center w-[90px]">
            {/* Nút giảm số lượng */}
            <TouchableOpacity
              onPress={handleDecrease}
              className="items-center justify-center pl-2 py-1"
              disabled={quantity <= 1}
            >
              <Entypo size={24} name="minus" color={quantity > 1 ? "black" : "gray"} />
            </TouchableOpacity>

            {/* Hiển thị số lượng */}
            <Text className="mx-2 py-1 text-textPrimary">{quantity}</Text>

            {/* Nút tăng số lượng */}
            <TouchableOpacity
              onPress={handleIncrease}
              className="items-center justify-center py-1 pr-2"
            >
              <Entypo size={24} name="plus" color="black" />
            </TouchableOpacity>
          </View>
          <Text style={{ color: colors.primary }} className="text-xl font-NunitoBold">
            đ50.000
          </Text>
        </View>
      </View>
    </View>
  );
};

export default CartItem;
