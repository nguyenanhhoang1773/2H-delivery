import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useClerk } from "@clerk/clerk-expo";
import { useAppDispatch } from "@/redux/hooks";
import { logout } from "@/redux/features/user/userSlice";
const ProfilePage = () => {
  const { signOut } = useClerk();
  const dispatch = useAppDispatch();
  const handleLogOut = async () => {
    console.log("------------------------------");
    await signOut();
    dispatch(logout());
  };
  return (
    <SafeAreaView>
      <TouchableOpacity
        className="p-5 bg-backgroundPrimary"
        onPress={handleLogOut}
      >
        <Text className="text-2xl text-white font-NunitoBold">Đăng xuất</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default ProfilePage;
