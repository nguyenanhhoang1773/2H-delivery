import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import images from "@/constants/images";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import * as Linking from "expo-linking";
const Shipper = () => {
  const handleMakeCall = () => {
    Linking.openURL("tel:0375788434").catch((err) => {
      console.error("Failed to make a call", err);
    });
  };
  return (
    <View className="mt-2 px-5 py-4 items-center flex-row">
      <Image
        className="size-14 rounded-full"
        source={images.avatar}
      />
      <View className="justify-center ml-2 flex-1">
        <Text className="text-xl text-white font-NunitoBold">
          Nguyễn Sơn Tùng
        </Text>
        <Text className="text-lg text-textPrimary font-NunitoBold">
          Shipper
        </Text>
      </View>
      <View className="flex-row">
        <TouchableOpacity
          className="p-2 bg-thirdBg rounded-full"
          onPress={handleMakeCall}
        >
          <MaterialCommunityIcons
            size={26}
            name="phone"
          />
        </TouchableOpacity>
        <View className="p-2 ml-4 bg-thirdBg rounded-full">
          <MaterialCommunityIcons
            size={26}
            name="chat"
          />
        </View>
      </View>
    </View>
  );
};

export default Shipper;
