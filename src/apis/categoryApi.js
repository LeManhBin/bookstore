import axios from 'axios'
import { BE_URL } from '../constants/config'

export const fetchAllDataCategory =  async () => {
    const res = await axios.get(`${BE_URL}category`);
    return  res.data;
}

export const fetchDataCategoryById =  async (id) => {
    const res = await axios.get(`${BE_URL}category/${id}`);
    return  res.data;
}

export const fetchCreateCategory =  async (category) => {
    const res = await axios.post(`${BE_URL}category`, category);
    return  res.data;
}

export const fetchDeleteCategory = async (id) => {
    const res = await axios.delete(`${BE_URL}category/${id}`);
    return res.data
}

export const fetchUpdateCategory = async (id, payload) => {
    const res = await axios.put(`${BE_URL}category/${id}`, payload);
    return res.data
}