import { View, Text } from "react-native";
import React from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import * as colors from "@/constants/color";

const Dots = ({ primary = false }: { primary?: boolean }) => {
  return (
    <View className="flex-row items-center ">
      <FontAwesome
        color={primary ? colors.lightPrimary : colors.textPrimary}
        size={5}
        name="circle"
      />
      <FontAwesome
        style={{ marginLeft: 3 }}
        color={primary ? colors.lightPrimary : colors.textPrimary}
        size={5}
        name="circle"
      />
      <FontAwesome
        style={{ marginLeft: 3 }}
        color={primary ? colors.lightPrimary : colors.textPrimary}
        size={5}
        name="circle"
      />
      <FontAwesome
        style={{ marginLeft: 3 }}
        color={primary ? colors.lightPrimary : colors.textPrimary}
        size={5}
        name="circle"
      />
      <FontAwesome
        style={{ marginLeft: 3 }}
        color={primary ? colors.lightPrimary : colors.textPrimary}
        size={5}
        name="circle"
      />
      <FontAwesome
        style={{ marginLeft: 3 }}
        color={primary ? colors.lightPrimary : colors.textPrimary}
        size={5}
        name="circle"
      />
      <FontAwesome
        style={{ marginLeft: 3 }}
        color={primary ? colors.lightPrimary : colors.textPrimary}
        size={5}
        name="circle"
      />
      <FontAwesome
        style={{ marginLeft: 3 }}
        color={primary ? colors.lightPrimary : colors.textPrimary}
        size={5}
        name="circle"
      />
    </View>
  );
};

export default Dots;
