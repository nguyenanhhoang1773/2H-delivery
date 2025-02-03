import { View, Text, Image } from "react-native";
import React from "react";
import images from "@/constants/images";
import MaterialIcon from "@expo/vector-icons/MaterialIcons";
import * as colors from "@/constants/color";

const ItemCate = ({
  title,
  source,
  more = false,
}: {
  title?: string;
  source?: any;
  more?: boolean;
}) => {
  return !more ? (
    <View className="items-center flex-1  aspect-square">
      <Image source={source} className="w-full h-full rounded-2xl" />
      <View className="bg-[rgba(0,0,0,0.2)] absolute w-full h-full rounded-2xl"></View>
      <Text className="font-NunitoSemiBold text-xl mt-2">{title}</Text>
    </View>
  ) : (
    <View className="items-center flex-1 aspect-square bg-[rgba(0,0,0,0.80)] rounded-xl">
      <View className="w-full h-full justify-center items-center">
        <MaterialIcon
          color={colors.primary}
          name="restaurant-menu"
          style={{ fontSize: 60 }}
        />
      </View>
      <Text className="font-NunitoSemiBold text-xl mt-2">Khác</Text>
    </View>
  );
};

export default ItemCate;
