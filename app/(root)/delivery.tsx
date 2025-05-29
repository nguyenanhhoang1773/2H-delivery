import {
  View,
  Text,
  StyleSheet,
  Image,
  Pressable,
  Alert,
  Modal,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import * as Location from "expo-location";
import MapView, { Marker, PROVIDER_GOOGLE, Polyline } from "react-native-maps";
import Shipper from "@/components/Shipper";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import * as colors from "@/constants/color";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import AntDesign from "@expo/vector-icons/AntDesign";
import Dots from "@/components/Dots";
import { StatusBar } from "expo-status-bar";
import axios from "axios";
import images from "@/constants/images";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { selectUser } from "@/redux/features/user/userSlice";
import getcoords from "@/geoapify/geoapify";
type LatLng = {
  latitude: number;
  longitude: number;
};
const DeliveryPage = () => {
  const { id } = useLocalSearchParams();
  const [location, setLocation] = useState<Location.LocationObject | null>(
    null
  );
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  const [lastCoord, setLastCoord] = useState<LatLng | null>(null);
  const [address, setAddress] = useState<any>(null);
  const [fetched, setFetched] = useState(false);
  const [routeCoordsShip, setRouteCoordsShip] = useState<LatLng[]>([]);
  const [routeCoordsGetFoods, setRouteCoordsGetFoods] = useState<LatLng[]>([]);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [step, setStep] = useState(1);
  const [modalVisible, setModalVisible] = useState(false);
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
      // console.log(address);
    }
    getCurrentLocation();
  }, []);
  const fetchRoutingShip = async (startLocation: any, endLocation: any) => {
    try {
      const coordinates = await getcoords(startLocation, endLocation);

      setRouteCoordsShip(coordinates);
      setLastCoord(
        coordinates.length ? coordinates[coordinates.length - 1] : null
      );
    } catch (error) {
      console.error("Error fetching route:", error);
    }
  };
  useEffect(() => {
    if (!fetched) {
      return;
    }
    setStep(3);
    const intervalId = setInterval(() => {
      setRouteCoordsShip((prev) => {
        if (prev.length === 0) {
          clearInterval(intervalId);
          setModalVisible(true);
          setStep(4);

          return [];
        }
        const trimmed = prev.slice(0, -1); // mảng mới
        setLastCoord(trimmed.length ? trimmed[trimmed.length - 1] : null); // phần tử cuối cùng còn lại
        return trimmed;
      });
    }, 2000);
  }, [fetched]);
  const fetchRoutingGetFoods = async (startLocation: any, endLocation: any) => {
    try {
      const coordinates = await getcoords(startLocation, endLocation);

      setRouteCoordsGetFoods(coordinates);
      setLastCoord(
        coordinates.length ? coordinates[coordinates.length - 1] : null
      );
      const intervalId = setInterval(() => {
        setRouteCoordsGetFoods((prev) => {
          if (prev.length === 0) {
            clearInterval(intervalId);
            setStep(2);
            setTimeout(() => {
              setFetched(true);
            }, 5000);
            return [];
          }
          const trimmed = prev.slice(0, -1); // mảng mới
          setLastCoord(trimmed.length ? trimmed[trimmed.length - 1] : null); // phần tử cuối cùng còn lại
          return trimmed;
        });
      }, 2000);
    } catch (error) {
      console.error("Error fetching route:", error);
    }
  };
  useEffect(() => {
    fetchRoutingGetFoods(
      {
        latitude: 15.974795,
        longitude: 108.254878,
      },
      {
        latitude: 15.987972,
        longitude: 108.257071,
      }
    );
    fetchRoutingShip(location?.coords, {
      latitude: 15.974795,
      longitude: 108.254878,
    });
  }, [location]);
  let text = "Waiting...";
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);

    // const { latitudeDelta, longitudeDelta } = calculateDelta(location.coords.latitude);
  }
  return (
    <>
      <StatusBar style="dark" />
      <View className=" flex-1  bg-backgroundPrimary">
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
            setModalVisible(!modalVisible);
          }}
        >
          <View className="flex-1 bg-[rgba(0,0,0,0.5)] justify-center items-center">
            <View className="bg-white rounded-lg w-[90%] justify-center items-center">
              <View className="items-center py-2 px-4">
                <Text className="text-2xl text-center font-NunitoBold mt-2 mr-2">
                  Đơn hàng đã đến
                </Text>

                <Text className="text-xl  text-center font-NunitoSemiBold">
                  Nhấn nút xác nhận đã nhận đơn thành công
                </Text>
                <TouchableOpacity
                  className="mt-4"
                  onPress={() => setModalVisible(!modalVisible)}
                >
                  <AntDesign
                    size={40}
                    color={colors.primary}
                    name="checkcircle"
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
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
            {routeCoordsShip.length > 0 && (
              <Polyline
                coordinates={routeCoordsShip}
                strokeColor="#1E90FF" // Màu xanh dương
                strokeWidth={4}
              />
            )}
            {routeCoordsGetFoods.length > 0 && (
              <Polyline
                coordinates={routeCoordsGetFoods}
                strokeColor="#1E90FF" // Màu xanh dương
                strokeWidth={4}
              />
            )}
            <Marker
              coordinate={{
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
              }}
            >
              <View style={{ width: 28, height: 28 }}>
                <Image
                  className="rounded-full"
                  source={{ uri: user?.imgUrl }}
                  style={{ width: 28, height: 28, resizeMode: "contain" }}
                />
              </View>
            </Marker>
            {lastCoord && (
              <Marker coordinate={lastCoord}>
                <View style={{ width: 28, height: 28 }}>
                  <Image
                    source={images.shipperv2}
                    style={{ width: 28, height: 28, resizeMode: "contain" }}
                  />
                </View>
              </Marker>
            )}
            {!fetched && (
              <Marker
                coordinate={{
                  latitude: 15.974795,
                  longitude: 108.254878,
                }}
              >
                <View style={{ width: 28, height: 28 }}>
                  <Image
                    source={images.eatery}
                    style={{ width: 28, height: 28, resizeMode: "contain" }}
                  />
                </View>
              </Marker>
            )}
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
                  color={step >= 1 && colors.lightPrimary}
                  size={30}
                  name="clipboard-list"
                />
                <Dots primary={step >= 1} />
                <MaterialCommunityIcons
                  style={{ marginLeft: 4, marginRight: 4 }}
                  color={step >= 2 ? colors.lightPrimary : colors.textPrimary}
                  size={30}
                  name="chef-hat"
                />
                <Dots primary={step >= 2} />

                <FontAwesome6
                  style={{ marginLeft: 6, marginRight: 6 }}
                  color={step >= 3 ? colors.lightPrimary : colors.textPrimary}
                  size={30}
                  name="motorcycle"
                />
                <Dots primary={step >= 3} />
                <AntDesign
                  style={{ marginLeft: 6 }}
                  color={step >= 4 ? colors.lightPrimary : colors.textPrimary}
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  text: {
    fontSize: 18,
    textAlign: "center",
    marginVertical: 10,
  },
  map: {
    width: "100%",
    height: "100%",
  },
});

export default DeliveryPage;
