import axios from 'axios'
import { BE_URL } from '../constants/config'

export const fetchAllDataUser =  async () => {
    const res = await axios.get(`${BE_URL}user`);
    return  res.data;
}

export const fetchDataUserById =  async (id) => {
    const res = await axios.get(`${BE_URL}user/${id}`);
    return  res.data;
}

export const fetchCreateUser =  async (user) => {
    const res = await axios.post(`${BE_URL}user`, user);
    return  res.data;
}

export const fetchDeleteUser = async (id) => {
    const res = await axios.delete(`${BE_URL}user/${id}`);
    return res.data
}

export const fetchUpdateUser = async (id, payload) => {
    const res = await axios.put(`${BE_URL}user/${id}`, payload);
    return res.data
}

export const fetchCreateImg =  async (file) => {
    const res = await axios.post(`${BE_URL}upload`, file);
    return  res.data;
}