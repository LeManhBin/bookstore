import axios from 'axios'
import { BE_URL } from '../constants/config'

export const fetchAllDataTopic =  async () => {
    const res = await axios.get(`${BE_URL}topic`);
    return  res.data;
}

export const fetchDataTopicById =  async (id) => {
    const res = await axios.get(`${BE_URL}topic/${id}`);
    return  res.data;
}

export const fetchCreateTopic =  async (topic) => {
    const res = await axios.post(`${BE_URL}topic`, topic);
    return  res.data;
}

export const fetchDeleteTopic = async (id) => {
    const res = await axios.delete(`${BE_URL}topic/${id}`);
    return res.data
}

export const fetchUpdateTopic = async (id, payload) => {
    const res = await axios.put(`${BE_URL}topic/${id}`, payload);
    return res.data
}