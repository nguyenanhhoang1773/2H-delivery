import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { Redirect, router, Tabs } from "expo-router";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Fontisto from "@expo/vector-icons/Fontisto";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import * as colors from "@/constants/color";
import { useAuth, useUser } from "@clerk/clerk-expo";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { addId, login, selectIsLogin } from "@/redux/features/user/userSlice";
import { selectUser } from "@/redux/features/user/userSlice";
import axios from "@/axios";
import { Eatery } from "@/type/type";

const RootLayout = () => {
  const user = useAppSelector(selectUser);
  const dispatch = useAppDispatch();
  const isLogin = useAppSelector(selectIsLogin);
  if (!isLogin) return <Redirect href={"/(auth)/LogIn"} />;
  useEffect(() => {
    console.log(user.email);
    axios
      .get("/getUserInfor", {
        params: {
          email: user.email,
        },
      })
      .then(function (response) {
        dispatch(addId(response.data._id));
        console.log("response.data._id:", response.data._id);
      })
      .catch(function (error) {
        console.log(error);
      })
      .finally(function () {
        // always executed
      });
  }, []);
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textPrimary,
        tabBarLabelStyle: { fontFamily: "Nunito-Bold" },
        tabBarIconStyle: { marginBottom: 6, marginTop: 6 },
      }}
    >
      <Tabs.Screen
        options={{
          tabBarIcon: ({ focused }) =>
            focused ? (
              <Ionicons
                color={colors.primary}
                size={30}
                name="home"
              />
            ) : (
              <Ionicons
                color={colors.textPrimary}
                size={30}
                name="home-outline"
              />
            ),
          title: "Home",
        }}
        name="index"
      />
      <Tabs.Screen
        options={{
          tabBarIcon: ({ focused }) =>
            focused ? (
              <MaterialCommunityIcons
                color={colors.primary}
                size={30}
                name="heart-multiple"
              />
            ) : (
              <MaterialCommunityIcons
                color={colors.textPrimary}
                size={30}
                name="heart-multiple-outline"
              />
            ),
          title: "MyFoods",
        }}
        name="myFood"
      />
      <Tabs.Screen
        options={{
          tabBarIcon: ({ focused }) =>
            focused ? (
              <Ionicons
                color={colors.primary}
                size={30}
                name="chatbubbles"
              />
            ) : (
              <Ionicons
                color={colors.textPrimary}
                size={30}
                name="chatbubbles-outline"
              />
            ),
          title: "Chat",
        }}
        name="chat"
      />
      <Tabs.Screen
        options={{
          tabBarIcon: ({ focused }) =>
            focused ? (
              <Ionicons
                size={30}
                color={colors.primary}
                name="newspaper"
              />
            ) : (
              <Ionicons
                size={30}
                color={colors.textPrimary}
                name="newspaper-outline"
              />
            ),

          title: "Delivery",
        }}
        name="delivery"
      />
      <Tabs.Screen
        options={{
          tabBarIcon: ({ focused }) =>
            focused ? (
              <MaterialCommunityIcons
                color={colors.primary}
                size={30}
                name="account"
              />
            ) : (
              <MaterialCommunityIcons
                size={30}
                color={colors.textPrimary}
                name="account-outline"
              />
            ),
          title: "Profile",
        }}
        name="profile"
      />
    </Tabs>
  );
};

export default RootLayout;
