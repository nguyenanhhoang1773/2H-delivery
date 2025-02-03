import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import images from "@/constants/images";
import AntDesign from "@expo/vector-icons/AntDesign";
import * as colors from "@/constants/color";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import React, {
  Component,
  ElementRef,
  ReactNode,
  Ref,
  RefObject,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useAppDispatch } from "@/redux/hooks";
import { actions } from "@/redux/features/cart/cartSlice";
import Entypo from "@expo/vector-icons/Entypo";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
  withSpring,
  withDelay,
} from "react-native-reanimated";
import { Portal } from "@gorhom/portal";
const FoodItem = ({
  handlePress,
  id,
  isExist = false,
  cartRef,
}: {
  handlePress: any;
  id: number;
  isExist?: boolean;
  cartRef: RefObject<View>;
}) => {
  const [mounted, setMounted] = useState(false);
  const imgRef = useRef<Image>(null);
  const width = useSharedValue(20);
  const imgPosition = useSharedValue({ x: 0, y: 0 });
  const imgOpacity = useSharedValue(1);
  const [quantity, setQuantity] = useState<number>(0);
  const dispatch = useAppDispatch();

  const handleAddCart = () => {
    setQuantity((prev) => ++prev);
    dispatch(actions.addCartItems(1));
    showControlBtn();
  };
  useEffect(() => {
    if (mounted) {
      cartRef.current?.measure((x, y, width, height, pageX, pageY) => {
        imgPosition.value = withDelay(
          100,
          withTiming(
            { x: pageX, y: pageY },
            {
              duration: 1000, // Animation trong 500ms
            }
          )
        );
        imgOpacity.value = withDelay(
          100,
          withTiming(0, {
            duration: 1500, // Animation trong 500ms
          })
        );
      });
    }
  }, [mounted]);

  const showControlBtn = () => {
    width.value = withSpring(width.value + 40);
    imgRef.current?.measure((x, y, width, height, pageX, pageY) => {
      imgPosition.set({ x: pageX, y: pageY });
    });
    setMounted(true);
  };
  const animatedStyle = useAnimatedStyle(() => {
    return {
      width: width.value,
    };
  });
  const imgStyle = useAnimatedStyle(() => {
    return {
      position: "absolute",
      left: imgPosition.value.x,
      top: imgPosition.value.y,
      zIndex: 99,
      opacity: imgOpacity.value,
    };
  });
  return (
    <TouchableOpacity onPress={handlePress}>
      <View className="mt-4 p-3 relative shadow shadow-shadow bg-white rounded-xl flex-row items-center">
        <Image
          ref={imgRef}
          className="size-20 rounded-xl"
          source={images.comGa}
        />
        {mounted && (
          <Portal>
            <Animated.Image
              style={imgStyle}
              className="size-20 rounded-xl absolute  left-3"
              source={images.comGa}
            />
          </Portal>
        )}
        <View className="justify-between ml-2 flex-1">
          <View className="">
            <Text className="font-NunitoBold text-xl">Cơm đùi gà lớn</Text>
            <Text className="font-NunitoBold text-textPrimary text-lg">
              108 đã bán
            </Text>
          </View>
          <Text
            style={{ color: colors.primary }}
            className="text-xl font-NunitoSemiBold"
          >
            đ50.000
          </Text>
        </View>
        {quantity < 1 ? (
          <TouchableOpacity
            onPress={handleAddCart}
            className="items-center justify-center bg-thirdBg p-2 rounded-full"
          >
            <Entypo size={24} name="plus" />
          </TouchableOpacity>
        ) : (
          <View className="items-center flex-row justify-center">
            <Animated.View
              style={[animatedStyle]}
              className="flex-row items-center  bg-thirdBg rounded-l-full justify-center"
            >
              <TouchableOpacity
                onPress={() => {
                  setQuantity((prev) => --prev);
                  dispatch(actions.removeCartItems(1));
                  if (quantity == 1) width.value = 20;
                }}
                className="items-center justify-center pl-2 py-2   rounded-l-full"
              >
                <Entypo size={24} name="minus" />
              </TouchableOpacity>
              <Text
                className="mx-2 py-2 text-textPrimary
            "
              >
                {quantity}
              </Text>
            </Animated.View>
            <View className="bg-thirdBg rounded-r-full">
              <TouchableOpacity
                onPress={() => {
                  setQuantity((prev) => ++prev);
                  dispatch(actions.addCartItems(1));
                }}
                className="items-center justify-center  py-2 pr-2  "
              >
                <Entypo size={24} name="plus" />
              </TouchableOpacity>
            </View>
          </View>
        )}
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
export default FoodItem;
