import axios from "axios";

const instance = axios.create({
  baseURL: "http://192.168.110.238:3000/api", // ⚠️ Đổi IP này theo địa chỉ máy backend bạn
  headers: {
    "Content-Type": "application/json",
  },
});

export default instance;
