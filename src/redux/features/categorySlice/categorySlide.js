import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { fetchAllDataCategory, fetchCreateCategory, fetchDataCategoryById, fetchDeleteCategory, fetchUpdateCategory } from "../../../apis/categoryApi";


const initialState = {
    allCategory: [],
    category: {},
    isLoading: false,
    isLoadingCreate: false,
    errors: {},
}

export const actFetchAllCategory = createAsyncThunk('category/actFetchAllCategory', async () => {
    const data = await fetchAllDataCategory()
    return data || []
})

export const actFetchCategoryById = createAsyncThunk('category/actFetchCategoryById', async (id) => {
    const data = await fetchDataCategoryById(id)
    return data || {}
})

export const categorySlice = createSlice({
    name:"category",
    initialState,
    reducers: {
        actUpdateLoadingCreate: (state, action) => {
            state.isLoadingCreate = action.payload;
        }
    },

    extraReducers: (builder) => {
        builder.addCase(actFetchAllCategory.pending, (state) => {
            state.isLoading = true;
        });

        builder.addCase(actFetchAllCategory.rejected, (state) => {
            state.errors = {
                errors: "Có lỗi xảy ra!"
            };
            state.isLoading = false
            toast.warning(state.errors);
        });

        builder.addCase(actFetchAllCategory.fulfilled, (state, action) => {
            state.isLoading = false;
            state.allCategory = action.payload || [];
        })

        builder.addCase(actFetchCategoryById.fulfilled,  (state, action) => {
            state.isLoading = false;
            state.category = action.payload || {}
        })
    }
});

export const actCreateCategory = (category) => async (dispatch) => {
    try {
        dispatch(actUpdateLoadingCreate(true));
        await fetchCreateCategory(category);
        dispatch(actFetchAllCategory())
        toast.success('Thêm mới danh mục thành công')
        
    } catch (error) {
        console.log(error);
    } finally {
        dispatch(actUpdateLoadingCreate(false));
    }
}

export const actDeleteCategory = (id) => async (dispatch) => {
    try {
        await fetchDeleteCategory(id)
        dispatch(actFetchAllCategory())
        toast.success('Xoá danh mục thành công')
    } catch (error) {
        console.log(error);
    } finally {
        dispatch(actUpdateLoadingCreate(false))
    }
}

export const actUpdateCategory = (id, payload) => async (dispatch) => {
    try {
        await fetchUpdateCategory(id, payload);
        await dispatch(actFetchAllCategory());
        dispatch(actUpdateLoadingCreate(true));
        toast.success('Update Success')
    } catch (error) {
        console.log(error);
    } finally {
        dispatch(actUpdateLoadingCreate(false))
    }
} 

export const {actUpdateLoadingCreate} = categorySlice.actions
export default categorySlice.reducer