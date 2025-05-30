import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  ScrollView,
  Image,
} from "react-native";
import React, { useState, useRef, useCallback, useEffect } from "react";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import Feather from "@expo/vector-icons/Feather";
import { useAppSelector } from "@/redux/hooks";
import { selectCartItems } from "@/redux/features/cart/cartSlice";
import CartItem from "@/components/CartItem";
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import { backgroundGray, backgroundLogout } from "@/constants/color";
import dimension from "@/constants/constant";
import AntDesign from "@expo/vector-icons/AntDesign";
import * as colors from "@/constants/color";
import EvilIcons from "@expo/vector-icons/EvilIcons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import images from "@/constants/images";

import axios from "@/axios";
import { selectUser } from "@/redux/features/user/userSlice";
import { router } from "expo-router";

// const promoCodes = [
//   "3H4KURO", "SAVE10", "FREESHIP", "DISCOUNT20", "SALE50", "NEWYEAR",
//   "HOLIDAY30", "SUMMER15", "BLACKFRIDAY", "CYBERMONDAY", "SPRING25", "GHFGHFG",
//   "HFGHFGH"
// ];

interface Voucher {
  id: number;
  title: string;
  description: string;
  expired: string;
}

const shippingVouchers: Voucher[] = [
  {
    id: 1,
    title: "Giảm phí ship 30k",
    description: "Đơn tối thiểu 60k",
    expired: "28.02.2025",
  },
  {
    id: 2,
    title: "Giảm phí ship 20k",
    description: "Đơn tối thiểu 50k",
    expired: "28.02.2025",
  },
  {
    id: 3,
    title: "Giảm phí ship 20k",
    description: "Đơn tối thiểu 50k",
    expired: "28.02.2025",
  },
  {
    id: 4,
    title: "Giảm phí ship 20k",
    description: "Đơn tối thiểu 50k",
    expired: "28.02.2025",
  },
  {
    id: 5,
    title: "Giảm phí ship 20k",
    description: "Đơn tối thiểu 50k",
    expired: "28.02.2025",
  },
  {
    id: 6,
    title: "Giảm phí ship 20k",
    description: "Đơn tối thiểu 50k",
    expired: "28.02.2025",
  },
  {
    id: 7,
    title: "Giảm phí ship 20k",
    description: "Đơn tối thiểu 50k",
    expired: "28.02.2025",
  },
];

const foodVouchers: Voucher[] = [
  {
    id: 1,
    title: "Giảm 10% món ăn",
    description: "Tối đa 15k",
    expired: "28.02.2025",
  },
  {
    id: 2,
    title: "Giảm 20k món ăn",
    description: "Đơn tối thiểu 100k",
    expired: "28.02.2025",
  },
  {
    id: 3,
    title: "Giảm 20k món ăn",
    description: "Đơn tối thiểu 100k",
    expired: "28.02.2025",
  },
  {
    id: 4,
    title: "Giảm 20k món ăn",
    description: "Đơn tối thiểu 100k",
    expired: "28.02.2025",
  },
  {
    id: 5,
    title: "Giảm 20k món ăn",
    description: "Đơn tối thiểu 100k",
    expired: "28.02.2025",
  },
];

