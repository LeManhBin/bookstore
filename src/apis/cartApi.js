import axios from 'axios'
import { BE_URL } from '../constants/config'

export const fetchAllDataCartByIdUser =  async (id) => {
    const res = await axios.get(`${BE_URL}carts/${id}`);
    return  res;
}

export const fetchUpdateQuantityCart =  async (id, amount) => {
    const res = await axios.put(`${BE_URL}cart/${id}?amount=${amount}`);
    return  res;
}

export const fetchCreateCart =  async (cart) => {
    const res = await axios.post(`${BE_URL}cart`, cart);
    return  res;
}

export const fetchDeleteCart = async (id) => {
    const res = await axios.delete(`${BE_URL}cart/${id}`);
    return res
}

