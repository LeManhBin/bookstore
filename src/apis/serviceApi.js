import axios from "axios";
import { BE_URL } from "../constants/config";
import { toast } from "react-toastify";

export const fetchAllDataService = async () => {
  const res = await axios.get(`${BE_URL}service`);
  return res;
};

export const fetchDataServiceById = async (id) => {
  const res = await axios.get(`${BE_URL}service/${id}`);
  return res;
};

export const fetchCreateService = async (service) => {
  const res = await axios.post(`${BE_URL}service`, service);
  if (res.status == 200) {
    toast.success("Thành công !");
    return res;
  } else {
    toast.error("Có gì đó không đúng!");
  }
};

export const fetchDeleteService = async (id) => {
  const res = await axios.delete(`${BE_URL}service/${id}`);
  if (res.status == 200) {
    toast.success("Thành công !");
    return res;
  } else {
    toast.error("Có gì đó không đúng!");
  }
};

export const fetchUpdateService = async (id, payload) => {
  const res = await axios.post(`${BE_URL}service/${id}`, payload);
  if (res.status == 200) {
    toast.success("Thành công !");
    return res;
  } else {
    toast.error("Có gì đó không đúng!");
  }
};

export const fetchRegisterService = async (payload) => {
  const res = await axios.post(`http://localhost:8080/vnpay/service`, payload);
  if (res?.status === 200) {
    return res.data;
  } else {
    toast.warn("Lỗi");
  }
};

export const fetchConfirmRegisterService = async (idStore, idService) => {
  const res = await axios.post(`${BE_URL}store/${idStore}/${idService}`);
  return res.data;
};