const CartPage = () => {
  const insets = useSafeAreaInsets();
  const user = useAppSelector(selectUser);
  const [carts, setCarts] = useState([]);
  const cartItems = useAppSelector(selectCartItems);
  const cartArray = Object.entries(cartItems).map(([id, quantity]) => ({
    id: Number(id),
    quantity,
  }));
  const subtotal = cartArray.reduce((sum, item) => sum + item.quantity * 20, 0); // Giả sử giá 20$/sp
  const discount = 6;
  const total = subtotal - discount;

  const [selectedPromo, setSelectedPromo] = useState("3H4KURO");
  const bottomSheetRef = useRef<BottomSheetModal>(null);
  const [selectedVoucher, setSelectedVoucher] = useState<Voucher | null>(null);

  const handleOpenBottomSheet = useCallback(() => {
    bottomSheetRef.current?.present();
  }, []);

  const handleSelectPromo = useCallback((code: string) => {
    setSelectedPromo(code);
    bottomSheetRef.current?.dismiss();
  }, []);

  const handleSelectVoucher = (voucher: Voucher) => {
    setSelectedVoucher(voucher);
    bottomSheetRef.current?.dismiss();
  };
  useEffect(() => {
    console.log(user.id);
    axios
      .post("/getCartByUserId", {
        userId: user.id,
      })
      .then(function (response) {
        setCarts(response.data.items);
        console.log("getCartByUserId:", response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    console.log("carts", carts);
    if (carts.length > 0) {
      axios
        .post("/getEateryCoordinates", {
          eateryId: carts[0].food.EateryId,
        })
        .then(function (response) {
          console.log("getEateryCoordinates:", response.data);
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  }, [carts]);
  const handleOrder = () => {
    router.push({
      pathname: `/(root)/delivery`,
      params: {
        lat: 15.986689,
        lng: 108.256929,
      },
    });
  };
  return (
    <View className="flex-1">
      <StatusBar style="light" />
      <View
        className="bg-black rounded-b-3xl px-5 pb-4"
        style={{ paddingTop: insets.top }}
      >
        <View className="flex-row items-center justify-between pt-4">
          <Text className="text-white text-2xl font-bold">Order</Text>
          <Feather
            color="white"
            size={24}
            name="x"
          />
        </View>
      </View>

      <FlatList
        data={carts}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <CartItem
            key={item.food._id}
            name={item.food.Name}
            source={item.food["Image URL"]}
            price={item.food.Price}
            foodId={item.food._id}
          />
        )}
      />

      <View className="bg-white p-4 rounded-3xl shadow-md mx-5">
        <TouchableOpacity className="flex-row justify-between pb-1 border-b border-gray-200">
          <View>
            <Text className="text-gray-400 text-base font-NunitoBold">
              Địa chỉ của bạn
            </Text>
            <View className="flex-row">
              <MaterialIcons
                style={styles.icon}
                color="white"
                size={24}
                name="location-pin"
              />
              <Text
                className="text-base my-auto font-NunitoSemiBold"
                style={{ maxWidth: "90%" }}
              >
                271 Trưng Nữ Vương, Hòa Thuận Đông, Hải Châu, Đà Nẵng
              </Text>
            </View>
          </View>

          <View>
            <AntDesign
              style={styles.icon_direction}
              color="white"
              size={24}
              name="right"
            />
          </View>
        </TouchableOpacity>

        <TouchableOpacity className="flex-row justify-between py-1 border-b border-gray-200">
          <View>
            <Text className="text-gray-400 text-base font-NunitoBold">
              Phương thức thanh toán
            </Text>
            <View className="flex-row">
              <MaterialCommunityIcons
                style={styles.icon}
                color="white"
                size={24}
                name="cash"
              />
              <Text
                className="text-base my-auto font-NunitoSemiBold"
                style={{ maxWidth: "90%" }}
              >
                Tiền mặt
              </Text>
            </View>
          </View>

          <View>
            <AntDesign
              style={styles.icon_direction}
              color="white"
              size={24}
              name="right"
            />
          </View>
        </TouchableOpacity>

        <TouchableOpacity className="flex-row justify-between pt-1">
          <View>
            <Text className="text-gray-400 text-base font-NunitoBold">
              Số điện thoại
            </Text>
            <View className="flex-row">
              <MaterialIcons
                style={styles.icon}
                color="white"
                size={24}
                name="phone"
              />
              <Text
                className="text-base my-auto font-NunitoSemiBold"
                style={{ maxWidth: "90%" }}
              >
                0123456678
              </Text>
            </View>
          </View>

          <View>
            <AntDesign
              style={styles.icon_direction}
              color="white"
              size={24}
              name="right"
            />
          </View>
        </TouchableOpacity>
      </View>

      <View className="bg-white p-5 rounded-3xl shadow-md mt-6 mx-5">
        <TouchableOpacity onPress={handleOpenBottomSheet}>
          <View className="flex-row justify-between p-3 bg-gray-100 rounded-lg">
            <Text className="text-lg font-semibold">~{selectedPromo}</Text>
            <Text className="text-green-600 bg-yellow-200 px-3 py-1 rounded-full">
              Mã ưu
            </Text>
          </View>
        </TouchableOpacity>

        <BottomSheetModal
          ref={bottomSheetRef}
          style={{ flex: 1 }}
          handleStyle={{ position: "absolute", right: 0, bottom: -20, left: 0 }}
          handleIndicatorStyle={{
            backgroundColor: "rgba(0,0,0,0.7)", // Màu của thanh ngang
            width: 35, // Chiều rộng của thanh ngang
            height: 5, // Chiều cao của thanh ngang
          }}
        >
          <BottomSheetView
            className="p-4"
            style={{ height: (dimension.height * 7) / 8, overflow: "hidden" }}
          >
            <ScrollView
              contentContainerStyle={{ paddingBottom: 20 }}
              showsVerticalScrollIndicator={false}
            >
              <Text className="text-xl font-bold mb-4">Chọn mã ưu đãi</Text>

              <Text className="text-lg font-semibold mb-2">
                Ưu đãi phí vận chuyển
              </Text>
              <FlatList
                data={shippingVouchers}
                keyExtractor={(item) => item.id.toString()}
                scrollEnabled={false}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    onPress={() => handleSelectVoucher(item)}
                    className="flex-row items-center p-3 bg-gray-200 rounded-lg mb-2"
                  >
                    {/* <Image source={require(images.discountfood)} style={{ width: 40, height: 40, marginRight: 10 }} /> */}
                    <View>
                      <Text className="text-lg font-semibold">
                        {item.title}
                      </Text>
                      <Text className="text-gray-500">
                        {item.description} - HSD {item.expired}
                      </Text>
                    </View>
                  </TouchableOpacity>
                )}
              />

              <Text className="text-lg font-semibold mb-2 mt-4">
                Ưu đãi món ăn
              </Text>
              <FlatList
                data={foodVouchers}
                keyExtractor={(item) => item.id.toString()}
                scrollEnabled={false}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    onPress={() => handleSelectVoucher(item)}
                    className="flex-row items-center p-3 bg-gray-200 rounded-lg mb-2"
                  >
                    {/* <Image source={require(images.freeship)} style={{ width: 40, height: 40, marginRight: 10 }} /> */}
                    <View>
                      <Text className="text-lg font-semibold">
                        {item.title}
                      </Text>
                      <Text className="text-gray-500">
                        {item.description} - HSD {item.expired}
                      </Text>
                    </View>
                  </TouchableOpacity>
                )}
              />
            </ScrollView>
          </BottomSheetView>
        </BottomSheetModal>

        <View className="mt-4 border-t pt-3 border-gray-200">
          <View className="flex-row justify-between mb-2">
            <Text className="text-gray-500">Tổng giá</Text>
            <Text className="text-gray-900">${subtotal.toFixed(2)}</Text>
          </View>
          <View className="flex-row justify-between mb-2">
            <Text className="text-gray-500">Giảm giá</Text>
            <Text className="text-green-600">-${discount.toFixed(2)}</Text>
          </View>
          <View className="flex-row justify-between mt-2">
            <Text className="text-xl font-bold">Tổng tiền</Text>
            <Text className="text-xl font-bold text-black">
              ${total.toFixed(2)}
            </Text>
          </View>
        </View>
      </View>

      <View className="mx-5 mb-6 mt-2">
        <TouchableOpacity
          onPress={handleOrder}
          className="bg-black py-4 mt-2 rounded-3xl items-center"
        >
          <Text className="text-white text-lg font-bold">Đặt hàng</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  icon: {
    paddingLeft: 2,
    paddingRight: 5,
    marginVertical: "auto",
    color: "#c2c3c7",
    fontSize: 27,
  },

  icon_direction: {
    marginVertical: "auto",
    color: "#a4a4a4",
    fontSize: 22,
  },
});

export default CartPage;
