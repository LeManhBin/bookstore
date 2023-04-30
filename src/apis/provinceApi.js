import axios from "axios";

const token = "9f6af25c-c0a6-11ed-be76-3233f989b8f3";

//Tìm địa chỉ
export const fetchDataProvince = async () => {
  const res = await axios.get(
    `https://online-gateway.ghn.vn/shiip/public-api/master-data/province`,
    {
      headers: {
        token: token,
      },
    }
  );
  return res.data;
};

export const fetchDataDistrict = async (id) => {
  if (id === 0) {
    return [];
  } else {
    const res = await axios.get(
      `https://online-gateway.ghn.vn/shiip/public-api/master-data/district?province_id=${id}`,
      {
        headers: {
          token: token,
        },
      }
    );
    return res.data;
  }
};

export const fetchDataWard = async (id) => {
  if (id === 0) {
    return [];
  } else {
    const res = await axios.get(
      `https://online-gateway.ghn.vn/shiip/public-api/master-data/ward?district_id=${id}`,
      {
        headers: {
          token: token,
        },
      }
    );
    return res.data;
  }
};

//Tính mã service

export const fetchServiceCode = async (data) => {
  const res = await axios.post(
    `https://online-gateway.ghn.vn/shiip/public-api/v2/shipping-order/available-services`,
    data,
    {
      headers: {
        token: token,
      },
    }
  );
  return res.data;
};

//tinh tiền

export const fetchShipMoney = async (data) => {
  const res = await axios.post(
    `https://online-gateway.ghn.vn/shiip/public-api/v2/shipping-order/fee`,
    data,
    {
      headers: {
        token: token,
      },
    }
  );
  return res.data;
};
