import axios from "axios";
import { BE_URL } from "../constants/config";
import { toast } from "react-toastify";

export const fetchAllDataCartByIdUser = async (id) => {
  const res = await axios.get(`${BE_URL}carts/${id}`);
  return res;
};

export const fetchUpdateQuantityCart = async (id, amount) => {
  const res = await axios.put(`${BE_URL}cart/${id}?amount=${amount}`);
  if (res.status == 200) {
    toast.success("Thành công !");
    return res;
  } else {
    toast.error("Có gì đó không đúng!");
  }
};

export const fetchCreateCart = async (cart) => {
  const res = await axios.post(`${BE_URL}cart`, cart);
  if (res.status == 200) {
    toast.success("Thành công !");
    return res;
  } else {
    toast.error("Có gì đó không đúng!");
  }
};

export const fetchDeleteCart = async (id) => {
  const res = await axios.delete(`${BE_URL}cart/${id}`);
  if (res.status == 200) {
    toast.success("Thành công !");
    return res;
  } else {
    toast.error("Có gì đó không đúng!");
  }
};
