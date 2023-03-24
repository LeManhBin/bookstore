import axios from 'axios'
import { BE_URL } from '../constants/config'

export const fetchAllDataContact =  async () => {
    const res = await axios.get(`${BE_URL}contact`);
    return  res.data;
}

export const fetchDataContactById =  async (id) => {
    const res = await axios.get(`${BE_URL}contact/${id}`);
    return  res.data;
}

export const fetchCreateContact =  async (contact) => {
    const res = await axios.post(`${BE_URL}contact`, contact);
    return  res.data;
}

export const fetchDeleteContact = async (id) => {
    const res = await axios.delete(`${BE_URL}contact/${id}`);
    return res.data
}

export const fetchUpdateContact = async (id, payload) => {
    const res = await axios.put(`${BE_URL}contact/${id}`, payload);
    return res.data
}

export const fetchReplyContact = async (contact) => {
    const res = await axios.post(`${BE_URL}contact/reply`, contact);
    return res.data
}