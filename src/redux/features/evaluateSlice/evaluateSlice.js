import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import {
  fetchCreateEvaluate,
  fetchDataEvaluateByIdBook,
} from "../../../apis/evaluateApi";

const initialState = {
  allEvaluate: [],
  evaluate: [],
  isLoading: false,
  isLoadingCreate: false,
  errors: {},
};
export const actFetchDataEvaluateByIdBook = createAsyncThunk(
  "evaluate/actFetchDataEvaluateByIdBook",
  async (id) => {
    const data = await fetchDataEvaluateByIdBook(id);
    return data || [];
  }
);
export const evaluateSlice = createSlice({
  name: "evaluate",
  initialState,
  reducers: {
    actUpdateLoadingCreate: (state, action) => {
      state.isLoadingCreate = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(actFetchDataEvaluateByIdBook.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(actFetchDataEvaluateByIdBook.rejected, (state) => {
      state.errors = {
        errors: "Có lỗi xảy ra!",
      };
      state.isLoading = false;
      toast.warning(state.errors);
    });

    builder.addCase(actFetchDataEvaluateByIdBook.fulfilled, (state, action) => {
      state.isLoading = false;
      state.evaluate = action.payload.data || [];
    });
  },
});
export const actCreateEvaluate = (payload) => async (dispatch) => {
  try {
    dispatch(actUpdateLoadingCreate(true));
    await fetchCreateEvaluate(payload);
  } catch (error) {
    console.log(error);
  } finally {
    dispatch(actUpdateLoadingCreate(false));
  }
};

export const { actUpdateLoadingCreate } = evaluateSlice.actions;
export default evaluateSlice.reducer;
