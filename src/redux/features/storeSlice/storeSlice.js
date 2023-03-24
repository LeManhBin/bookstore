import { createAsyncThunk, createSlice, getDefaultMiddleware  } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { fetchAllDataStore, fetchDataStoreById, fetchDeleteStore } from "../../../apis/storeApi";

const initialState = {
    allStore: [],
    store: {},
    isLoading: false,
    isLoadingCreate: false,
    errors: {},
}
const customizedMiddleware = getDefaultMiddleware({
    serializableCheck: false
})
export const actFetchAllStore = createAsyncThunk('store/actFetchAllStore', async () => {
    const data = await fetchAllDataStore()
    return data || []
})

export const actFetchStoreById = createAsyncThunk('store/actFetchStoreById', async (id) => {
    const data = await fetchDataStoreById(id)
    return data || {}
})

export const storeSlice = createSlice({
    name: 'store',
    initialState,
    reducers: {
        actUpdateLoadingCreate: (state, action) => {
            state.isLoadingCreate = action.payload;
        }
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
    
    extraReducers: (builder) => {
        builder.addCase(actFetchAllStore.pending, (state) => {
            state.isLoading = true;
        });

        builder.addCase(actFetchAllStore.rejected, (state) => {
            state.errors = {
                errors: "Có lỗi xảy ra!"
            };
            state.isLoading = false
            toast.warning(state.errors);
        });

        builder.addCase(actFetchAllStore.fulfilled, (state, action) => {
            state.isLoading = false;
            state.allStore = action.payload.data || []
        })

        builder.addCase(actFetchStoreById.pending, (state) => {
            state.isLoading = true;
        });

        builder.addCase(actFetchStoreById.rejected, (state) => {
            state.errors = {
                errors: "Có lỗi xảy ra!"
            };
            state.isLoading = false
            toast.warning(state.errors);
        })

        builder.addCase(actFetchStoreById.fulfilled,  (state, action) => {
            state.isLoading = false;
            state.store = action.payload.data
        })
    }
})




export const actDeleteStore = (id) => async (dispatch) => {
    try {
        await fetchDeleteStore(id)
        dispatch(actFetchAllStore())
        toast.success('Xoá thành công')
    } catch (error) {
        console.log(error);
    } finally {
        dispatch(actUpdateLoadingCreate(false))
    }
}


export const {actUpdateLoadingCreate} = storeSlice.actions
export default storeSlice.reducer
