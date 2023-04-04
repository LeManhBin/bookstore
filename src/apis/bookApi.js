import axios from 'axios'
import { BE_URL } from '../constants/config'

export const fetchAllDataBook =  async () => {
    const res = await axios.get(`${BE_URL}books`);
    return  res;
}

export const fetchDataBookById =  async (id) => {
    const res = await axios.get(`${BE_URL}book/${id}`);
    return res;
}

export const fetchDataBookByIdStore =  async (id) => {
    const res = await axios.get(`${BE_URL}books/${id}`);
    return res;
}

export const fetchDataBookByIdCategory =  async (id) => {
    const res = await axios.get(`${BE_URL}book/related/${id}`);
    return res;
}

export const fetchCreateBook =  async (book) => {
    const res = await axios.post(`${BE_URL}book`, book);
    return  res;
}

export const fetchDeleteBook = async (id) => {
    const res = await axios.delete(`${BE_URL}book/${id}`);
    return res
}

export const fetchUpdateBook = async (id, payload) => {
    const res = await axios.post(`${BE_URL}book/${id}`, payload);
    return res
}

export const fetchSearchBook = async (search) => {
    const res = await axios.get(`${BE_URL}book/search/${search}`);
    return res.data
}
