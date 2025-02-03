import { View, Text } from "react-native";
import React from "react";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import * as Location from "expo-location";
import Header from "@/components/Header";
import MapView, { Marker } from "react-native-maps";

const MerchantPage = () => {
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
      <Header />
      <View className="items-center flex-1 justify-center px-6 bg-backgroundPrimary">
        <Text>{text}</Text>
        {location && (
          <MapView
            style={{ width: "100%", height: "40%" }}
            initialRegion={{
              latitude: location.coords.latitude,
              longitude: location.coords.longitude,
              latitudeDelta: 0.01,
              longitudeDelta: 0.01,
            }}
          >
            <Marker
              coordinate={{
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
              }}
            />
          </MapView>
        )}
      </View>
    </>
  );
};

export default MerchantPage;
