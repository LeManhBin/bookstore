import { configureStore } from "@reduxjs/toolkit";
import categoryReducer from '../features/categorySlice/categorySlide'
import topicReducer from '../features/topicSlide/topicSlide'
import userReducer from '../features/userSlice/userSlice'
import serviceReducer from '../features/serviceSlice/serviceSlide'
import storeReducer from '../features/storeSlice/storeSlice'
import contactReducer from '../features/contactSlice/contactSlice'
export const  store = configureStore({
    reducer: {
        category: categoryReducer,
        topic: topicReducer,
        user: userReducer,
        service: serviceReducer,
        store: storeReducer,
        contact:  contactReducer,
    },
});

export default store