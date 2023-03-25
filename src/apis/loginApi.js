
import axios from 'axios'

export const fetchLoginUser =  async (data) => {
    const res = await axios.post(`http://localhost:8080/BookStore/login`, data);
    return  res.data;
}

export const fetchInforMe = async (email) => {
    const res = await axios.get(`${BE_URL}user?email=${email}`);
    return res.data
}
