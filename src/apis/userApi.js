import axios from "axios";
import { BE_URL } from "../constants/config";
import { toast } from "react-toastify";

export const fetchAllDataUser = async () => {
  const res = await axios.get(`${BE_URL}user`);

  return res;
};

export const fetchDataUserById = async (id) => {
  const res = await axios.get(`${BE_URL}user/${id}`);
  return res;
};

export const fetchCreateUser = async (user) => {
  const res = await axios.post(`${BE_URL}user`, user);
  if (res.status === 200) {
    toast.success("Thành công !");
    return res;
  } else if (res.status == 409) {
    toast.warning("Tài khoản đã tồn tại");
  } else {
    toast.error("Có gì đó không đúng!");
  }
};

export const fetchDeleteUser = async (id) => {
  const res = await axios.delete(`${BE_URL}user/${id}`);
  if (res.status == 200) {
    toast.success("Thành công !");
    return res;
  } else {
    toast.error("Có gì đó không đúng!");
  }
};

export const fetchUpdateUser = async (id, payload) => {
  const res = await axios.post(`${BE_URL}user/${id}`, payload);
  if (res.status == 200) {
    toast.success("Thành công !");
    return res;
  } else {
    toast.error("Có gì đó không đúng!");
  }
};

export const fetchUpdatePassword = async (id, payload) => {
  const res = await axios.put(`${BE_URL}password/update/${id}`, payload);
  if (res.data.data === false) {
    toast.warning("Password không chính xác");
  } else if (res.data.status === 200) {
    toast.success("Thành công");
    return res;
  }
};

export const fetchCreateAddress = async (id, address) => {
  const res = await axios.post(`${BE_URL}address/${id}`, address);
  if (res.status == 200) {
    toast.success("Thành công !");
    return res.data;
  } else {
    toast.error("Có gì đó không đúng!");
  }
};

export const fetchUpdateAddress = async (id, address) => {
  const res = await axios.put(`${BE_URL}address/${id}`, address);
  if (res.status == 200) {
    toast.success("Thành công !");
    return res.data;
  } else {
    toast.error("Có gì đó không đúng!");
  }
};
