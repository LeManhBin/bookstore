import axios from "axios";
import { BE_URL } from "../constants/config";
import { toast } from "react-toastify";

export const fetchRegisterUser = async (data) => {
  const res = await axios.post(`${BE_URL}register`, data);
  if (res.status == 200) {
    toast.success("Thành công !");
    return res.data;
  } else {
    toast.error("Có gì đó không đúng!");
  }
};

export const fetchCheckEmailUser = async (data) => {
  try {
    const res = await axios.post(`${BE_URL}checkemail`, data);
    if (res.status === 200) {
      toast.success("Ok");
      return true;
    } else {
      toast.warning("Tài khoản đã có người sử dụng");
      return false;
    }
  } catch (error) {
    console.error(error);
    toast.error("Đăng ký thất bại");
    return false; // Đăng ký thất bại
  }
};

export const fetchOtp = async (email) => {
  const res = await axios.get(`${BE_URL}otp?email=${email}`);
  return res.data;
};
