import { View, Text } from "react-native";
import React from "react";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import * as Location from "expo-location";
import Header from "@/components/Header";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import Shipper from "@/components/Shipper";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import * as colors from "@/constants/color";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import AntDesign from "@expo/vector-icons/AntDesign";
import Dots from "@/components/Dots";
import { StatusBar } from "expo-status-bar";
import images from "@/constants/images";
import MapViewDirections from "react-native-maps-directions";
const DeliveryPage = () => {
  const { id } = useLocalSearchParams();
  const [location, setLocation] = useState<Location.LocationObject | null>(
    null
  );
  const [address, setAddress] = useState<any>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  useEffect(() => {
    async function getCurrentLocation() {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }
      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
      const [address] = await Location.reverseGeocodeAsync({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });
      setAddress(address);
      console.log(address);
    }
    getCurrentLocation();
  }, []);

  let text = "Waiting...";
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
    console.log(location.coords.latitude);
    console.log(location.coords.longitude);

    // const { latitudeDelta, longitudeDelta } = calculateDelta(location.coords.latitude);
  }
  return (
    <>
      <StatusBar style="dark" />
      <View className=" flex-1  bg-backgroundPrimary">
        {location && (
          <MapView
            style={{ width: "100%", height: "100%" }}
            initialRegion={{
              latitude: location.coords.latitude,
              longitude: location.coords.longitude,
              latitudeDelta: 0.01,
              longitudeDelta: 0.01,
            }}
          >
            <MapViewDirections
              origin={{
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
              }}
              destination={{
                latitude: 15.97556809564408,
                longitude: 108.25323803847986,
              }}
              strokeWidth={3}
              strokeColor="#0286ff"
              apikey="AIzaSyCb4LJX5CqACgujgOucKgurNqNI1Y-18sad9U"
            />
            <Marker
              coordinate={{
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
              }}
            />
            <View className="absolute bottom-10 bg-backgroundPrimary right-5 left-5 px-3 py-5  rounded-[30]">
              <View className="items-center">
                <Text className="text-xl font-NunitoBold text-white">
                  Dự kiến đơn hàng đến vào lúc 6:18 PM
                </Text>
                <Text className=" text-lg text-textPrimary font-NunitoBold ">
                  Đơn hàng đã sẵn sàng giao đến bạn
                </Text>
              </View>
              <View className="mt-5 py-4 flex-row items-center justify-center ">
                <FontAwesome5
                  style={{ marginRight: 8 }}
                  color={colors.lightPrimary}
                  size={30}
                  name="clipboard-list"
                />
                <Dots primary />
                <MaterialCommunityIcons
                  style={{ marginLeft: 4, marginRight: 4 }}
                  color={colors.lightPrimary}
                  size={30}
                  name="chef-hat"
                />
                <Dots />

                <FontAwesome6
                  style={{ marginLeft: 6, marginRight: 6 }}
                  color={colors.textPrimary}
                  size={30}
                  name="motorcycle"
                />
                <Dots />

                <AntDesign
                  style={{ marginLeft: 6 }}
                  color={colors.textPrimary}
                  size={30}
                  name="checkcircle"
                />
              </View>
              <Shipper />
            </View>
          </MapView>
        )}
        {/* <Text>{text}</Text> */}
      </View>
    </>
  );
};

export default DeliveryPage;
