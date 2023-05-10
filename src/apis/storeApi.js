import axios from "axios";
import { BE_URL } from "../constants/config";
import { toast } from "react-toastify";

export const fetchAllDataStore = async () => {
  const res = await axios.get(`${BE_URL}store`);

  return res;
};

export const fetchDataStoreById = async (id) => {
  const res = await axios.get(`${BE_URL}store/${id}`);
  return res;
};

export const fetchCreateStore = async (store) => {
  const res = await axios.post(`${BE_URL}store`, store);
  if (res.status == 200) {
    toast.success("Thành công !");
    return res;
  } else {
    toast.error("Có gì đó không đúng!");
  }
};

export const fetchDeleteStore = async (id) => {
  const res = await axios.delete(`${BE_URL}store/${id}`);
  if (res.status == 200) {
    toast.success("Thành công !");
    return res;
  } else {
    toast.error("Có gì đó không đúng!");
  }
};

export const fetchUpdateStore = async (id, payload) => {
  const res = await axios.post(`${BE_URL}store/${id}`, payload);
  if (res.status == 200) {
    toast.success("Thành công !");
    return res;
  } else {
    toast.error("Có gì đó không đúng!");
  }
};
