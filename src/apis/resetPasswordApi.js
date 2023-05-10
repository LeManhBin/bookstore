import axios from "axios";
import { BE_URL } from "../constants/config";
import { toast } from "react-toastify";

export const fetchResetPassword = async (payload) => {
  const res = await axios.put(`${BE_URL}password/reset`, payload);
  if (res.status == 200) {
    toast.success("Thành công !");
    return res;
  } else {
    toast.error("Có gì đó không đúng!");
  }
};
