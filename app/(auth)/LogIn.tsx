import {
  View,
  Text,
  ScrollView,
  Button,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import MaterialIcon from "@expo/vector-icons/MaterialIcons";
import * as colors from "@/constants/color";
import images from "@/constants/images";
import LottieView from "lottie-react-native";
import { StatusBar } from "expo-status-bar";
import * as WebBrowser from "expo-web-browser";
import * as Linking from "expo-linking";
import { useOAuth, SignedOut, useUser } from "@clerk/clerk-expo";
import Toast from "react-native-toast-message";
import { router } from "expo-router";
import { useAppDispatch } from "@/redux/hooks";
import { login } from "@/redux/features/user/userSlice";
import { LoginWithClerk } from "@/db/db";
import { useClerk } from "@clerk/clerk-expo";
import { useApi } from "@/db/useApi";
const schema = yup.object().shape({
  email: yup
    .string()
    .email("Đây không phải là email")
    .required("Email không được bỏ trống"),
  password: yup
    .string()
    .required("Mật khẩu không được bỏ trống")
    .min(9, "Mật khẩu phải tối thiểu là 9 chữ số"),
});

export const useWarmUpBrowser = () => {
  React.useEffect(() => {
    void WebBrowser.warmUpAsync();
    return () => {
      void WebBrowser.coolDownAsync();
    };
  }, []);
};

WebBrowser.maybeCompleteAuthSession();

const LogIn = () => {
  useWarmUpBrowser();
  const dispatch = useAppDispatch();
  const { signOut } = useClerk();
  const { user: clerkUser } = useUser();
  const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" });
  const { fetchData, data } = useApi();
  const [loading, setloading] = useState(false);
  useEffect(() => {
    const handleLogIn = async () => {
      setloading(true);
      if (clerkUser) {
        await fetchData(LoginWithClerk(clerkUser));
      }
    };
    handleLogIn();
  }, [clerkUser, data]);
  useEffect(() => {
    if (data) {
      console.log("imgUrl:", data.imgUrl);
      if (clerkUser) {
        dispatch(
          login({
            email: data?.email,
            fullname: data?.fullname,
            id: data?.id,
            phone: data?.phone,
            imgUrl: clerkUser?.imageUrl,
          })
        );
        Toast.show({
          type: "success",
          text1: "Welcome",
          text2: "Chúc mừng bạn đã đăng nhập thành công 👋",
        });
      } else {
        console.log("login with email");
        dispatch(
          login({
            email: data?.email,
            fullname: data?.fullname,
            id: data?.id,
            phone: data?.phone,
          })
        );
        Toast.show({
          type: "success",
          text1: "Welcome",
          text2: "Chúc mừng bạn đã đăng nhập thành công 👋",
        });
      }
    }
    setloading(false);
  }, [data]);
  const onPress = React.useCallback(async () => {
    console.log("----------------------------------------------------");
    try {
      const { createdSessionId, signIn, signUp, setActive } =
        await startOAuthFlow();
      if (createdSessionId) {
        setActive!({ session: createdSessionId });
      } else {
      }
    } catch (err) {
      console.error(JSON.stringify(err, null, 2));
    }
  }, []);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: yupResolver(schema),
  });
  const onSubmitError = () => {
    Alert.alert(
      "Đăng nhập không thành công",
      "Vui lòng kiểm tra lại thông tin"
    );
  };
  const handleLoginGoogle = () => {
    signOut();
  };
  if (loading)
    return (
      <View className="flex-1 items-center justify-center bg-white">
        <ActivityIndicator
          color={colors.primary}
          size={"large"}
        />
      </View>
    );
  return (
    <SafeAreaView
      className="flex-1 bg-backgroundPrimary "
      edges={["bottom", "left", "right"]}
    >
      <View className=" flex-1 ">
        <StatusBar style="light" />
        <ScrollView contentContainerClassName="flex-1 ">
          <View className="h-[37%] justify-center items-center  bg-backgroundPrimary ">
            <LottieView
              style={{
                width: "100%",
                height: "90%",
                marginTop: 25,
              }}
              source={require("@/assets/lottie/login.json")}
              autoPlay
              loop
            />
          </View>
          <View className="bg-white rounded-xl h-[63%]">
            <View className=" mt-12">
              <Text className="px-7 font-NunitoBold text-4xl">Đăng nhập</Text>
              <View className="px-5 mt-6">
                <View
                  className={`flex-row ${
                    errors.email && "bg-red-50"
                  } px-2 rounded-3xl  items-center   border-b border-secondPrimary`}
                >
                  <MaterialIcon
                    color={errors.email ? "#ff6467" : colors.textPrimary}
                    size={20}
                    name="alternate-email"
                  />
                  <Controller
                    control={control}
                    rules={{
                      required: true,
                    }}
                    render={({ field: { onChange, onBlur, value } }) => (
                      <TextInput
                        placeholderTextColor={colors.textPrimary}
                        className="ml-2 text-2xl flex-1 py-4 font-NunitoMedium"
                        placeholder="Email"
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                      />
                    )}
                    name="email"
                  />
                </View>
                {errors.email && (
                  <Text className="mt-2 text-red-400">
                    {errors.email.message}
                  </Text>
                )}

                <View
                  className={`flex-row ${
                    errors.password && "bg-red-50"
                  } px-2 rounded-3xl items-center mt-5 border-b border-secondPrimary`}
                >
                  <MaterialIcon
                    color={errors.password ? "#ff6467" : colors.textPrimary}
                    size={20}
                    name="lock-outline"
                  />
                  <Controller
                    control={control}
                    rules={{
                      required: true,
                      minLength: 6,
                      maxLength: 100,
                    }}
                    render={({ field: { onChange, onBlur, value } }) => (
                      <TextInput
                        secureTextEntry
                        placeholderTextColor={colors.textPrimary}
                        className="ml-2 text-2xl flex-1 py-4 font-NunitoMedium"
                        placeholder="Password"
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                      />
                    )}
                    name="password"
                  />
                  <TouchableOpacity>
                    <Text className="font-NunitoBold text-xl ">Forgot?</Text>
                  </TouchableOpacity>
                </View>
                {errors.password && (
                  <Text className="mt-2 text-red-400">
                    {errors.password.message}
                  </Text>
                )}
                <View className="px-10 mt-2">
                  <TouchableOpacity className="w-full py-5 bg-primary rounded-2xl mt-8  justify-center items-center">
                    <Text className="text-2xl font-NunitoSemiBold">
                      Đăng nhập
                    </Text>
                  </TouchableOpacity>
                </View>
                <View className="items-center">
                  <Text className="my-10 font-NunitoMedium text-textPrimary">
                    Or, login with...
                  </Text>
                  <View className="flex-row items-center justify-center">
                    <TouchableOpacity
                      onPress={onPress}
                      className="py-4 flex-1 rounded-2xl  border border-secondPrimary items-center justify-center"
                    >
                      <Image
                        source={images.google}
                        className="size-8"
                      />
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={handleLoginGoogle}
                      className="py-4 ml-5 rounded-2xl  flex-1 border border-secondPrimary items-center justify-center"
                    >
                      <Image
                        source={images.facebook}
                        className="size-8"
                      />
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={handleLoginGoogle}
                      className="py-4 ml-5 rounded-2xl  flex-1 border border-secondPrimary items-center justify-center"
                    >
                      <Image
                        source={images.apple}
                        className="size-8"
                      />
                    </TouchableOpacity>
                  </View>
                  <View className="items-center justify-center flex-row mt-10">
                    <Text className="font-NunitoMedium text-xl text-textPrimary">
                      Bạn chưa có tài khoản?
                    </Text>
                    <TouchableOpacity
                      onPress={() => router.push("/(auth)/sign-up")}
                      className=" ml-2"
                    >
                      <Text className="font-NunitoBold text-2xl">Đăng ký</Text>
                    </TouchableOpacity>
                    <SignedOut />
                  </View>
                </View>
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default LogIn;
