import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { fetchAllDataUser, fetchCreateImg, fetchCreateUser, fetchDataUserById, fetchDeleteUser, fetchUpdateUser } from "../../../apis/userApi";

const initialState = {
    allUser: [],
    user: {},
    isLoading: false,
    isLoadingCreate: false,
    errors: {},
}

export const actFetchAllUser = createAsyncThunk('user/actFetchAllUser', async () => {
    const data = await fetchAllDataUser()
    return data || []
})

export const actFetchUserById = createAsyncThunk('user/actFetchUserById', async (id) => {
    const data = await fetchDataUserById(id)
    return data || {}
})

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        actUpdateLoadingCreate: (state, action) => {
            state.isLoadingCreate = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(actFetchAllUser.pending, (state) => {
            state.isLoading = true;
        });

        builder.addCase(actFetchAllUser.rejected, (state) => {
            state.errors = {
                errors: "Có lỗi xảy ra!"
            };
            state.isLoading = false
            toast.warning(state.errors);
        });

        builder.addCase(actFetchAllUser.fulfilled, (state, action) => {
            state.isLoading = false;
            state.allUser = action.payload || [];
        })

        builder.addCase(actFetchUserById.fulfilled,  (state, action) => {
            state.isLoading = false;
            state.user = action.payload || {}
        })
    }
})

export const actCreateUser = (user) => async (dispatch) => {
    try {
        dispatch(actUpdateLoadingCreate(true));
        await fetchCreateUser(user);
        dispatch(actFetchAllUser())
        toast.success('Thêm mới thành công')
        
    } catch (error) {
        console.log(error);
    } finally {
        dispatch(actUpdateLoadingCreate(false));
    }
}

export const actCreateImg = (file) => async (dispatch) => {
    try {
        dispatch(actUpdateLoadingCreate(true));
        await fetchCreateImg(file);
        // dispatch(actFetchAllUser())
        toast.success('Thêm mới thành công')
        
    } catch (error) {
        console.log(error);
    } finally {
        dispatch(actUpdateLoadingCreate(false));
    }
}

export const actDeleteUser = (id) => async (dispatch) => {
    try {
        await fetchDeleteUser(id)
        dispatch(actFetchAllUser())
        toast.success('Xoá thành công')
    } catch (error) {
        console.log(error);
    } finally {
        dispatch(actUpdateLoadingCreate(false))
    }
}

export const actUpdateUser = (id, payload) => async (dispatch) => {
    try {
        await fetchUpdateUser(id, payload);
        await dispatch(actFetchAllUser());
        dispatch(actUpdateLoadingCreate(true));
        toast.success('Cập nhật thành công')
    } catch (error) {
        console.log(error);
    } finally {
        dispatch(actUpdateLoadingCreate(false))
    }
} 

export const {actUpdateLoadingCreate} = userSlice.actions
export default userSlice.reducer
