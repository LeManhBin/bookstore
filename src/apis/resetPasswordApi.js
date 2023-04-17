import axios from 'axios'
import { BE_URL } from '../constants/config'


export const fetchResetPassword =  async (payload) => {
    const res = await axios.put(`${BE_URL}password/reset`, payload);
    return  res;
}
