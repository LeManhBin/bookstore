import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import {
  fetchAllDataService,
  fetchConfirmRegisterService,
  fetchCreateService,
  fetchDataServiceById,
  fetchDeleteService,
  fetchRegisterService,
  fetchUpdateService,
} from "../../../apis/serviceApi";

const initialState = {
  allService: [],
  service: {},
  payCode: {},
  isLoading: false,
  isLoadingCreate: false,
  errors: {},
};

export const actFetchAllService = createAsyncThunk(
  "service/actFetchAllService",
  async () => {
    const data = await fetchAllDataService();
    return data || [];
  }
);

export const actFetchServiceById = createAsyncThunk(
  "service/actFetchServiceById",
  async (id) => {
    const data = await fetchDataServiceById(id);
    return data || {};
  }
);

export const actFetchRegisterService = createAsyncThunk(
  "service/actFetchRegisterService",
  async (payload) => {
    const data = await fetchRegisterService(payload);
    return data || {};
  }
);
export const actFetchConfirmRegisterService = createAsyncThunk(
  "service/actFetchConfirmRegisterService",
  async ({ idUser, idService }) => {
    const data = await fetchConfirmRegisterService(idUser, idService);
    return data || {};
  }
);

export const serviceSlice = createSlice({
  name: "service",
  initialState,
  reducers: {
    actUpdateLoadingCreate: (state, action) => {
      state.isLoadingCreate = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(actFetchAllService.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(actFetchAllService.rejected, (state) => {
      state.errors = {
        errors: "Có lỗi xảy ra!",
      };
      state.isLoading = false;
      toast.warning(state.errors);
    });

    builder.addCase(actFetchAllService.fulfilled, (state, action) => {
      state.isLoading = false;
      state.allService = action.payload.data.data || [];
    });

    builder.addCase(actFetchServiceById.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(actFetchServiceById.rejected, (state) => {
      state.errors = {
        errors: "Có lỗi xảy ra!",
      };
      state.isLoading = false;
      toast.warning(state.errors);
    });

    builder.addCase(actFetchServiceById.fulfilled, (state, action) => {
      state.isLoading = false;
      state.service = action.payload.data.data;
      // state.user = action.payload.data.user || {}
      // state.image =  action.payload.data.image|| {}
    });

    //register service
    builder.addCase(actFetchRegisterService.fulfilled, (state, action) => {
      state.isLoading = false;
      console.log(action.payload.data, "register service");
      state.payCode = action.payload.data;
    });
  },
});

export const actCreateService = (service) => async (dispatch) => {
  try {
    dispatch(actUpdateLoadingCreate(true));
    await fetchCreateService(service);
    dispatch(actFetchAllService());
    toast.success("Thêm mới thành công");
  } catch (error) {
    console.log(error);
  } finally {
    dispatch(actUpdateLoadingCreate(false));
  }
};

export const actDeleteService = (id) => async (dispatch) => {
  try {
    await fetchDeleteService(id);
    dispatch(actFetchAllService());
    toast.success("Xoá thành công");
  } catch (error) {
    console.log(error);
  } finally {
    dispatch(actUpdateLoadingCreate(false));
  }
};

export const actUpdateService = (id, payload) => async (dispatch) => {
  try {
    await fetchUpdateService(id, payload);
    await dispatch(actFetchAllService());
    dispatch(actUpdateLoadingCreate(true));
    toast.success("Cập nhật thành công");
  } catch (error) {
    console.log(error);
  } finally {
    dispatch(actUpdateLoadingCreate(false));
  }
};

// export const actRegisterService = (payload) => async (dispatch) => {
//     try {
//         const data = await fetchRegisterService(payload);
//         console.log(data, 'cái này pay bên redux');
//         toast.success('Đăng ký thành công')
//     } catch (error) {
//         console.log(error);
//     } finally {
//         dispatch(actUpdateLoadingCreate(false))
//     }
// }

export const { actUpdateLoadingCreate } = serviceSlice.actions;
export default serviceSlice.reducer;
