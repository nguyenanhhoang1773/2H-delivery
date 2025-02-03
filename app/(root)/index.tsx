import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Link } from "expo-router";
import { useUser, useClerk } from "@clerk/clerk-expo";
import Toast from "react-native-toast-message";
import MaterialIcon from "@expo/vector-icons/MaterialIcons";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import FontistoIcon from "@expo/vector-icons/Fontisto";
import * as colors from "@/constants/color";
import { StatusBar } from "expo-status-bar";
import Swiper from "react-native-swiper";
import images from "@/constants/images";
import SwiperThumb from "@/components/Swiper";
import ItemCate from "@/components/ItemCate";
import MerchantItem from "@/components/MerchantItem";
import foods from "@/constants/data";
import Header from "@/components/Header";
import { useEffect, useState } from "react";
import * as Location from "expo-location";
export default function Index() {
  const { user } = useUser();
  const { signOut } = useClerk();
  console.log(user?.fullName);

  return (
    <View className="flex-1 bg-backgroundPrimary">
      <StatusBar style="light" />
      <Header isHome />
      <ScrollView
        bounces={false}
        contentContainerClassName="pt-4 pb-6"
        className="rounded-t-[30]  px-2  bg-white mt-4"
      >
        <SwiperThumb />
        <View className="px-2 mt-5">
          <View className="flex-row justify-between items-center">
            <Text className="text-2xl font-NunitoBlack">Bạn muốn ăn gì?</Text>
            <TouchableOpacity className="px-3 py-1 bg-backgroundPrimary rounded-full">
              <Text className="text-primary text-lg font-NunitoBold">All</Text>
            </TouchableOpacity>
          </View>
          <View className="mt-5 flex-row gap-2 items-center justify-center">
            <ItemCate title="Cơm" source={images.comTam} />
            <ItemCate title="Đồ ngọt" source={images.cheHat} />
            <ItemCate title="Đồ uống" source={images.traSuaKhoaiMon} />
            <ItemCate more />
          </View>
          <View className="flex-row justify-between items-center mt-16">
            <Text className="text-2xl font-NunitoBlack">Món ăn phổ biến</Text>
            <TouchableOpacity className="px-3 py-1 bg-backgroundPrimary rounded-full">
              <Text className="text-primary text-lg font-NunitoBold">All</Text>
            </TouchableOpacity>
          </View>
          <View className="mt-3">
            {foods.map((food, index) => (
              <MerchantItem
                key={food.id}
                id={food.id}
                title={food.title}
                source={food.source}
                price={food.price}
                type={food.type}
                star={food.star}
              />
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  btn: {
    padding: 10,
    borderRadius: "100%",
    backgroundColor: colors.secondPrimary,
  },
});
