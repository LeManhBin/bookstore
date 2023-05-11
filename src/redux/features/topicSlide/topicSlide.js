import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import {
  fetchAllDataTopic,
  fetchCreateTopic,
  fetchDataTopicById,
  fetchDeleteTopic,
  fetchUpdateTopic,
} from "../../../apis/topicApi";

const initialState = {
  allTopic: [],
  topic: {},
  isLoading: false,
  isLoadingCreate: false,
  errors: {},
};

export const actFetchAllTopic = createAsyncThunk(
  "topic/actFetchAllTopic",
  async () => {
    const data = await fetchAllDataTopic();
    return data || [];
  }
);

export const actFetchTopicById = createAsyncThunk(
  "topic/actFetchTopicById",
  async (id) => {
    const data = await fetchDataTopicById(id);
    return data || {};
  }
);

export const topicSlice = createSlice({
  name: "topic",
  initialState,
  reducers: {
    actUpdateLoadingCreate: (state, action) => {
      state.isLoadingCreate = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(actFetchAllTopic.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(actFetchAllTopic.rejected, (state) => {
      state.errors = {
        errors: "Có lỗi xảy ra!",
      };
      state.isLoading = false;
      toast.warning(state.errors);
    });

    builder.addCase(actFetchAllTopic.fulfilled, (state, action) => {
      state.isLoading = false;
      state.allTopic = action.payload.data || [];
    });

    builder.addCase(actFetchTopicById.fulfilled, (state, action) => {
      state.isLoading = false;
      state.topic = action.payload.data || {};
    });
  },
});

export const actCreateTopic = (topic) => async (dispatch) => {
  try {
    dispatch(actUpdateLoadingCreate(true));
    await fetchCreateTopic(topic);
    dispatch(actFetchAllTopic());
  } catch (error) {
    console.log(error);
  } finally {
    dispatch(actUpdateLoadingCreate(false));
  }
};

export const actDeleteTopic = (id) => async (dispatch) => {
  try {
    await fetchDeleteTopic(id);
    dispatch(actFetchAllTopic());
  } catch (error) {
    console.log(error);
  } finally {
    dispatch(actUpdateLoadingCreate(false));
  }
};

export const actUpdateTopic = (id, payload) => async (dispatch) => {
  try {
    await fetchUpdateTopic(id, payload);
    await dispatch(actFetchAllTopic());
    dispatch(actUpdateLoadingCreate(true));
  } catch (error) {
    console.log(error);
  } finally {
    dispatch(actUpdateLoadingCreate(false));
  }
};

export const { actUpdateLoadingCreate } = topicSlice.actions;
export default topicSlice.reducer;
