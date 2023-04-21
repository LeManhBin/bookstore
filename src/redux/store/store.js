import { configureStore } from "@reduxjs/toolkit";
import categoryReducer from "../features/categorySlice/categorySlide";
import topicReducer from "../features/topicSlide/topicSlide";
import userReducer from "../features/userSlice/userSlice";
import serviceReducer from "../features/serviceSlice/serviceSlide";
import storeReducer from "../features/storeSlice/storeSlice";
import contactReducer from "../features/contactSlice/contactSlice";
import bookReducer from "../features/bookSlice/bookSlice";
import cartReducer from "../features/cartSlice/cartSlice";
import paymentReducer from "../features/paymentSlice/paymentSlice";
import orderReducer from "../features/orderSlice/orderSlice";
import evaluateReducer from "../features/evaluateSlice/evaluateSlice";
export const store = configureStore({
  reducer: {
    category: categoryReducer,
    topic: topicReducer,
    user: userReducer,
    service: serviceReducer,
    store: storeReducer,
    contact: contactReducer,
    book: bookReducer,
    cart: cartReducer,
    payment: paymentReducer,
    order: orderReducer,
    evaluate: evaluateReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

export default store;
