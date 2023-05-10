import axios from "axios";
import { BE_URL } from "../constants/config";
import { toast } from "react-toastify";

export const fetchAllDataContact = async () => {
  const res = await axios.get(`${BE_URL}contact`);
  return res.data;
};

export const fetchDataContactById = async (id) => {
  const res = await axios.get(`${BE_URL}contact/${id}`);
  return res.data;
};

export const fetchCreateContact = async (contact) => {
  const res = await axios.post(`${BE_URL}contact`, contact);
  if (res.status === 200) {
    toast.success("Cảm ơn bạn đã phản hồi");
    return res.data;
  } else {
    toast.warning("Có gì đó không đúng");
  }
};

export const fetchDeleteContact = async (id) => {
  const res = await axios.delete(`${BE_URL}contact/${id}`);
  if (res.status == 200) {
    toast.success("Thành công !");
    return res;
  } else {
    toast.error("Có gì đó không đúng!");
  }
};

export const fetchUpdateContact = async (id, payload) => {
  const res = await axios.put(`${BE_URL}contact/${id}`, payload);
  if (res.status == 200) {
    toast.success("Thành công !");
    return res;
  } else {
    toast.error("Có gì đó không đúng!");
  }
};

export const fetchReplyContact = async (contact) => {
  const res = await axios.post(`${BE_URL}contact/reply`, contact);
  if (res.status == 200) {
    toast.success("Thành công !");
    return res;
  } else {
    toast.error("Có gì đó không đúng!");
  }
};
