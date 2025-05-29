import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  Switch,
  Modal,
  Button,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useClerk } from "@clerk/clerk-expo";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { logout, selectUser } from "@/redux/features/user/userSlice";
import images from "@/constants/images";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import * as colors from "@/constants/color";
import AntDesign from "@expo/vector-icons/AntDesign";
import { ScrollView, TextInput } from "react-native-gesture-handler";
import { router } from "expo-router";
import axios from "@/axios";
const hostId = process.env.EXPO_PUBLIC_LOCAL_HOST_ID;
const ProfilePage = () => {
  const [name, setName] = useState("");
  const [lat, setLat] = useState("");
  const [lng, setLng] = useState("");
  const [phone, setPhone] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [showModal, setShowModal] = useState(false);

  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);
  const handleAdd = async () => {
    try {
      const newEatery = {
        name,
        coordinates: {
          lat: parseFloat(lat),
          lng: parseFloat(lng),
        },
        phone,
        imageUrl,
      };

      await axios.post("/addEatery", newEatery);
      alert("Eatery added successfully!");
    } catch (err) {
      console.error(err);
      alert("Failed to add eatery.");
    }
  };
  const { signOut } = useClerk();
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  console.log(user?.fullname);
  console.log(user?.imgUrl);
  const handleLogOut = async () => {
    console.log("------------------------------");
    await signOut();
    dispatch(logout());
  };

  const [pushNotifications, setPushNotifications] = React.useState(true);

  return (
    <SafeAreaView className="flex-1 bg-white">
      <Button
        title="Add New Eatery"
        onPress={openModal}
      />
      {/* <TouchableOpacity
        className="p-5 bg-backgroundPrimary"
        onPress={handleLogOut}
      >
        <Text className="text-2xl text-white font-NunitoBold">Đăng xuất</Text>
      </TouchableOpacity> */}
      <Modal
        visible={showModal}
        animationType="slide"
        transparent={true}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalView}>
            <Text style={styles.title}>Add Eatery</Text>
            <TextInput
              placeholder="Name"
              style={styles.input}
              value={name}
              onChangeText={setName}
            />
            <TextInput
              placeholder="Latitude"
              style={styles.input}
              value={lat}
              onChangeText={setLat}
              keyboardType="numeric"
            />
            <TextInput
              placeholder="Longitude"
              style={styles.input}
              value={lng}
              onChangeText={setLng}
              keyboardType="numeric"
            />
            <TextInput
              placeholder="Phone"
              style={styles.input}
              value={phone}
              onChangeText={setPhone}
            />
            <TextInput
              placeholder="Image URL"
              style={styles.input}
              value={imageUrl}
              onChangeText={setImageUrl}
            />

            <View style={styles.buttonRow}>
              <TouchableOpacity
                style={styles.button}
                onPress={handleAdd}
              >
                <Text style={styles.buttonText}>Add</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button, styles.cancelButton]}
                onPress={closeModal}
              >
                <Text style={styles.buttonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
      <ScrollView>
        <View className="flex-1 bg-white p-5">
          <View className="items-center mb-5 mt-4">
            <Image
              source={images.profile}
              className="w-28 h-28 rounded-full mb-2"
            />
            <Text className="text-2xl text-black font-NunitoBold">Hung</Text>
            <Text className="text-2xl font-Nunito text-gray-500">
              mark.brock@icloud.com
            </Text>
            <TouchableOpacity className="bg-black px-5 py-4 rounded-full mt-3">
              <Text className="text-white font-bold">Sửa hồ sơ</Text>
            </TouchableOpacity>
          </View>

          <Text className="text-lg font-bold text-textPrimary mb-2 ml-4">
            Chính
          </Text>
          <View
            className="rounded-3xl px-4 mb-4 border border-gray-200"
            style={styles.bg_category}
          >
            <TouchableOpacity
              className="flex-row items-center py-3 border-b border-gray-200"
              onPress={() => router.push(`/(root)/myFood`)}
            >
              <MaterialIcons
                style={styles.icon}
                color="white"
                size={26}
                name="fastfood"
              />
              <Text className="flex-1 text-lg ml-4 font-NunitoBold">
                Món ăn của tôi
              </Text>
              <MaterialIcons
                style={styles.icon_direction}
                color="gray"
                size={26}
                name="arrow-forward"
              />
            </TouchableOpacity>

            <TouchableOpacity
              className="flex-row items-center py-3"
              onPress={() => router.push("/OrderHistory")}
            >
              <MaterialIcons
                style={styles.icon}
                color="white"
                size={26}
                name="history"
              />
              <Text className="flex-1 text-lg ml-4 font-NunitoBold">
                Lịch sử đơn hàng
              </Text>
              <MaterialIcons
                style={styles.icon_direction}
                color="gray"
                size={26}
                name="arrow-forward"
              />
            </TouchableOpacity>
          </View>

          <Text className="text-lg font-bold text-textPrimary mb-2 ml-4">
            Khác
          </Text>
          <View
            className="bg-white rounded-3xl px-4 mb-4 border border-gray-300"
            style={styles.bg_category}
          >
            <TouchableOpacity className="flex-row items-center py-3 border-b border-gray-200">
              <MaterialIcons
                style={styles.icon}
                color="white"
                size={26}
                name="notifications-active"
              />
              <Text className="flex-1 text-lg ml-4 font-NunitoBold">
                Thông báo
              </Text>
              <Switch
                value={pushNotifications}
                onValueChange={setPushNotifications}
              />
            </TouchableOpacity>

            <TouchableOpacity className="flex-row items-center py-3 border-b border-gray-200">
              <MaterialIcons
                style={styles.icon}
                color="white"
                size={26}
                name="fiber-pin"
              />
              <Text className="flex-1 text-lg ml-4 font-NunitoBold">
                Mã pin
              </Text>
              <MaterialIcons
                style={styles.icon_direction}
                color="gray"
                size={26}
                name="arrow-forward"
              />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={handleLogOut}
              className="flex-row items-center py-3 border-b border-gray-200"
            >
              <MaterialIcons
                style={styles.icon_logout}
                color="red"
                size={26}
                name="logout"
              />
              <Text className="flex-1 text-lg ml-4 font-NunitoBold text-red-600">
                Đăng xuất
              </Text>
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
    backgroundColor: "white",
    color: colors.textPrimary,
  },

  icon_direction: {
    marginLeft: 12,
    marginTop: 8,
  },

  bg_category: {
    backgroundColor: colors.backgroundGray,
  },

  icon_logout: {
    backgroundColor: colors.backgroundLogout,
    padding: 10,
    borderRadius: "100%",
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.4)",
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 12,
    padding: 20,
    elevation: 5,
  },
  title: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 12,
    textAlign: "center",
  },
  input: {
    borderBottomWidth: 1,
    borderColor: "#ccc",
    marginBottom: 12,
    padding: 8,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 15,
  },
  button: {
    padding: 10,
    backgroundColor: "#2196F3",
    borderRadius: 6,
    width: "40%",
    alignItems: "center",
  },
  cancelButton: {
    backgroundColor: "#f44336",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
});
export default ProfilePage;
