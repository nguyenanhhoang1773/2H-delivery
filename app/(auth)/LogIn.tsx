import {
  View,
  Text,
  ScrollView,
  Button,
  TextInput,
  TouchableOpacity,
  Image,
} from "react-native";
import React from "react";
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
import { useOAuth, SignedOut } from "@clerk/clerk-expo";
import Toast from "react-native-toast-message";
import { router } from "expo-router";
const schema = yup
  .object()
  .shape({
    email: yup.string().email().required(),
    password: yup.string().required(),
  })
  .required();

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
  const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" });
  const onPress = React.useCallback(async () => {
    try {
      const { createdSessionId, signIn, signUp, setActive } =
        await startOAuthFlow();

      if (createdSessionId) {
        router.replace("/");
        setActive!({ session: createdSessionId });
        Toast.show({
          type: "success",
          text1: "Welcome",
          text2: "Chúc mừng bạn đã đăng nhập thành công 👋",
        });
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
  const onSubmit = (data: any) => console.log(data);
  const handleLoginGoogle = () => {
    console.log(Math.random() * 10);
  };
  return (
    <View className="h-full flex-1 bg-backgroundPrimary">
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
          <View className="px-7 mt-12">
            <Text className="font-NunitoBold text-4xl">Đăng nhập</Text>
            <View className="mt-6">
              <View className="flex-row items-center py-4 border-b border-secondPrimary">
                <MaterialIcon
                  color={colors.textPrimary}
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
                      className="ml-2 text-xl font-NunitoMedium"
                      placeholder="Email"
                      onBlur={onBlur}
                      onChangeText={onChange}
                      value={value}
                    />
                  )}
                  name="email"
                />
              </View>
              {errors.email && <Text>This is required.</Text>}

              <View className="flex-row  items-center mt-5 py-4 border-b border-secondPrimary">
                <MaterialIcon
                  color={colors.textPrimary}
                  size={20}
                  name="lock-outline"
                />
                <Controller
                  control={control}
                  rules={{
                    required: true,
                    maxLength: 100,
                  }}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                      placeholderTextColor={colors.textPrimary}
                      className="ml-2 text-xl flex-1 font-NunitoMedium"
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
              <View className="px-10 mt-2">
                <TouchableOpacity className="w-full py-5 bg-primary rounded-2xl mt-8  justify-center items-center">
                  <Text className="text-2xl font-NunitoSemiBold">Login</Text>
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
                    <Image source={images.google} className="size-8" />
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={handleLoginGoogle}
                    className="py-4 ml-5 rounded-2xl  flex-1 border border-secondPrimary items-center justify-center"
                  >
                    <Image source={images.facebook} className="size-8" />
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={handleLoginGoogle}
                    className="py-4 ml-5 rounded-2xl  flex-1 border border-secondPrimary items-center justify-center"
                  >
                    <Image source={images.apple} className="size-8" />
                  </TouchableOpacity>
                </View>
                <View className="items-center justify-center flex-row mt-10">
                  <Text className="font-NunitoMedium text-xl text-textPrimary">
                    Bạn chưa có tài khoản?
                  </Text>
                  <Text className="font-NunitoBold text-2xl ml-2">Đăng ký</Text>
                  <SignedOut />
                </View>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default LogIn;
