import axios from "axios";
import { BE_URL } from "../constants/config";
import { toast } from "react-toastify";

export const fetchAllDataSlide = async () => {
  const res = await axios.get(`${BE_URL}slide`);
  return res.data;
};

export const fetchCreateSlide = async (payload) => {
  const res = await axios.post(`${BE_URL}slide`, payload);
  if (res.status == 200) {
    toast.success("Thành công !");
    return res.data;
  } else {
    toast.error("Có gì đó không đúng!");
  }
};

export const fetchChangeStatus = async (id) => {
  const res = await axios.put(`${BE_URL}slide/${id}`);
  if (res.status == 200) {
    toast.success("Thành công !");
    return res.data;
  } else {
    toast.error("Có gì đó không đúng!");
  }
};

export const fetchDeleteSlide = async (id) => {
  const res = await axios.delete(`${BE_URL}slide/${id}`);
  if (res.status == 200) {
    toast.success("Thành công !");
    return res.data;
  } else {
    toast.error("Có gì đó không đúng!");
  }
};
