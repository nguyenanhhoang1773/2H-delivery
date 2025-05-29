import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import Header from "@/components/Header";
import { FlatList, ScrollView } from "react-native-gesture-handler";
import Feather from "@expo/vector-icons/Feather";
import AntDesign from "@expo/vector-icons/AntDesign";
import Ionicons from "@expo/vector-icons/Ionicons";
import foods from "@/constants/data";
import axios from "@/axios";
import { Eatery } from "@/type/type";
import { primary } from "@/constants/color";
import { selectUser } from "@/redux/features/user/userSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useFocusEffect } from "expo-router";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import * as colors from "@/constants/color";

const MyFoodPage = () => {
  const user = useAppSelector(selectUser);

  const [eateries, setEateries] = useState<Eatery[]>([]);
  useFocusEffect(
    useCallback(() => {
      axios
        .get("/getAllFavoriteEatery", {
          params: {
            userId: user.id,
          },
        })
        .then(function (response) {
          // handle success
          setEateries(response.data);
          console.log(response);
        })
        .catch(function (error) {
          // handle error
          console.log(error);
        })
        .finally(function () {
          // always executed
        });
      return () => {};
    }, [])
  );
  if (eateries.length == 0)
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator
          size={"large"}
          color={primary}
        />
      </View>
    );
  return (
    <View className="flex-1 bg-backgroundPrimary">
      <Header isHome />
      <View className="bg-white px-8 mt-4 rounded-t-[30]">
        <View className="flex-row items-center border-b border-textSecond py-4">
          <Feather
            size={20}
            name="repeat"
          />
          <Text className="font-NunitoBold ml-4 text-xl">
            Món đã đặt gần đây
          </Text>
        </View>
        <View className="flex-row items-center  py-4">
          <AntDesign
            size={20}
            name="question"
          />
          <Text className="font-NunitoBold ml-4 text-xl">
            Giúp tôi chọn món
          </Text>
        </View>
      </View>
      <View className="bg-white flex-1">
        <FlatList
          initialNumToRender={2}
          maxToRenderPerBatch={1}
          updateCellsBatchingPeriod={1000}
          style={{ marginHorizontal: -4, backgroundColor: "#f6f5f8" }}
          className="px-8  rounded-t-[30]  pt-4 "
          contentContainerClassName="pb-4"
          nestedScrollEnabled
          numColumns={2}
          data={eateries}
          renderItem={({ item }) => (
            <TouchableOpacity className="flex-1 p-3   m-1 bg-white rounded-3xl">
              <View className="w-full  aspect-square ">
                <Image
                  source={{ uri: item.imageUrl }}
                  className="w-full h-full rounded-3xl"
                />
              </View>
              <Text
                numberOfLines={1}
                className="font-NunitoBold text-xl"
              >
                {item.name}
              </Text>
              <View className="flex-row justify-end items-center">
                <Text className="font-NunitoBold text-lg text-right mr-1">
                  {item.rating}
                </Text>
                <MaterialIcons
                  size={20}
                  name="star"
                  color={colors.primary}
                />
              </View>
            </TouchableOpacity>
          )}
          ListHeaderComponent={
            <View className="flex-row items-center mb-2 justify-between">
              <Text className="text-2xl font-NunitoBlack  px-4">
                Quán đã yêu thích
              </Text>
              <TouchableOpacity className="px-3 py-1 bg-backgroundPrimary rounded-full">
                <Text className="text-primary text-lg font-NunitoBold">
                  All
                </Text>
              </TouchableOpacity>
            </View>
          }
        />
      </View>
    </View>
  );
};

export default MyFoodPage;
