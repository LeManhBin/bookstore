import axios from "axios";
import { BE_URL } from "../constants/config";

export const fetchRegisterUser = async (data) => {
  const res = await axios.post(`${BE_URL}register`, data);
  return res.data;
};

export const fetchCheckEmailUser = async (data) => {
  try {
    const res = await axios.post(`${BE_URL}checkemail`, data);
    if (res.status === 200) {
      return true;
    } else if (res.status === 400) {
      return false;
    }
  } catch (error) {
    console.error(error);
    return false; // Đăng ký thất bại
  }
};

export const fetchOtp = async (email) => {
  const res = await axios.get(`${BE_URL}otp?email=${email}`);
  return res.data;
};
