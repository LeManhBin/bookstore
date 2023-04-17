import axios from 'axios'
import { BE_URL } from '../constants/config'


export const fetchDataEvaluateByIdBook =  async (id) => {
    const res = await axios.get(`${BE_URL}book/review/${id}`);
    return  res.data;
}

export const fetchCreateEvaluate =  async (review) => {
    const res = await axios.post(`${BE_URL}review`, review);
    return  res.data;
}