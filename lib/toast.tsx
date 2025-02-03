import Toast, { BaseToast, ErrorToast } from "react-native-toast-message";
import { primary, textPrimary } from "@/constants/color";
const toastConfig = {
  success: (props: any) => (
    <BaseToast
      {...props}
      style={{
        borderLeftColor: primary,
        width: "85%",
        paddingVertical: 8,
        height: 80,
      }}
      contentContainerStyle={{ paddingHorizontal: 15 }}
      text1Style={{
        fontSize: 22,
        fontFamily: "Nunito-Bold",
      }}
      text2Style={{
        fontSize: 16,
        fontFamily: "Nunito-Medium",
        color: textPrimary,
      }}
    />
  ),
  /*
      Overwrite 'error' type,
      by modifying the existing `ErrorToast` component
    */
  error: (props: any) => (
    <ErrorToast
      {...props}
      text1Style={{
        fontSize: 17,
      }}
      text2Style={{
        fontSize: 15,
      }}
    />
  ),
  /*
      Or create a completely new type - `tomatoToast`,
      building the layout from scratch.
  
      I can consume any custom `props` I want.
      They will be passed when calling the `show` method (see below)
    */
};
export default toastConfig;
