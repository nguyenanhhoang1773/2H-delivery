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
import { login, selectIsLogin } from "@/redux/features/user/userSlice";
import axios from "axios";
const RootLayout = () => {
  const isLogin = useAppSelector(selectIsLogin);
  if (!isLogin) return <Redirect href={"/(auth)/LogIn"} />;
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
