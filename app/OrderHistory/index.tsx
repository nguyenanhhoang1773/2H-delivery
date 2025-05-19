import React from "react";
import { View, FlatList, SafeAreaView, Text, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import AntDesign from "@expo/vector-icons/AntDesign";
import Ionicons from "@expo/vector-icons/Ionicons";
import OrderCard from "../../components/OrderCart";
import * as colors from "@/constants/color";

const orders = [
  {
    id: "1",
    shopName: "Shop Giày Sneaker",
    productName: "Giày Nike Air Jordan 1 Shop Giày Sneaker Shop Giày Sneaker",
    image: "https://contents.mediadecathlon.com/p2917189/k$bab5c388e6a68d91677d8bf55d4a92f3/gia%CC%80y-ch%E1%BA%A1y-b%E1%BB%99-nam-run-one-x%C3%A1m-decathlon-8351755.jpg?f=768x0&format=auto",
    description: "V 2 chấm dọc 017",
    originalPrice: 3500000,
    price: 2990000,
    total: 2990000,
    status: "Hoàn thành",
    reviewDeadline: "10-05-2025",
    reward: "200",
    favorite: true,
  },
  {
    id: "2",
    shopName: "Shop Điện Thoại ABC",
    productName: "iPhone 14 Pro Max 128GB",
    image: "https://contents.mediadecathlon.com/p2917189/k$bab5c388e6a68d91677d8bf55d4a92f3/gia%CC%80y-ch%E1%BA%A1y-b%E1%BB%99-nam-run-one-x%C3%A1m-decathlon-8351755.jpg?f=768x0&format=auto",
    description: "Chân 2m1 + Bộ kẹp",
    originalPrice: 31990000,
    price: 28990000,
    total: 28990000,
    status: "Hoàn thành",
    reward: "500",
    reviewDeadline: "09-05-2025",
    favorite: false,
  },
  {
    id: "3",
    shopName: "Shop Điện Thoại ABC",
    productName: "iPhone 14 Pro Max 128GB",
    image: "https://contents.mediadecathlon.com/p2917189/k$bab5c388e6a68d91677d8bf55d4a92f3/gia%CC%80y-ch%E1%BA%A1y-b%E1%BB%99-nam-run-one-x%C3%A1m-decathlon-8351755.jpg?f=768x0&format=auto",
    description: "",
    originalPrice: 31990000,
    price: 28990000,
    total: 28990000,
    status: "Hoàn thành",
    reward: "500",
    reviewDeadline: "09-05-2025",
    favorite: false,
  },
  {
    id: "4",
    shopName: "Shop Điện Thoại ABC",
    productName: "iPhone 14 Pro Max 128GB",
    image: "https://contents.mediadecathlon.com/p2917189/k$bab5c388e6a68d91677d8bf55d4a92f3/gia%CC%80y-ch%E1%BA%A1y-b%E1%BB%99-nam-run-one-x%C3%A1m-decathlon-8351755.jpg?f=768x0&format=auto",
    description: "",
    originalPrice: 31990000,
    price: 28990000,
    total: 28990000,
    status: "Hoàn thành",
    reward: "500",
    reviewDeadline: "09-05-2025",
    favorite: false,
  },
  {
    id: "5",
    shopName: "Shop Điện Thoại ABC",
    productName: "iPhone 14 Pro Max 128GB",
    image: "https://contents.mediadecathlon.com/p2917189/k$bab5c388e6a68d91677d8bf55d4a92f3/gia%CC%80y-ch%E1%BA%A1y-b%E1%BB%99-nam-run-one-x%C3%A1m-decathlon-8351755.jpg?f=768x0&format=auto",
    description: "",
    originalPrice: 31990000,
    price: 28990000,
    total: 28990000,
    status: "Hoàn thành",
    reward: "500",
    reviewDeadline: "09-05-2025",
    favorite: false,
  },
];

const OrderList = () => {
  const navigation = useNavigation();
  
  return (
    <SafeAreaView className="flex-1 px-3" style={{backgroundColor: "#f5f5f5"}}>
      <View className="flex-row items-center justify-between py-2">
        <View className="flex-row">
        <TouchableOpacity onPress={() => navigation.goBack()} className="p-1 ml-2">
          <AntDesign name="arrowleft" size={24} style={{color: colors.primary}} />
        </TouchableOpacity>
        <Text className="text-2xl font-NunitoBold ml-2">Lịch sử đơn hàng</Text>
        </View>

        <View className="flex-row">
          <TouchableOpacity className="px-3">
            <AntDesign name="search1" size={24} style={{color: colors.primary}}/>
          </TouchableOpacity>

          <TouchableOpacity className="pr-3">
            <Ionicons name="chatbubbles-outline" size={24} style={{color: colors.primary}} />
          </TouchableOpacity>
        </View>
      </View>

      <FlatList
        data={orders}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <OrderCard order={item} />}
        contentContainerStyle={{ paddingVertical: 12 }}
      />
    </SafeAreaView>
  );
};

export default OrderList;
