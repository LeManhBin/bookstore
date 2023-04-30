import axios from "axios";
import { BE_URL } from "../constants/config";

export const fetchAllDataBook = async () => {
  const res = await axios.get(`${BE_URL}books`);
  return res;
};

export const fetchBookBestSelling = async () => {
  const res = await axios.get(`${BE_URL}book/bestselling`);
  return res;
};

export const fetchDataBookById = async (id) => {
  const res = await axios.get(`${BE_URL}book/${id}`);
  return res;
};

export const fetchDataBookByIdStore = async (id) => {
  const res = await axios.get(`${BE_URL}books/${id}`);
  return res;
};

export const fetchDataBookByIdCategory = async (id) => {
  const res = await axios.get(`${BE_URL}book/related/${id}`);
  return res;
};

export const fetchCreateBook = async (book) => {
  const res = await axios.post(`${BE_URL}book`, book);
  return res;
};

export const fetchDeleteBook = async (id) => {
  const res = await axios.delete(`${BE_URL}book/${id}`);
  return res;
};

export const fetchUpdateBook = async (id, payload) => {
  const res = await axios.post(`${BE_URL}book/${id}`, payload);
  return res;
};

export const fetchSearchBook = async (search) => {
  const res = await axios.get(`${BE_URL}book/search/${search}`);
  return res.data;
};

export const fetchBookPromotionsByTime = async (idStore, start, end) => {
  const res = await axios.get(
    `${BE_URL}promotions/book/${idStore}?startDate=${start}&endDate=${end}`
  );
  return res;
};

export const fetchCreatePromotion = async (payload) => {
  const res = await axios.post(`${BE_URL}promotion`, payload);
  return res;
};

export const fetchPromotionByIdStore = async (id) => {
  const res = await axios.get(`${BE_URL}promotions/${id}`);
  return res;
};

export const fetchPromotionByIdPromotion = async (id) => {
  const res = await axios.get(`${BE_URL}promotion/${id}`);
  return res;
};

export const fetchDetailPromotion = async (idStore, idPromotion) => {
  const res = await axios.get(
    `${BE_URL}promotions/book/${idStore}/${idPromotion}`
  );
  return res;
};

export const fetchDeletePromotion = async (id) => {
  const res = await axios.delete(`${BE_URL}promotion/${id}`);
  return res;
};

export const fetchUpdatePromotion = async (id, payload) => {
  const res = await axios.put(`${BE_URL}promotion/${id}`, payload);
  return res;
};
