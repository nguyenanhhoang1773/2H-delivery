import {
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  Alert,
  ActivityIndicator,
} from "react-native";
import React, { useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Link, router } from "expo-router";
import LottieView from "lottie-react-native";
import images from "@/constants/images";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import * as colors from "@/constants/color";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { ScrollView } from "react-native-gesture-handler";
import SimpleLineIcons from "@expo/vector-icons/SimpleLineIcons";
import { useApi } from "@/db/useApi";
import { signUp } from "@/db/db";
import { useAppDispatch } from "@/redux/hooks";
import { login } from "@/redux/features/user/userSlice";
import AntDesign from "@expo/vector-icons/AntDesign";
import Ionicons from "@expo/vector-icons/Ionicons";
import Toast from "react-native-toast-message";
const schema = yup.object().shape({
  fullname: yup.string().required("Họ và tên không được bỏ trống"),
  email: yup
    .string()
    .email("Đây không phải là email")
    .required("Email không được bỏ trống"),
  password: yup
    .string()
    .required("Mật khẩu không được bỏ trống")
    .min(9, "Mật khẩu phải tối thiểu là 9 chữ số"),
  confirmPassword: yup
    .string()
    .required("Hãy nhập lại mật khẩu")
    .oneOf([yup.ref("password"), ""], "Mật khẩu không trùng khớp"),
});
const SignUp = () => {
  const { fetchData, data, loading } = useApi();
  const dispatch = useAppDispatch();
  const windowHeight = Dimensions.get("window").height;
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
      fullname: "",
    },
    resolver: yupResolver(schema),
  });
  const onSubmit = async (data: {
    email: string;
    password: string;
    confirmPassword: string;
    fullname: string;
  }) => {
    console.log("press");

    await fetchData(signUp(data));
  };
  const onSumitError = () => {
    console.log(errors);
    Alert.alert("Đăng ký không thành công", "Vui lòng kiểm tra lại thông tin");
  };
  useEffect(() => {
    if (data) {
      console.log(data);
      dispatch(
        login({
          fullname: data?.fullname,
          id: data?.id,
          phone: data?.phone,
        })
      );
      Toast.show({
        type: "success",
        text1: "Welcome",
        text2: "Chúc mừng bạn đã đăng ký thành công 👋",
      });
    }
  }, [data]);
  useEffect(() => {
    console.log(errors);
  }, [errors]);
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
    <SafeAreaView className="flex-1 bg-white">
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <TouchableOpacity
          onPress={() => router.back()}
          className="absolute top-0 left-6 p-2  items-center justify-center z-10"
        >
          <Ionicons
            size={34}
            name="arrow-back"
          />
        </TouchableOpacity>
        <ScrollView contentContainerClassName="">
          <LottieView
            style={{
              width: "100%",
              height: windowHeight / 3,
            }}
            source={require("@/assets/lottie/signUp.json")}
            autoPlay
            loop
          />
          <View className="px-10">
            <Text className="font-NunitoBold text-4xl ">Đăng ký</Text>
            <View className="flex-row items-center justify-center mt-4">
              <TouchableOpacity className="py-4 flex-1 rounded-2xl  border border-secondPrimary items-center justify-center">
                <Image
                  source={images.google}
                  className="size-8"
                />
              </TouchableOpacity>
              <TouchableOpacity className="py-4 ml-5 rounded-2xl  flex-1 border border-secondPrimary items-center justify-center">
                <Image
                  source={images.facebook}
                  className="size-8"
                />
              </TouchableOpacity>
              <TouchableOpacity className="py-4 ml-5 rounded-2xl  flex-1 border border-secondPrimary items-center justify-center">
                <Image
                  source={images.apple}
                  className="size-8"
                />
              </TouchableOpacity>
            </View>
            <Text className="mt-5 mb-2 font-NunitoMedium text-textPrimary text-center">
              Or, register with email...
            </Text>
            <View>
              <View
                className={`flex-row ${
                  errors.fullname && "bg-red-50"
                } px-2 rounded-3xl  items-center   border-b border-secondPrimary`}
              >
                <MaterialCommunityIcons
                  color={errors.fullname ? "#ff6467" : colors.textPrimary}
                  size={20}
                  name="account-outline"
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
                      placeholderTextColor={colors.textPrimary}
                      className="ml-2 text-xl py-4 flex-1 font-NunitoMedium"
                      placeholder="Full name"
                      onBlur={onBlur}
                      onChangeText={onChange}
                      value={value}
                    />
                  )}
                  name="fullname"
                />
              </View>
              {errors.fullname && (
                <Text className="mt-2 text-red-400">
                  {errors.fullname.message}
                </Text>
              )}

              <View
                className={`flex-row ${
                  errors.email && "bg-red-50"
                } px-2 rounded-3xl items-center mt-5 border-b border-secondPrimary`}
              >
                <MaterialIcons
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
                      className="ml-2 text-xl flex-1 py-4 font-NunitoMedium"
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
                <MaterialIcons
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
                      className="ml-2 text-xl py-4 flex-1 font-NunitoMedium"
                      placeholder="Password"
                      onBlur={onBlur}
                      onChangeText={onChange}
                      value={value}
                    />
                  )}
                  name="password"
                />
              </View>
              {errors.password && (
                <Text className="mt-2 text-red-400">
                  {errors.password.message}
                </Text>
              )}

              <View
                className={`flex-row ${
                  errors.confirmPassword && "bg-red-50"
                } px-2 rounded-3xl items-center mt-5 border-b border-secondPrimary`}
              >
                <MaterialIcons
                  color={
                    errors.confirmPassword ? "#ff6467" : colors.textPrimary
                  }
                  size={20}
                  name="lock"
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
                      className="ml-2 text-xl py-4 flex-1 font-NunitoMedium"
                      placeholder="Confirm Password"
                      onBlur={onBlur}
                      onChangeText={onChange}
                      value={value}
                    />
                  )}
                  name="confirmPassword"
                />
              </View>
              {errors.confirmPassword && (
                <Text className="mt-2 text-red-400">
                  {errors.confirmPassword.message}
                </Text>
              )}
            </View>

            <View className="px-10 mt-2">
              <TouchableOpacity
                onPress={handleSubmit(onSubmit, onSumitError)}
                className="w-full py-5 bg-primary rounded-2xl mt-8  justify-center items-center"
              >
                <Text className="text-2xl font-NunitoSemiBold">Đăng ký</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};
export default SignUp;
