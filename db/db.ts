import axios from "axios";
const hostId = process.env.EXPO_PUBLIC_LOCAL_HOST_ID!;
export async function LoginWithClerk(clerkUser: any) {
  try {
    const response = await axios.post(`${hostId}/login`, {
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
