import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Link, router } from "expo-router";

const SignUp = () => {
  return (
    <SafeAreaView className="flex-1 items-center justify-center">
      <TouchableOpacity onPress={() => router.back()}>
        <Text className="text-5xl font-NunitoBold">BACK</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default SignUp;
