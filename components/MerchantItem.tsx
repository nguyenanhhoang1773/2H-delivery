import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import images from "@/constants/images";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import AntDesign from "@expo/vector-icons/AntDesign";
import * as colors from "@/constants/color";
import { Link, router } from "expo-router";

const MerchantItem = ({
  title,
  type,
  source,
  price,
  star,
  id,
}: {
  title: string;
  type: string;
  source: any;
  price: string;
  star: string;
  id: number;
}) => {
  return (
    <TouchableOpacity
      onPress={() => router.push(`/merchant/${id}`)}
      className="flex-row p-2 mt-3 bg-white shadow shadow-shadow rounded-xl"
    >
      <Image source={source} className="size-32 rounded-2xl" />
      <View className="ml-4 flex-1 justify-between">
        <View>
          <View className="flex-row justify-between items-center">
            <View className="p-2 bg-secondPrimary rounded-xl">
              <Text className="font-NunitoBold text-sm text-textPrimary">
                {type}
              </Text>
            </View>
            <View className="flex-row">
              <MaterialIcons size={20} name="star" color={colors.primary} />
              <Text className="font-NunitoBold">{star}</Text>
            </View>
          </View>
          <Text className="font-NunitoBold text-2xl mt-1">{title}</Text>
        </View>
        <View className="flex-row justify-between items-center">
          <View className="flex-row items-center">
            <Text className="text-[#96bd00] font-NunitoSemiBold text-lg">
              đ
            </Text>
            <Text className="font-NunitoSemiBold text-lg">{price}</Text>
          </View>
          <AntDesign size={20} name="pluscircleo" />
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default MerchantItem;
