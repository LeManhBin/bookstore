import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { fetchAllDataCartByIdUser, fetchCreateCart, fetchDeleteCart, fetchUpdateQuantityCart } from "../../../apis/cartApi";

const initialState = {
    // cartItems: localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : [],
    cartItems: [],
    totalQuantity:0,
    totalAmount:0,
    isLoading: false,
    isLoadingCreate: false,
    errors: {},
}

export const actFetchAllDataCartByIdUser = createAsyncThunk('user/actFetchAllDataCartByIdUser', async (id) => {
    const data = await fetchAllDataCartByIdUser(id)
    return data || []
})
export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        actUpdateLoadingCreate: (state, action) => {
            state.isLoadingCreate = action.payload;
        },
        actAddToCart: (state, action) => {
            const itemIndex = state.cartItems.findIndex(
                item => item.object.id === action.payload.object.id
            );
            if(itemIndex >= 0) {
                state.cartItems[itemIndex].cartQuantity += 1;
                toast.info("Tăng số lượng bên giỏ hàng")
            }else {
                const tempProduct = {...action.payload, cartQuantity: 1};
                state.cartItems.push(tempProduct);
                toast.success("Thêm sản phẩm vào giỏ hàng thành công")
            }
            localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
        },
        actRemoveCart: (state, action) => {
            
            const nextCartItems = state.cartItems.filter(
                item => item?.object?.id !== action?.payload?.object?.id
            )
            state.cartItems = nextCartItems;
            localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
            toast.success('Gỡ sản phẩm thành công')
        },

        actDecreaseCart: (state, action) => {
            const itemIndex = state.cartItems.findIndex(
                item => item?.object?.id === action.payload.object.id
            )
            if(state.cartItems[itemIndex].cartQuantity > 1) {
                state.cartItems[itemIndex].cartQuantity -=1
            }else if(state.cartItems[itemIndex].cartQuantity === 1){
                const nextCartItems = state.cartItems.filter(
                    item => item?.object?.id !== action?.payload?.object?.id
                )
                state.cartItems = nextCartItems;
            }
            localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
        }, 

        // actGetTotal: (state, action) => {
        //    let {total, quantity} = state.cartItems.reduce((cartTotal, item) => {
        //         const { price} = item.object;
        //         const { cartQuantity} = item;
        //         const itemTotal = price * cartQuantity
                
        //         cartTotal.total += itemTotal
        //         cartTotal.quantity += cartQuantity

        //         return cartTotal
        //     }, {
        //         total: 0,
        //         quantity: 0,
        //     });

        //     state.cartQuantity = quantity;
        //     state.totalAmount = total;

        // }
    },
    extraReducers: (builder) => {
        
        builder.addCase(actFetchAllDataCartByIdUser.fulfilled, (state, action) => {
            state.isLoading = false;
            state.cartItems = action.payload.data.data || []
        })
    }
})

export const actCreateCart = (cart) => async (dispatch) => {
    try {
        dispatch(actUpdateLoadingCreate(true));
        await fetchCreateCart(cart);
        dispatch(actFetchAllDataCartByIdUser(cart.userid))
        toast.success('Thêm mới thành công')
        
    } catch (error) {
        console.log(error);
    } finally {
        dispatch(actUpdateLoadingCreate(false));
    }
}
export const actDeleteCart = (cart, idUser) => async (dispatch) => {
    try {
        dispatch(actUpdateLoadingCreate(true));
        await fetchDeleteCart(cart.id);
        dispatch(actFetchAllDataCartByIdUser(idUser))
        toast.success('Gỡ thành công')
    } catch (error) {
        console.log(error);
    } finally {
        dispatch(actUpdateLoadingCreate(false));
    }
}

export const actChangeQuantity = (item, quantity, idUser) => async (dispatch) => {
    try {
        dispatch(actUpdateLoadingCreate(true));
        await fetchUpdateQuantityCart(item.id,quantity);
        dispatch(actFetchAllDataCartByIdUser(idUser))
    } catch (error) {
        console.log(error);
    } finally {
        dispatch(actUpdateLoadingCreate(false));
    }
}


// export const { actUpdateLoadingCreate,actAddToCart, actRemoveCart, actDecreaseCart, actGetTotal } = cartSlice.actions
export const { actUpdateLoadingCreate } = cartSlice.actions
export default cartSlice.reducer