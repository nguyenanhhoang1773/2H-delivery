import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  useWindowDimensions,
  StyleSheet,
  TextInput,
} from "react-native";
import React, { useState } from "react";
import { useLocalSearchParams } from "expo-router";
import Header from "@/components/Header";
import images from "@/constants/images";
import Fontisto from "@expo/vector-icons/Fontisto";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import * as colors from "@/constants/color";
import Octicons from "@expo/vector-icons/Octicons";
import EvilIcons from "@expo/vector-icons/EvilIcons";
import FoodItem from "@/components/FoodItem";
import AntDesign from "@expo/vector-icons/AntDesign";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import BottomSheet from "@gorhom/bottom-sheet";
import { useCallback, useMemo, useRef } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import {
  BottomSheetModal,
  BottomSheetView,
  BottomSheetModalProvider,
} from "@gorhom/bottom-sheet";
import dimension from "@/constants/constant";
import { useClerk, useUser } from "@clerk/clerk-expo";
import Entypo from "@expo/vector-icons/Entypo";
import Comment from "@/components/Comment";
import CustomBackdrop from "@/lib/Backdrop";
const MerchantPage = () => {
  const { user } = useUser();
  const { id } = useLocalSearchParams();
  const [showModal, setShowModal] = useState(false);
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const cartRef = useRef<View>(null);
  // callbacks
  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
    setShowModal(true);
  }, []);
  const handleSheetChanges = useCallback((index: number) => {
    console.log("handleSheetChanges", index);
    if (index < 0) setShowModal(false);
  }, []);
  return (
    <View className="bg-backgroundPrimary relative flex-1">
      <Header cartRef={cartRef} />

      <ScrollView
        bounces={false}
        className=" bg-white px-2 rounded-t-[30]"
        removeClippedSubviews
      >
        <View className="flex-1 py-4">
          <Image
            style={{ height: (dimension.height * 2) / 7 }}
            className="w-full px-2  rounded-[30]"
            source={images.comGa}
          />
          <View className=" mt-4">
            <View className="px-5">
              <View className="flex-row items-center justify-between">
                <Text className="font-NunitoBold text-3xl">
                  Cơm gà Gia Vĩnh
                </Text>
                <EvilIcons size={36} name="heart" />
              </View>
              <View className="flex-row items-center">
                <Text className="text-textPrimary text-lg">95 đánh giá</Text>
                <View className="h-5 bg-secondBg w-[1] mx-2"></View>
                <Text className=" text-lg font-NunitoBold">4.9</Text>
                <MaterialIcons
                  className="ml-1"
                  size={20}
                  color={colors.primary}
                  name="star"
                />
              </View>
            </View>
            <View className="flex-row items-center mt-4 py-4 border-t border-b  border-slate-100">
              <View className="items-center justify-center flex-1">
                <View className="flex-row items-center">
                  <Text className="font-NunitoBold text-xl">120</Text>
                  <MaterialCommunityIcons
                    className="ml-1"
                    color={colors.primary}
                    size={18}
                    name="comment"
                  />
                </View>
                <Text className="text-lg">Bình luận</Text>
              </View>
              <View className="items-center justify-center flex-1">
                <View className="flex-row items-center">
                  <Text className="font-NunitoBold text-xl">304</Text>
                  <AntDesign
                    className="ml-1"
                    color={colors.primary}
                    size={18}
                    name="heart"
                  />
                </View>
                <Text className="text-lg">Yêu thích</Text>
              </View>
              <View className="items-center justify-center flex-1">
                <View className="flex-row items-center">
                  <Text className="font-NunitoBold text-xl">2.312</Text>
                  <Octicons
                    color={colors.primary}
                    className="ml-1"
                    size={18}
                    name="package-dependents"
                  />
                </View>
                <Text className="text-lg">Đã bán</Text>
              </View>
            </View>
            <View className="py-4 px-5">
              <View className="flex-row justify-between items-center">
                <Text className="font-NunitoBold text-2xl ">Thực đơn</Text>
                <TouchableOpacity className="px-3 py-1 bg-backgroundPrimary rounded-full">
                  <Text className="text-primary text-lg font-NunitoBold">
                    All
                  </Text>
                </TouchableOpacity>
              </View>
              <View>
                <FoodItem
                  cartRef={cartRef}
                  id={1}
                  handlePress={handlePresentModalPress}
                />
                <FoodItem
                  cartRef={cartRef}
                  id={1}
                  handlePress={handlePresentModalPress}
                />
                <FoodItem
                  cartRef={cartRef}
                  id={1}
                  handlePress={handlePresentModalPress}
                />
                <FoodItem
                  cartRef={cartRef}
                  id={1}
                  handlePress={handlePresentModalPress}
                />
                <FoodItem
                  cartRef={cartRef}
                  id={1}
                  handlePress={handlePresentModalPress}
                />
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
      <BottomSheetModal
        backdropComponent={CustomBackdrop}
        ref={bottomSheetModalRef}
        style={{ flex: 1 }}
        handleStyle={{ position: "absolute", right: 0, bottom: -20, left: 0 }}
        handleIndicatorStyle={{
          backgroundColor: "rgba(0,0,0,0.7)", // Màu của thanh ngang
          width: 35, // Chiều rộng của thanh ngang
          height: 5, // Chiều cao của thanh ngang
        }}
        onChange={handleSheetChanges}
      >
        <BottomSheetView
          style={{ height: (dimension.height * 7) / 8, overflow: "hidden" }}
          className=""
        >
          <View className="flex-1">
            <Image
              source={images.banhMi}
              className="w-full h-[250px] rounded-t-2xl"
            />
            <View className="p-5  border-b  border-slate-100 ">
              <Text className="font-NunitoBold text-3xl ">
                Bánh mì đặc biệt
              </Text>
              <Text className="font-NunitoBold text-xl text-textPrimary ">
                3,2k đã bán
              </Text>
              <View className="flex-row items-center justify-between mt-2">
                <Text
                  style={{ color: colors.primary }}
                  className="text-2xl  font-NunitoBold"
                >
                  30.000
                </Text>
                <View className="flex-row items-center">
                  <AntDesign
                    color={colors.primary}
                    size={28}
                    name="pluscircleo"
                  />
                </View>
              </View>
            </View>
          </View>
          <View className="p-5 flex-1">
            <Text className="font-NunitoSemiBold text-2xl ">Bình luận</Text>
            <TextInput
              className="w-full px-4 py-4 border border-textSecond rounded-xl mt-2"
              placeholder="Để lại bình luận của bạn"
            />
            <ScrollView showsVerticalScrollIndicator={false} className="">
              <Comment />
              <Comment />
              <Comment />
              <Comment />
              <Comment />
              <Comment />
              <Comment />
              <Comment />
              <Comment />
              <Comment />
              <Comment isLast />
            </ScrollView>
          </View>
        </BottomSheetView>
      </BottomSheetModal>
    </View>
  );
};

export default MerchantPage;
