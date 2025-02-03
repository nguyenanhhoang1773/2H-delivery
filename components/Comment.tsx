import { View, Text, Image } from "react-native";
import React from "react";
import { useUser } from "@clerk/clerk-expo";
import Entypo from "@expo/vector-icons/Entypo";
import * as colors from "@/constants/color";

const Comment = ({ isLast = false }: { isLast?: boolean }) => {
  const { user } = useUser();
  return (
    <View className={`${!isLast && "border-b  border-secondPrimary"}  py-5`}>
      <View className="flex-row items-center">
        <View className="flex-1 flex-row items-center">
          <Image
            className="size-10 rounded-full"
            source={{ uri: user?.imageUrl }}
          />
          <Text className="ml-2 font-NunitoSemiBold text-xl">
            {user?.fullName}
          </Text>
          <Text className="ml-2 font-NunitoMedium text-[14px] text-textPrimary">
            1 tiếng trước
          </Text>
        </View>
        <Entypo
          color={colors.textPrimary}
          size={20}
          name="dots-three-vertical"
        />
      </View>
      <Text className="font-NunitoLight text-lg mt-2 ">
        Thịt nướng khá thơm, mì giòn, mọi người nên thử
      </Text>
    </View>
  );
};

export default Comment;
