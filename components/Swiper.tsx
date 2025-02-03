import { View, Text, Image, StyleSheet } from "react-native";
import React from "react";
import Swiper from "react-native-swiper";
import * as colors from "@/constants/color";
import images from "@/constants/images";

const SwiperThumb = () => {
  return (
    <Swiper
      showsPagination={false}
      // autoplay={true}
      containerStyle={{
        borderRadius: 24,
        overflow: "hidden",
      }}
      style={styles.swiper}
    >
      <View className="flex-1 mx-2">
        <Image
          resizeMode="cover"
          className="w-full h-full rounded-3xl"
          source={images.bongThumbnail}
        />
      </View>
      <View className="flex-1 mx-2">
        <Image
          resizeMode="cover"
          className="w-full h-full rounded-3xl"
          source={images.McDonaldThumbnail}
        />
      </View>
      <View className="flex-1 mx-2">
        <Image
          resizeMode="cover"
          className="w-full h-full rounded-3xl"
          source={images.kfcThumbnail}
        />
      </View>
    </Swiper>
  );
};
const styles = StyleSheet.create({
  swiper: {
    height: 200,
    borderRadius: 24,
  },
});
export default SwiperThumb;
