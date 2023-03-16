import { configureStore } from "@reduxjs/toolkit";
import categoryReducer from '../features/categorySlice/categorySlide'

export const  store = configureStore({
    reducer: {
        category: categoryReducer,
    },
});

export default store