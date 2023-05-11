import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { fetchCreatePayment, fetchPayment } from "../../../apis/paymentApi";
import { fetchAdminReport } from "../../../apis/dashBoardApi";

const initialState = {
  allPayment: [],
  reportAdmin: {},
  payment: {},
  isLoading: false,
  isLoadingCreate: false,
  errors: {},
};

export const actFetchAllPayment = createAsyncThunk(
  "payment/actFetchAllPayment",
  async (id) => {
    const data = await fetchPayment(id);
    return data || [];
  }
);

export const actFetchAdminReport = createAsyncThunk(
  "payment/actFetchAdminReport",
  async ({ startDate, endDate }) => {
    const data = await fetchAdminReport(startDate, endDate);
    return data || {};
  }
);

export const paymentSlice = createSlice({
  name: "payload",
  initialState,
  reducers: {
    actUpdateLoadingCreate: (state, action) => {
      state.isLoadingCreate = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(actFetchAllPayment.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(actFetchAllPayment.rejected, (state) => {
      state.errors = {
        errors: "Có lỗi xảy ra!",
      };
      state.isLoading = false;
      toast.warning(state.errors);
    });

    builder.addCase(actFetchAllPayment.fulfilled, (state, action) => {
      state.isLoading = false;
      state.allPayment = action.payload.data.data || [];
    });

    //Admin report
    builder.addCase(actFetchAdminReport.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(actFetchAdminReport.rejected, (state) => {
      state.errors = {
        errors: "Có lỗi xảy ra!",
      };
      state.isLoading = false;
      toast.warning(state.errors);
    });

    builder.addCase(actFetchAdminReport.fulfilled, (state, action) => {
      state.isLoading = false;
      state.reportAdmin = action.payload.data || {};
    });
  },
});

export const actCreatePayment = (payload) => async (dispatch) => {
  try {
    dispatch(actUpdateLoadingCreate(true));
    await fetchCreatePayment(payload);
  } catch (error) {
    console.log(error);
  } finally {
    dispatch(actUpdateLoadingCreate(false));
  }
};

export const { actUpdateLoadingCreate } = paymentSlice.actions;
export default paymentSlice.reducer;
