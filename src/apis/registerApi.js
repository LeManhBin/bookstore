import axios from 'axios'


export const fetchRegisterUser =  async (data) => {
    const res = await axios.post(`http://localhost:8080/BookStore/api/register`, data);
    return  res.data;
}

export const fetchCheckEmailUser = async (data) => {
    try {
      const res = await axios.post(`http://localhost:8080/BookStore/api/checkemail`, data);
      if (res.status === 200) {
        return true;
      } else if(res.status === 400) {
        return false;
      }
    } catch (error) {
      console.error(error);
      return false; // Đăng ký thất bại
    }
  }

  export const fetchOtp =  async (email) => {
    const res = await axios.get(`http://localhost:8080/BookStore/api/otp?email=${email}`);
    return  res.data;
}