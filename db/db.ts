import axios from "axios";
import { router } from "expo-router";
import { Alert } from "react-native";
const hostId = process.env.LOCAL_HOST_ID;
export async function LoginWithEmail(data: {
  email: string;
  password: string;
}) {
  try {
    const response = await axios.post(`${hostId}/login`, {
      email: data.email,
      password: data.password,
    });
    const { status, user }: { status: string; user: user } = response.data;
    if (status === "success") {
      console.log("success");
      console.log("user:", user);
      return user;
    } else if (status === "incorrectPassword") {
      Alert.alert("Mật khẩu không chính xác", "Vui lòng nhập lại mật khẩu");
    } else if (status === "nonExists") {
      Alert.alert("Tài khoản không tồn tại", "Vui lòng đăng ký");
    }
    console.log(response.data);
    return null;
  } catch (error) {
    console.error(error);
  }
}
export async function LoginWithClerk(clerkUser: any) {
  try {
    const response = await axios.post(`${hostId}/signUp`, {
      email: clerkUser?.emailAddresses[0].emailAddress,
      password: "1",
      fullname: clerkUser?.fullName,
      phone: "1",
    });
    const { status } = response.data;
    if (status === "success") {
      const response = await axios.post(`${hostId}/login`, {
        email: clerkUser?.emailAddresses[0].emailAddress,
        password: "1",
      });
      const { status, user }: { status: string; user: user } = response.data;
      if (status === "success") {
        console.log("success");
        console.log("user:", user);
        return user;
      }
    }
    console.log("response.data:", response.data);
    return null;
  } catch (error) {
    console.error(error);
  }
}
export async function signUp(account: {
  email: string;
  password: string;
  confirmPassword: string;
  fullname: string;
}) {
  try {
    const response = await axios.post(`${hostId}/signUp`, {
      email: account.email,
      password: account.password,
      fullname: account.fullname,
      phone: 1,
    });
    const { status, message } = response.data;
    if (status === "success") {
      const response = await axios.post(`${hostId}/login`, {
        email: account.email,
        password: account.password,
      });
      const { status, user }: { status: string; user: user } = response.data;
      if (status === "success") {
        console.log("success");
        console.log("user:", user);
        return user;
      }
    } else if (status === "exists") {
      Alert.alert(
        "Email này đã tồn tại",
        "Vui lòng đăng ký bằng tài khoản email khác"
      );
    }
    console.log("response.data:", response.data);
    return null;
  } catch (error) {
    console.error(error);
  }
}
