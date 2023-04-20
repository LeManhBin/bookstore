import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { fetchChangeOrderStatus, fetchCreateOrder, fetchDetailOrder, fetchOrderByIdStore, fetchOrderUserByStatus } from "../../../apis/orderApi";


const initialState = {
    orderByStatus: [],
    orderByIdStore: [],
    order: {},
    isLoading: false,
    isLoadingCreate: false,
    errors: {},
}


export const actFetchOrderUserByStatus = createAsyncThunk('order/actFetchOrderUserByStatus', async (id) => {
    const data = await fetchOrderUserByStatus(id)
    return data || []
})

export const actFetchOrderByIdStore = createAsyncThunk('order/actFetchOrderByIdStore', async (id) => {
    const data = await fetchOrderByIdStore(id)
    return data || []
})

export const actFetchOrderDetail = createAsyncThunk('order/actFetchOrderDetail', async (id) => {
    const data = await fetchDetailOrder(id)
    return data || []
})

export const orderSlice = createSlice({
    name: 'order',
    initialState,
    reducers: {
        actUpdateLoadingCreate: (state, action) => {
            state.isLoadingCreate = action.payload;
        }
    },

    extraReducers: (builder) => {

        //actFetchOrderUserByStatus
        builder.addCase(actFetchOrderUserByStatus.pending, (state) => {
            state.isLoading = true;
        });

        builder.addCase(actFetchOrderUserByStatus.rejected, (state) => {
            state.errors = {
                errors: "Có lỗi xảy ra!"
            };
            state.isLoading = false
            toast.warning(state.errors);
        });

        builder.addCase(actFetchOrderUserByStatus.fulfilled, (state, action) => {
            state.isLoading = false;
            state.orderByStatus = action.payload.data || [];
        });

        //actFetchOrderByIdStore
        builder.addCase(actFetchOrderByIdStore.pending, (state) => {
            state.isLoading = true;
        });

        builder.addCase(actFetchOrderByIdStore.rejected, (state) => {
            state.errors = {
                errors: "Có lỗi xảy ra!"
            };
            state.isLoading = false
            toast.warning(state.errors);
        });

        builder.addCase(actFetchOrderByIdStore.fulfilled, (state, action) => {
            state.isLoading = false;
            state.orderByIdStore = action.payload.data || [];
        });

        //actFetchOrderDetail
        builder.addCase(actFetchOrderDetail.pending, (state) => {
            state.isLoading = true;
        });

        builder.addCase(actFetchOrderDetail.rejected, (state) => {
            state.errors = {
                errors: "Có lỗi xảy ra!"
            };
            state.isLoading = false
            toast.warning(state.errors);
        });

        builder.addCase(actFetchOrderDetail.fulfilled, (state, action) => {
            state.isLoading = false;
            state.order = action.payload.data || [];
        });
    }
})

export const actCreateOrder = (payload) => async (dispatch) => {
    try {
        dispatch(actUpdateLoadingCreate(true));
        await fetchCreateOrder(payload);
        toast.success('Thành công')
        
    } catch (error) {
        console.log(error);
    } finally {
        dispatch(actUpdateLoadingCreate(false));
    }
}

export const actChangeOrderStatus = (id, status, idStore) => async (dispatch) => {
    try {
        dispatch(actUpdateLoadingCreate(true));
        await fetchChangeOrderStatus(id, status);
        dispatch(actFetchOrderByIdStore(idStore))
        toast.success('Thành công')
    } catch (error) {
        console.log(error);
    } finally {
        dispatch(actUpdateLoadingCreate(false));
    }
}

export const actCancelOrder = (id, status, idUser) => async (dispatch) => {
    try {
        dispatch(actUpdateLoadingCreate(true));
        await fetchChangeOrderStatus(id, status);
        dispatch(actFetchOrderUserByStatus(idUser))
        toast.success('Thành công')
    } catch (error) {
        console.log(error);
    } finally {
        dispatch(actUpdateLoadingCreate(false));
    }
}
export const actReviewDoneChangeStatus = (id, status, idUser) => async (dispatch) => {
    try {
        dispatch(actUpdateLoadingCreate(true));
        await fetchChangeOrderStatus(id, status);
        dispatch(actFetchOrderUserByStatus(idUser))
        toast.success('Thành công')
    } catch (error) {
        console.log(error);
    } finally {
        dispatch(actUpdateLoadingCreate(false));
    }
}

export const {actUpdateLoadingCreate} = orderSlice.actions
export default orderSlice.reducer