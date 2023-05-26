import axios from "axios";
import { BE_URL } from "../constants/config";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export const fetchCreateOrder = async (payload) => {
  const res = await axios.post(`${BE_URL}order`, payload);
  if (res.status) {
    toast.success("Đặt hàng thành công");
    return res;
  } else {
    toast.error("Đặt hàng thất bại");
  }
};

export const fetchOrderUserByStatus = async (id) => {
  const res = await axios.get(`${BE_URL}order/${id}`);
  return res.data;
};

export const fetchOrderByIdStore = async (id) => {
  const res = await axios.get(`${BE_URL}store/orders/${id}`);
  return res.data;
};

export const fetchChangeOrderStatus = async (id, status) => {
  const res = await axios.put(`${BE_URL}order/${id}/${status}`);
  if (res.status == 200) {
    toast.success("Thành công !");
    return res.data;
  } else {
    toast.error("Có gì đó không đúng!");
  }
};

export const fetchDetailOrder = async (id) => {
  const res = await axios.get(`${BE_URL}store/order/${id}`);
  return res.data;
};
