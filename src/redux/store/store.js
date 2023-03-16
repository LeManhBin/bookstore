import { configureStore } from "@reduxjs/toolkit";
import categoryReducer from '../features/categorySlice/categorySlide'
import topicReducer from '../features/topicSlide/topicSlide'
import userReducer from '../features/userSlice/userSlice'
export const  store = configureStore({
    reducer: {
        category: categoryReducer,
        topic: topicReducer,
        user: userReducer,
    },
});

export default store