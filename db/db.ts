import axios from "@/axios";
import { user } from "@/type/type";
export async function LoginWithClerk(clerkUser: any) {
  try {
    const response = await axios.post(`/login`, {
      email: clerkUser?.emailAddresses[0].emailAddress,
      fullname: clerkUser?.fullName,
      phone: "1",
    });
    const { user }: { user: user } = response.data;
    return user;
  } catch (error) {
    console.error(error);
  }
}
