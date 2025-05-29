import { View, Text, Image, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import images from "@/constants/images";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import AntDesign from "@expo/vector-icons/AntDesign";
import * as colors from "@/constants/color";
import { Link, router } from "expo-router";
import axios from "@/axios";
import { LearnMoreLinks } from "react-native/Libraries/NewAppScreen";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { selectUser } from "@/redux/features/user/userSlice";

const MerchantItem = ({
  title,
  source,
  star,
  id,
}: {
  title: string;
  source: any;
  star: any;
  id: string;
}) => {
  const [activeLike, setActiveLike] = useState(false);
  const user = useAppSelector(selectUser);

  const handleActive = () => {
    setActiveLike(true);
    console.log("eateryId:", id);
    if (user.id) {
      axios
        .post("/addFavoriteEatery", {
          eateryId: id,
          userId: user.id,
        })
        .then(function (response) {
          console.log(response.data);
        })
        .catch(function (error) {
          console.log(error);
        });
    } else {
      console.log("Chưa load xong dữ liệu user");
    }
  };
  return (
    <TouchableOpacity
      onPress={() =>
        router.push({
          pathname: `/merchant/${id}`,
          params: {
            title: title,
            source: source,
            star: star,
          },
        })
      }
      className="flex-row p-2 mt-3 bg-white shadow shadow-shadow rounded-xl"
    >
      <Image
        source={{ uri: source }}
        className="size-32 rounded-2xl"
      />
      <View className="ml-4 flex-1 justify-between">
        <View>
          <View className="flex-row justify-between items-center">
            <Text className="font-NunitoBold text-2xl mt-1">{title}</Text>
            <View className="">
              {!activeLike ? (
                <TouchableOpacity
                  className="p-2"
                  onPress={handleActive}
                >
                  <AntDesign
                    size={20}
                    name="hearto"
                  />
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  className="p-2"
                  onPress={() => {
                    setActiveLike(false);
                  }}
                >
                  <AntDesign
                    size={20}
                    color={colors.primary}
                    name="heart"
                  />
                </TouchableOpacity>
              )}
            </View>
          </View>
        </View>
        <View className="flex-row justify-between items-center">
          <View className="flex-row items-center">
            <Text className="text-[#96bd00] font-NunitoSemiBold text-lg"></Text>
          </View>
          <View className="flex-row items-center ">
            <Text className="font-NunitoBold mr-1">{star}</Text>
            <MaterialIcons
              size={20}
              name="star"
              color={colors.primary}
            />
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default MerchantItem;
