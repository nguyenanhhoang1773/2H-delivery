import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { Order } from "../constants/order"
import images from "@/constants/images";
import AntDesign from "@expo/vector-icons/AntDesign";
import * as colors from "@/constants/color";

type OrderCardProps = {
  order: Order;
};

const OrderCard: React.FC<OrderCardProps> = ({ order }) => {
  return (
    <View className="bg-white p-4 mx-2 rounded-lg">
      <View className="flex-row justify-between">
        <View className="flex-row">
          <View className="px-2 rounded-md mr-2" style={{ backgroundColor: colors.primary }}>
            <Text className="text-white text-sm font-NunitoBold my-auto">Yêu thích</Text>
          </View>

          <Text className="text-black font-NunitoBold my-auto text-lg">{order.shopName}</Text>
        </View>

        <View>
          <Text className="font-NunitoMedium text-sm my-auto" style={{ color: colors.primary }}>Hoàn thành</Text>
        </View>
      </View>


      <View className="flex-row my-2">
        <Image source={{ uri: order.image }} className="w-20 h-20 rounded-md" />

        <View className="flex-1 justify-between ml-3">
          <View>
            <Text
              numberOfLines={1}
              ellipsizeMode="tail"
              className="text-base font-NunitoSemiBold"
            >
              {order.productName}
            </Text>
            <Text
              numberOfLines={1}
              ellipsizeMode="tail"
              className="text-sm font-NunitoSemiBold text-gray-400"
            >
              {order.description}
            </Text>
          </View>

          <View className="flex-row justify-end space-x-2 mt-1">
            <Text className="text-gray-400 line-through text-sm mr-2 font-NunitoMedium">
              {order.originalPrice.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}
            </Text>
            <Text className="font-NunitoSemiBold" style={{ color: colors.primary }}>
              {order.price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}
            </Text>
          </View>
        </View>
      </View>

      <Text className="text-right font-NunitoSemiBold">
        Tổng số tiền (1 sản phẩm): <Text className=" font-NunitoBold" style={{ color: colors.primary }}>
          {order.total.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}
        </Text>
      </Text>

      <View className="mt-3">
      <TouchableOpacity className="bg-slate-100 py-2 px-3 rounded-md flex-row">
          <Image source={ images.coin } className="w-5 h-5 mr-2 my-auto"/>
          <Text 
            className="text-base font-Nunito text-black max-w-[300px] "
            numberOfLines={2}
            ellipsizeMode="tail"
          >
            Đánh giá sản phẩm trước 14 Th05 để nhận 200 xu
          </Text>
          <AntDesign
                style={styles.icon}
                color="white"
                size={20}
                name="right"
              />
        </TouchableOpacity>
      </View>

      <View className="flex-row justify-end space-x-3 mt-3">
        <TouchableOpacity className="border border-gray-300 px-3 py-2 rounded-md mr-2">
          <Text className="text-base font-NunitoMedium">Trả hàng/Hoàn tiền</Text>
        </TouchableOpacity>
        <TouchableOpacity className="border px-3 py-2 rounded-md" style={{ backgroundColor: colors.primary, borderColor: colors.primary }}>
          <Text className="text-white text-base font-NunitoMedium">Đánh giá</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  icon: {
    padding: 10,
    color: colors.textPrimary,
  },
});

export default OrderCard;








