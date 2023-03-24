import axios from 'axios'
import { BE_URL } from '../constants/config'

export const fetchAllDataStore =  async () => {
    const res = await axios.get(`${BE_URL}store`);
    
    return  res;
}

export const fetchDataStoreById =  async (id) => {
    const res = await axios.get(`${BE_URL}store/${id}`);
    return res;
}

export const fetchCreateStore =  async (store) => {
    const res = await axios.post(`${BE_URL}store`, store);
    return  res;
}

export const fetchDeleteStore = async (id) => {
    const res = await axios.delete(`${BE_URL}store/${id}`);
    return res
}

export const fetchUpdateStore = async (id, payload) => {
    const res = await axios.post(`${BE_URL}store/${id}`, payload);
    return res
}
