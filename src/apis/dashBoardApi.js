import axios from "axios";
import { BE_URL } from "../constants/config";

export const fetchAdminReport = async (startDate, endDate) => {
  const res = await axios.get(
    `${BE_URL}report/?startDate=${startDate}&endDate=${endDate}`
  );
  return res.data;
};
