import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { fetchCheckEmailUser, fetchOtp } from "../../../apis/registerApi";
import {
  fetchAllDataStore,
  fetchCreateStore,
  fetchDataStoreById,
  fetchDeleteStore,
  fetchUpdateStore,
} from "../../../apis/storeApi";

const initialState = {
  allStore: [],
  store: {},
  isLoading: false,
  isLoadingCreate: false,
  isOtp: false,
  otp: "",
  errors: {},
};

export const actFetchAllStore = createAsyncThunk(
  "store/actFetchAllStore",
  async () => {
    const data = await fetchAllDataStore();
    return data || [];
  }
);

export const actFetchStoreById = createAsyncThunk(
  "store/actFetchStoreById",
  async (id) => {
    const data = await fetchDataStoreById(id);
    return data || {};
  }
);

export const actFetchCheckEmailStore = createAsyncThunk(
  "store/actFetchCheckEmailStore",
  async (data) => {
    const dataStatus = await fetchCheckEmailUser(data);
    return dataStatus;
  }
);

export const actFetchOtp = createAsyncThunk(
  "store/actFetchOtp",
  async (email) => {
    console.log(email, " email bên redux");
    const otp = await fetchOtp(email);
    console.log(otp, "otp bên reduxs");
    return otp;
  }
);

export const storeSlice = createSlice({
  name: "store",
  initialState,
  reducers: {
    actUpdateLoadingCreate: (state, action) => {
      state.isLoadingCreate = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(actFetchAllStore.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(actFetchAllStore.rejected, (state) => {
      state.errors = {
        errors: "Có lỗi xảy ra!",
      };
      state.isLoading = false;
      toast.warning(state.errors);
    });

    builder.addCase(actFetchAllStore.fulfilled, (state, action) => {
      state.isLoading = false;
      state.allStore = action.payload.data.data || [];
    });

    builder.addCase(actFetchStoreById.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(actFetchStoreById.rejected, (state) => {
      state.errors = {
        errors: "Có lỗi xảy ra!",
      };
      state.isLoading = false;
      toast.warning(state.errors);
    });

    builder.addCase(actFetchStoreById.fulfilled, (state, action) => {
      state.isLoading = false;
      state.store = action.payload.data;
    });

    //check mail
    builder.addCase(actFetchCheckEmailStore.pending, (state) => {
      state.isLoading = true;
      state.isOtp = false;
    });
    builder.addCase(actFetchCheckEmailStore.rejected, (state) => {
      state.errors = {
        errors: "Có lỗi xảy ra!",
      };
      state.isLoading = false;
      state.isOtp = false;
      toast.warning(state.errors);
    });

    builder.addCase(actFetchCheckEmailStore.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isOtp = action.payload;
    });

    //otp
    builder.addCase(actFetchOtp.fulfilled, (state, action) => {
      state.isLoading = false;
      state.otp = action.payload.data;
    });
  },
});

export const actCreateStore = (store) => async (dispatch) => {
  try {
    await fetchCreateStore(store);
    toast.success("Tạo thành công");
  } catch (error) {
    console.log(error);
  } finally {
    dispatch(actUpdateLoadingCreate(false));
  }
};
export const actDeleteStore = (id) => async (dispatch) => {
  try {
    await fetchDeleteStore(id);
    dispatch(actFetchAllStore());
    toast.success("Xoá thành công");
  } catch (error) {
    console.log(error);
  } finally {
    dispatch(actUpdateLoadingCreate(false));
  }
};
export const actUpdateStore = (id, payload) => async (dispatch) => {
  try {
    await fetchUpdateStore(id, payload);
    dispatch(actFetchStoreById(id));
    toast.success("Cập nhật thành công");
  } catch (error) {
    console.log(error);
  } finally {
    dispatch(actUpdateLoadingCreate(false));
  }
};

export const { actUpdateLoadingCreate } = storeSlice.actions;
export default storeSlice.reducer;
