import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { fetchAllDataContact, fetchCreateContact, fetchDataContactById, fetchDeleteContact, fetchReplyContact, fetchUpdateContact } from "../../../apis/contactApi";


const initialState = {
    allContact: [],
    contact: {},
    isLoading: false,
    isLoadingCreate: false,
    errors: {},
}

export const actFetchAllContact = createAsyncThunk('contact/actFetchAllContact', async () => {
    const data = await fetchAllDataContact()
    return data || []
})

export const actFetchContactById = createAsyncThunk('contact/actFetchContactById', async (id) => {
    const data = await fetchDataContactById(id)
    return data || {}
})

export const contactSlice = createSlice({
    name:"contact",
    initialState,
    reducers: {
        actUpdateLoadingCreate: (state, action) => {
            state.isLoadingCreate = action.payload;
        }
    },

    extraReducers: (builder) => {
        builder.addCase(actFetchAllContact.pending, (state) => {
            state.isLoading = true;
        });

        builder.addCase(actFetchAllContact.rejected, (state) => {
            state.errors = {
                errors: "Có lỗi xảy ra!"
            };
            state.isLoading = false
            toast.warning(state.errors);
        });

        builder.addCase(actFetchAllContact.fulfilled, (state, action) => {
            state.isLoading = false;
            state.allContact = action.payload.data || [];
        })

        builder.addCase(actFetchContactById.fulfilled,  (state, action) => {
            state.isLoading = false;
            state.contact = action.payload.data || {}
        })
    }
});

export const actCreateContact = (contact) => async (dispatch) => {
    try {
        dispatch(actUpdateLoadingCreate(true));
        await fetchCreateContact(contact);
        toast.success('Gửi liên hệ thành công')
    } catch (error) {
        console.log(error);
    } finally {
        dispatch(actUpdateLoadingCreate(false));
    }
}

export const actReplyContact = (contact) => async (dispatch) => {
    try {
        dispatch(actUpdateLoadingCreate(true));
        await fetchReplyContact(contact);
        dispatch(actFetchAllContact())
        toast.success('Gửi liên hệ thành công')
        
    } catch (error) {
        console.log(error);
    } finally {
        dispatch(actUpdateLoadingCreate(false));
    }
}

export const actDeleteContact = (id) => async (dispatch) => {
    try {
        await fetchDeleteContact(id)
        dispatch(actFetchAllContact())
        toast.success('Xoá thành công')
    } catch (error) {
        console.log(error);
    } finally {
        dispatch(actUpdateLoadingCreate(false))
    }
}

export const actUpdateContact = (id, payload) => async (dispatch) => {
    try {
        await fetchUpdateContact(id, payload);
        await dispatch(actFetchAllContact());
        dispatch(actUpdateLoadingCreate(true));
        toast.success('Update Success')
    } catch (error) {
        console.log(error);
    } finally {
        dispatch(actUpdateLoadingCreate(false))
    }
} 

export const {actUpdateLoadingCreate} = contactSlice.actions
export default contactSlice.reducer