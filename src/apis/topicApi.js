import axios from 'axios'
import { BE_URL } from '../constants/config'

export const fetchAllDataTopic =  async () => {
    const res = await axios.get(`${BE_URL}tag`);
    return  res.data;
}

export const fetchDataTopicById =  async (id) => {
    const res = await axios.get(`${BE_URL}tag/${id}`);
    return  res.data;
}

export const fetchCreateTopic =  async (topic) => {
    const res = await axios.post(`${BE_URL}tag`, topic);
    return  res.data;
}

export const fetchDeleteTopic = async (id) => {
    const res = await axios.delete(`${BE_URL}tag/${id}`);
    return res.data
}

export const fetchUpdateTopic = async (id, payload) => {
    const res = await axios.put(`${BE_URL}tag/${id}`, payload);
    return res.data
}