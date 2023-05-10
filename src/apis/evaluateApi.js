import axios from "axios";
import { BE_URL } from "../constants/config";
import { toast } from "react-toastify";

export const fetchDataEvaluateByIdBook = async (id) => {
  const res = await axios.get(`${BE_URL}book/review/${id}`);
  return res.data;
};

export const fetchCreateEvaluate = async (review) => {
  const res = await axios.post(`${BE_URL}review`, review);
  if (res.status == 200) {
    toast.success("Thành công !");
    return res.data;
  } else {
    toast.error("Có gì đó không đúng!");
  }
};
