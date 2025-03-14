import {
  View,
  Text,
  Image,
  TextInput,
  StyleSheet,
  Touchable,
  TouchableOpacity,
} from "react-native";
import React, { useRef } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import Ionicons from "@expo/vector-icons/Ionicons";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { useUser, useClerk } from "@clerk/clerk-expo";
import * as colors from "@/constants/color";
import FontistoIcon from "@expo/vector-icons/Fontisto";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { selectQuantity } from "@/redux/features/cart/cartSlice";
import { router } from "expo-router";
import { selectUser } from "@/redux/features/user/userSlice";
const Header = ({ isHome, cartRef }: { isHome?: boolean; cartRef?: any }) => {
  const user = useAppSelector(selectUser);
  const quantityCart = useAppSelector(selectQuantity);
  if (isHome)
    return (
      <SafeAreaView
        edges={["top", "right", "left"]}
        className="bg-backgroundPrimary"
      >
        <View className="px-6">
          <View className="flex-row justify-between items-center">
            <View className="flex-row items-center">
              <Image
                source={{ uri: user?.imgUrl! }}
                className="size-10 rounded-full"
              />
              <View className="justify-center ml-2">
                <Text className="text-white font-NunitoSemiBold text-lg ml-1">
                  Vị trí của bạn
                </Text>
                <View className="flex-row items-center">
                  <MaterialIcons
                    color={colors.primary}
                    size={26}
                    name="location-on"
                  />

                  <Text className="text-white font-NunitoBold text-xl">
                    61 Lạc Long Quân
                  </Text>
                </View>
              </View>
            </View>
            <View className="flex-row items-center">
              <AntDesign
                style={styles.btn}
                color="white"
                size={24}
                name="shoppingcart"
              />
              <FontistoIcon
                style={[styles.btn, { marginLeft: 6 }]}
                color="white"
                size={24}
                name="bell"
              />
            </View>
          </View>
          <View className="flex-row items-center  rounded-3xl bg-secondBg p-4 mt-4">
            <Ionicons
              color={colors.textSecond}
              size={20}
              name="search"
            />
            <TextInput
              placeholderTextColor={colors.textSecond}
              placeholder="Tìm món ăn bạn muốn"
              className="text-white flex-1 text-xl ml-2  font-NunitoMedium"
            />
            <FontAwesome6
              color={colors.textSecond}
              size={20}
              name="sliders"
            />
          </View>
        </View>
      </SafeAreaView>
    );
  return (
    <SafeAreaView
      edges={["top", "right", "left"]}
      className="bg-backgroundPrimary pb-5 "
    >
      <View className="px-6">
        <View className="flex-row justify-between items-center">
          <View className="flex-row items-center">
            <Image
              source={{ uri: user?.imgUrl! }}
              className="size-10 rounded-full"
            />
            <View className="justify-center ml-2">
              <Text className="text-white font-NunitoSemiBold text-lg ml-1">
                Vị trí của bạn
              </Text>
              <View className="flex-row items-center">
                <MaterialIcons
                  color={colors.primary}
                  size={26}
                  name="location-on"
                />

                <Text className="text-white font-NunitoBold text-xl">
                  61 Lạc Long Quân
                </Text>
              </View>
            </View>
          </View>
          <TouchableOpacity
            onPress={() => router.push("/cart")}
            ref={cartRef}
            className="flex-row items-center justify-center py-2 px-4 bg-primary rounded-xl z-50"
          >
            <MaterialCommunityIcons
              size={24}
              name="cart-outline"
            />
            <Text className="font-NunitoBold ml-1">{quantityCart}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  btn: {
    padding: 10,
    borderRadius: "100%",
    backgroundColor: colors.secondPrimary,
  },
});
export default Header;
