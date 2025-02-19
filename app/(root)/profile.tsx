import { View, Text, TouchableOpacity, Image, StyleSheet, Switch } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useClerk } from "@clerk/clerk-expo";
import { useAppDispatch } from "@/redux/hooks";
import { logout } from "@/redux/features/user/userSlice";
import images from "@/constants/images";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import * as colors from "@/constants/color";
import AntDesign from "@expo/vector-icons/AntDesign";
import { ScrollView } from "react-native-gesture-handler";
const ProfilePage = () => {
  // const { signOut } = useClerk();
  // const dispatch = useAppDispatch();
  // const user = useAppSelector(selectUser);
  // console.log(user.fullname);
  // console.log(user.imgUrl);
  // const handleLogOut = async () => {
  //   console.log("------------------------------");
  //   await signOut();
  //   dispatch(logout());
  // };

  const [pushNotifications, setPushNotifications] = React.useState(true);

  return (
    <SafeAreaView className="flex-1 bg-white">
      {/* <TouchableOpacity
        className="p-5 bg-backgroundPrimary"
        onPress={handleLogOut}
      >
        <Text className="text-2xl text-white font-NunitoBold">Đăng xuất</Text>
      </TouchableOpacity> */}
    <ScrollView>
    <View className="flex-1 bg-white p-5">
        <View className="items-center mb-5 mt-4">
          <Image
            source={images.profile}
            className="w-28 h-28 rounded-full mb-2"
          />
        <Text className="text-2xl text-black font-NunitoBold">Hung</Text>
        <Text className="text-2xl font-Nunito text-gray-500">mark.brock@icloud.com</Text>
        <TouchableOpacity className="bg-black px-5 py-4 rounded-full mt-3">
          <Text className="text-white font-bold">Edit profile</Text>
        </TouchableOpacity>
        </View>
        
        <Text className="text-lg font-bold text-gray-600 mb-2 ml-4">Chính</Text>
        <View className="bg-white rounded-lg px-4 mb-4">
          <TouchableOpacity className="flex-row items-center py-3 border-b border-gray-200">
            <MaterialIcons
                style={styles.icon}
                    color="white"
                    size={26}
                    name="fastfood"
            />
            <Text className="flex-1 text-lg ml-4 font-NunitoBold">Món ăn của tôi</Text>
            <MaterialIcons
              style={styles.icon_direction}
              color="gray"
              size={26}
              name="arrow-forward"
            />
          </TouchableOpacity>

          <TouchableOpacity className="flex-row items-center py-3">
            <MaterialIcons
                style={styles.icon}
                    color="white"
                    size={26}
                    name="history"
            />
            <Text className="flex-1 text-lg ml-4 font-NunitoBold">Lịch sử đơn hàng</Text>
            <MaterialIcons
              style={styles.icon_direction}
              color="gray"
              size={26}
              name="arrow-forward"
            />
          </TouchableOpacity>
        </View>

        <Text className="text-lg font-bold text-gray-600 mb-2 ml-4">Khác</Text>
        <View className="bg-white rounded-lg px-4 mb-4">
          <TouchableOpacity className="flex-row items-center py-3 border-b border-gray-200">
            <MaterialIcons
                style={styles.icon}
                    color="white"
                    size={26}
                    name="notifications-active"
            />
            <Text className="flex-1 text-lg ml-4 font-NunitoBold">Thông báo</Text>
            <Switch value={pushNotifications} onValueChange={setPushNotifications} />
          </TouchableOpacity>

          <TouchableOpacity className="flex-row items-center py-3 border-b border-gray-200">
            <MaterialIcons
                style={styles.icon}
                    color="white"
                    size={26}
                    name="fiber-pin"
            />
            <Text className="flex-1 text-lg ml-4 font-NunitoBold">Mã pin</Text>
            <MaterialIcons
              style={styles.icon_direction}
              color="gray"
              size={26}
              name="arrow-forward"
            />
          </TouchableOpacity>

          <TouchableOpacity className="flex-row items-center py-3 border-b border-gray-200">
            <MaterialIcons
                style={styles.icon}
                    color="red"
                    size={26}
                    name="logout"
            />
            <Text className="flex-1 text-lg ml-4 font-NunitoBold text-red-600">Đăng xuất</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  icon: {
    padding: 10,
    borderRadius: "100%",
    backgroundColor: "rgba(0,0,0,0.09)",
  },

  icon_direction: {
    marginLeft: 12,
    marginTop: 8
  },
});
export default ProfilePage;
