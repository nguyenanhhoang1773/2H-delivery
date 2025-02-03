import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import images from "@/constants/images";
import AntDesign from "@expo/vector-icons/AntDesign";
import * as colors from "@/constants/color";
import React, { RefObject, useState } from "react";
import { useAppDispatch } from "@/redux/hooks";
import { actions } from "@/redux/features/cart/cartSlice";
import Entypo from "@expo/vector-icons/Entypo";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from "react-native-reanimated";
const CartItem = ({
  handlePress,
  id,
  isExist = false,
}: {
  handlePress: any;
  id: number;
  isExist?: boolean;
}) => {
  const [quantity, setQuantity] = useState<number>(0);
  const dispatch = useAppDispatch();

  const handleAddCart = () => {
    setQuantity((prev) => ++prev);
    dispatch(actions.addCartItems(1));
  };

  return (
    <TouchableOpacity onPress={handlePress}>
      <View className="mt-4 p-3 relative shadow shadow-shadow bg-white rounded-xl flex-row items-center">
        <Image className="size-28 rounded-xl" source={images.comGa} />

        <View className="justify-between flex-1 ml-4 ">
          <View className="flex-1">
            <Text className="font-NunitoBold text-2xl">Cơm đùi gà lớn</Text>
            <Text className="font-NunitoBold text-textPrimary text-lg">
              108 đã bán
            </Text>
          </View>
          <View className="flex-row items-center justify-between">
            <View className="items-center flex-row py-1 bg-thirdBg rounded-full justify-center w-[90px]">
              <View className="flex-row items-center   justify-center">
                <TouchableOpacity
                  onPress={() => {
                    setQuantity((prev) => --prev);
                    dispatch(actions.removeCartItems(1));
                  }}
                  className="items-center justify-center pl-2 py-1   rounded-l-full"
                >
                  <Entypo size={24} name="minus" />
                </TouchableOpacity>
                <Text
                  className="mx-2 py-1 text-textPrimary
            "
                >
                  {quantity}
                </Text>
                <View className="">
                  <TouchableOpacity
                    onPress={() => {
                      setQuantity((prev) => ++prev);
                      dispatch(actions.addCartItems(1));
                    }}
                    className="items-center justify-center  py-1 pr-2  "
                  >
                    <Entypo size={24} name="plus" />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
            <Text
              style={{ color: colors.primary }}
              className="text-xl font-NunitoBold"
            >
              đ50.000
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "grey",
  },
  contentContainer: {
    flex: 1,
    padding: 36,
    alignItems: "center",
  },
});
export default CartItem;
