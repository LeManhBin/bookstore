import axios from "axios";
import { BE_URL } from "../constants/config";

export const fetchAllDataSlide = async () => {
  const res = await axios.get(`${BE_URL}slide`);
  return res.data;
};

export const fetchCreateSlide = async (payload) => {
  const res = await axios.post(`${BE_URL}slide`, payload);
  return res.data;
};

export const fetchChangeStatus = async (id) => {
  const res = await axios.put(`${BE_URL}slide/${id}`);
  return res.data;
};

export const fetchDeleteSlide = async (id) => {
  const res = await axios.delete(`${BE_URL}slide/${id}`);
  return res.data;
};
