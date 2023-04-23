import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import {
  fetchAllDataSlide,
  fetchChangeStatus,
  fetchCreateSlide,
  fetchDeleteSlide,
} from "../../../apis/slideApi";

const initialState = {
  allSlide: [],
  isLoading: false,
  isLoadingCreate: false,
  errors: {},
};

export const actFetchAllSlide = createAsyncThunk(
  "slide/actFetchAllSlide",
  async () => {
    const data = await fetchAllDataSlide();
    return data || [];
  }
);

export const slideSlice = createSlice({
  name: "slide",
  initialState,
  reducers: {
    actUpdateLoadingCreate: (state, action) => {
      state.isLoadingCreate = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(actFetchAllSlide.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(actFetchAllSlide.rejected, (state) => {
      state.errors = {
        errors: "Có lỗi xảy ra!",
      };
      state.isLoading = false;
      toast.warning(state.errors);
    });

    builder.addCase(actFetchAllSlide.fulfilled, (state, action) => {
      state.isLoading = false;
      state.allSlide = action.payload.data || [];
    });
  },
});

export const actCreateSlide = (payload) => async (dispatch) => {
  try {
    await fetchCreateSlide(payload);
    dispatch(actFetchAllSlide());
    toast.success("Tạo thành công");
  } catch (error) {
    console.log(error);
  } finally {
    dispatch(actUpdateLoadingCreate(false));
  }
};

export const actChangeStatusSlide = (id) => async (dispatch) => {
  try {
    await fetchChangeStatus(id);
    dispatch(actFetchAllSlide());
    toast.success("Thành công");
  } catch (error) {
    console.log(error);
  } finally {
    dispatch(actUpdateLoadingCreate(false));
  }
};

export const actDeleteSlide = (id) => async (dispatch) => {
  try {
    await fetchDeleteSlide(id);
    dispatch(actFetchAllSlide());
    toast.success("Thành công");
  } catch (error) {
    console.log(error);
  } finally {
    dispatch(actUpdateLoadingCreate(false));
  }
};

export const { actUpdateLoadingCreate } = slideSlice.actions;
export default slideSlice.reducer;
