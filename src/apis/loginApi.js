import axios from "axios";
import { BE_URL } from "../constants/config";
import { toast } from "react-toastify";

export const fetchLoginUser = async (data) => {
  const res = await axios.post(
    `http://localhost:8080/BookStore/api/login`,
    data
  );
  if (res.status == 200) {
    toast.success("Thành công !");
    return res.data;
  } else {
    toast.error("Có gì đó không đúng!");
  }
};

export const fetchInforMe = async (email) => {
  const res = await axios.get(`${BE_URL}user?email=${email}`);
  return res.data;
};
