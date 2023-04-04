import axios from 'axios'
import { BE_URL } from '../constants/config'

export const fetchAllDataService =  async () => {
    const res = await axios.get(`${BE_URL}service`);
    return  res;
}

export const fetchDataServiceById =  async (id) => {
    const res = await axios.get(`${BE_URL}service/${id}`);
    return res;
}

export const fetchCreateService =  async (service) => {
    const res = await axios.post(`${BE_URL}service`, service);
    return  res;
}

export const fetchDeleteService = async (id) => {
    const res = await axios.delete(`${BE_URL}service/${id}`);
    return res
}

export const fetchUpdateService = async (id, payload) => {
    const res = await axios.post(`${BE_URL}service/${id}`, payload);
    return res
}
