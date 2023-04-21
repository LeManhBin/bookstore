import {
  createAsyncThunk,
  createSlice,
  getDefaultMiddleware,
} from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import {
  fetchAllDataBook,
  fetchBookBestSelling,
  fetchBookPromotionsByTime,
  fetchCreateBook,
  fetchCreatePromotion,
  fetchDataBookById,
  fetchDataBookByIdCategory,
  fetchDataBookByIdStore,
  fetchDeleteBook,
  fetchDeletePromotion,
  fetchDetailPromotion,
  fetchPromotionByIdPromotion,
  fetchPromotionByIdStore,
  fetchSearchBook,
  fetchUpdateBook,
  fetchUpdatePromotion,
} from "../../../apis/bookApi";

const initialState = {
  allBook: [],
  bookBestSelling: [],
  book: {},
  promotion: [],
  promotionByPromotion: {},
  bookByCategory: [],
  bookByPromotion: [],
  bookByStore: [],
  bookSearch: [],
  bookPromotionByTime: [],
  bookPromotionByIdStore: [],
  isLoading: false,
  isLoadingCreate: false,
  errors: {},
};

export const actFetchAllBook = createAsyncThunk(
  "book/actFetchAllBook",
  async () => {
    const data = await fetchAllDataBook();
    return data || [];
  }
);

export const actFetchBookBestSelling = createAsyncThunk(
  "book/actFetchBookBestSelling",
  async () => {
    const data = await fetchBookBestSelling();
    return data | [];
  }
);

export const actFetchBookById = createAsyncThunk(
  "book/actFetchBookById",
  async (id) => {
    const data = await fetchDataBookById(id);
    return data || {};
  }
);

export const actFetchBookByIdCategory = createAsyncThunk(
  "book/actFetchBookByIdCategory",
  async (id) => {
    const data = await fetchDataBookByIdCategory(id);
    return data || [];
  }
);

export const actFetchBookByIdStore = createAsyncThunk(
  "book/actFetchBookByIdStore",
  async (id) => {
    const data = await fetchDataBookByIdStore(id);
    return data || [];
  }
);

export const actFetchSearchBook = createAsyncThunk(
  "book/actFetchSearchBook",
  async (search) => {
    const data = await fetchSearchBook(search);
    return data || [];
  }
);

export const actFetchBookPromotionsByTime = createAsyncThunk(
  "book/actFetchBookPromotionsByTime",
  async ({ idStore, start, end }) => {
    const data = await fetchBookPromotionsByTime(idStore, start, end);
    return data || [];
  }
);

export const actFetchPromotionByStoreId = createAsyncThunk(
  "book/actFetchPromotionByStoreId",
  async (idStore) => {
    const data = await fetchPromotionByIdStore(idStore);
    return data || [];
  }
);

