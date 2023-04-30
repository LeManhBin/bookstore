import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import {
  fetchDataDistrict,
  fetchDataProvince,
  fetchDataWard,
  fetchServiceCode,
  fetchShipMoney,
} from "../../../apis/provinceApi";

const initialState = {
  province: [],
  district: [],
  ward: [],
  serviceCode: [],
  shipMoney: [],
  isLoading: false,
  isLoadingCreate: false,
  errors: {},
};
export const actFetchDataProvince = createAsyncThunk(
  "province/actFetchDataProvince",
  async () => {
    const data = await fetchDataProvince();
    return data || [];
  }
);
export const actFetchDataDistrict = createAsyncThunk(
  "province/actFetchDataDistrict",
  async (id) => {
    const data = await fetchDataDistrict(id);
    return data || [];
  }
);
export const actFetchDataWard = createAsyncThunk(
  "province/actFetchDataWard",
  async (id) => {
    const data = await fetchDataWard(id);
    return data || [];
  }
);

//service code
export const actFetchServiceCode = createAsyncThunk(
  "province/actFetchServiceCode",
  async (payload) => {
    const data = await fetchServiceCode(payload);
    return data || [];
  }
);
//ship money
export const actFetchShipMoney = createAsyncThunk(
  "province/actFetchShipMoney",
  async (payload) => {
    const data = await fetchShipMoney(payload);
    return data || [];
  }
);

export const provinceSlice = createSlice({
  name: "province",
  initialState,
  reducers: {
    actUpdateLoadingCreate: (state, action) => {
      state.isLoadingCreate = action.payload;
    },
  },

  //province
  extraReducers: (builder) => {
    builder.addCase(actFetchDataProvince.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(actFetchDataProvince.rejected, (state) => {
      state.errors = {
        errors: "Có lỗi xảy ra!",
      };
      state.isLoading = false;
      toast.warning(state.errors);
    });

    builder.addCase(actFetchDataProvince.fulfilled, (state, action) => {
      state.isLoading = false;
      state.province = action.payload.data || [];
    });

    //district
    builder.addCase(actFetchDataDistrict.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(actFetchDataDistrict.rejected, (state) => {
      state.errors = {
        errors: "Có lỗi xảy ra!",
      };
      state.isLoading = false;
      toast.warning(state.errors);
    });

    builder.addCase(actFetchDataDistrict.fulfilled, (state, action) => {
      state.isLoading = false;
      state.district = action.payload.data || [];
    });
    //ward
    builder.addCase(actFetchDataWard.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(actFetchDataWard.rejected, (state) => {
      state.errors = {
        errors: "Có lỗi xảy ra!",
      };
      state.isLoading = false;
      toast.warning(state.errors);
    });

    builder.addCase(actFetchDataWard.fulfilled, (state, action) => {
      state.isLoading = false;
      state.ward = action.payload.data || [];
    });
    //service code
    builder.addCase(actFetchServiceCode.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(actFetchServiceCode.rejected, (state) => {
      state.errors = {
        errors: "Có lỗi xảy ra!",
      };
      state.isLoading = false;
      toast.warning(state.errors);
    });

    builder.addCase(actFetchServiceCode.fulfilled, (state, action) => {
      state.isLoading = false;
      state.serviceCode = action.payload || [];
    });
    //ship money
    builder.addCase(actFetchShipMoney.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(actFetchShipMoney.rejected, (state) => {
      state.errors = {
        errors: "Có lỗi xảy ra!",
      };
      state.isLoading = false;
      toast.warning(state.errors);
    });

    builder.addCase(actFetchShipMoney.fulfilled, (state, action) => {
      state.isLoading = false;
      state.shipMoney = action.payload || [];
    });
  },
});

export const { actUpdateLoadingCreate } = provinceSlice.actions;
export default provinceSlice.reducer;