export const actFetchDetailPromotion = createAsyncThunk(
  "book/actFetchDetailPromotion",
  async ({ idStore, idPromotion }) => {
    const data = await fetchDetailPromotion(idStore, idPromotion);
    return data || [];
  }
);
export const actFetchPromotionByIdPromotion = createAsyncThunk(
  "book/actFetchPromotionByIdPromotion",
  async (id) => {
    const data = await fetchPromotionByIdPromotion(id);
    return data || {};
  }
);
export const bookSlice = createSlice({
  name: "book",
  initialState,
  reducers: {
    actUpdateLoadingCreate: (state, action) => {
      state.isLoadingCreate = action.payload;
    },
  },

  extraReducers: (builder) => {
    //allbook
    builder.addCase(actFetchAllBook.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(actFetchAllBook.rejected, (state) => {
      state.errors = {
        errors: "Có lỗi xảy ra!",
      };
      state.isLoading = false;
      toast.warning(state.errors);
    });

    builder.addCase(actFetchAllBook.fulfilled, (state, action) => {
      state.isLoading = false;
      state.allBook = action.payload.data || [];
    });

    //best selling

    builder.addCase(actFetchBookBestSelling.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(actFetchBookBestSelling.rejected, (state) => {
      state.errors = {
        errors: "Có lỗi xảy ra!",
      };
      state.isLoading = false;
      toast.warning(state.errors);
    });

    builder.addCase(actFetchBookBestSelling.fulfilled, (state, action) => {
      state.isLoading = false;
      state.bookBestSelling = action.payload.data || [];
    });

    //bookby id
    builder.addCase(actFetchBookById.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(actFetchBookById.rejected, (state) => {
      state.errors = {
        errors: "Có lỗi xảy ra!",
      };
      state.isLoading = false;
      toast.warning(state.errors);
    });

    builder.addCase(actFetchBookById.fulfilled, (state, action) => {
      state.isLoading = false;
      state.book = action.payload.data.data || {};
    });

    //bookby id category
    builder.addCase(actFetchBookByIdCategory.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(actFetchBookByIdCategory.rejected, (state) => {
      state.errors = {
        errors: "Có lỗi xảy ra!",
      };
      state.isLoading = false;
      toast.warning(state.errors);
    });
    builder.addCase(actFetchBookByIdCategory.fulfilled, (state, action) => {
      state.isLoading = false;
      state.bookByCategory = action.payload.data.data || [];
    });

    //BOOKBY ID STORE
    builder.addCase(actFetchBookByIdStore.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(actFetchBookByIdStore.rejected, (state) => {
      state.errors = {
        errors: "Có lỗi xảy ra!",
      };
      state.isLoading = false;
      toast.warning(state.errors);
    });
    builder.addCase(actFetchBookByIdStore.fulfilled, (state, action) => {
      state.isLoading = false;
      state.bookByStore = action.payload.data.data || [];
    });

    //search Book
    builder.addCase(actFetchSearchBook.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(actFetchSearchBook.rejected, (state) => {
      state.errors = {
        errors: "Có lỗi xảy ra!",
      };
      state.isLoading = false;
      toast.warning(state.errors);
    });
    builder.addCase(actFetchSearchBook.fulfilled, (state, action) => {
      state.isLoading = false;
      console.log(action.payload, "search");
      state.bookSearch = action.payload || [];
    });

    //fetchBookPromotionsByTime
    builder.addCase(actFetchBookPromotionsByTime.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(actFetchBookPromotionsByTime.rejected, (state) => {
      state.errors = {
        errors: "Có lỗi xảy ra!",
      };
      state.isLoading = false;
      toast.warning(state.errors);
    });
    builder.addCase(actFetchBookPromotionsByTime.fulfilled, (state, action) => {
      state.isLoading = false;
      state.bookPromotionByTime = action.payload.data.data || [];
    });

    //fetchBookPromotionsByIdStore
    builder.addCase(actFetchPromotionByStoreId.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(actFetchPromotionByStoreId.rejected, (state) => {
      state.errors = {
        errors: "Có lỗi xảy ra!",
      };
      state.isLoading = false;
      toast.warning(state.errors);
    });
    builder.addCase(actFetchPromotionByStoreId.fulfilled, (state, action) => {
      state.isLoading = false;
      state.bookPromotionByIdStore = action.payload.data.data || [];
    });

    //fetchDetailPromotion
    builder.addCase(actFetchDetailPromotion.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(actFetchDetailPromotion.rejected, (state) => {
      state.errors = {
        errors: "Có lỗi xảy ra!",
      };
      state.isLoading = false;
      toast.warning(state.errors);
    });
    builder.addCase(actFetchDetailPromotion.fulfilled, (state, action) => {
      state.isLoading = false;
      state.promotion = action.payload.data.data || [];
    });
    //fetchPromotionByIdPromotion
    builder.addCase(actFetchPromotionByIdPromotion.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(actFetchPromotionByIdPromotion.rejected, (state) => {
      state.errors = {
        errors: "Có lỗi xảy ra!",
      };
      state.isLoading = false;
      toast.warning(state.errors);
    });
    builder.addCase(
      actFetchPromotionByIdPromotion.fulfilled,
      (state, action) => {
        state.isLoading = false;
        state.promotionByPromotion = action.payload.data.data || {};
      }
    );
  },
});

export const actCreateBook = (book) => async (dispatch) => {
  try {
    dispatch(actUpdateLoadingCreate(true));
    await fetchCreateBook(book);
    dispatch(actFetchAllBook());
    toast.success("Thêm mới thành công");
  } catch (error) {
    console.log(error);
  } finally {
    dispatch(actUpdateLoadingCreate(false));
  }
};

export const actDeleteBook = (id) => async (dispatch) => {
  try {
    await fetchDeleteBook(id);
    dispatch(actFetchAllBook());
    toast.success("Xoá thành công");
  } catch (error) {
    console.log(error);
  } finally {
    dispatch(actUpdateLoadingCreate(false));
  }
};

export const actUpdateBook = (id, payload) => async (dispatch) => {
  try {
    await fetchUpdateBook(id, payload);
    await dispatch(actFetchAllBook());
    dispatch(actUpdateLoadingCreate(true));
    toast.success("Cập nhật thành công");
  } catch (error) {
    console.log(error);
  } finally {
    dispatch(actUpdateLoadingCreate(false));
  }
};

export const actCreatePromotion = (payload) => async (dispatch) => {
  try {
    await fetchCreatePromotion(payload);
    await dispatch(actFetchPromotionByStoreId(payload.storeId));
    dispatch(actUpdateLoadingCreate(true));
    toast.success("Thêm thành công");
  } catch (error) {
    console.log(error);
  } finally {
    dispatch(actUpdateLoadingCreate(false));
  }
};

export const actDeletePromotion = (id, storeId) => async (dispatch) => {
  try {
    await fetchDeletePromotion(id);
    await dispatch(actFetchPromotionByStoreId(storeId));
    dispatch(actUpdateLoadingCreate(true));
    toast.success("Thành công");
  } catch (error) {
    console.log(error);
  } finally {
    dispatch(actUpdateLoadingCreate(false));
  }
};

export const actUpdatePromotion = (id, payload) => async (dispatch) => {
  try {
    await fetchUpdatePromotion(id, payload);
    dispatch(actUpdateLoadingCreate(true));
    toast.success("Thành công");
  } catch (error) {
    console.log(error);
  } finally {
    dispatch(actUpdateLoadingCreate(false));
  }
};
export const { actUpdateLoadingCreate } = bookSlice.actions;
export default bookSlice.reducer;
