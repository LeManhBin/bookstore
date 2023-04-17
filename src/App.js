import { BrowserRouter, Route, Routes } from "react-router-dom";
import AdminLayout from "./layouts/AdminLayout/AdminLayout";
import HomeLayout from "./layouts/HomeLayout/HomeLayout";
import BlogPage from "./pages/BlogPage/BlogPage";
import ContactPage from "./pages/ContactPage/ContactPage";
import HomePage from "./pages/HomePage/HomePage";
import ProductDetailPage from "./pages/ProductDetailPage/ProductDetailPage";
import ProductPage from "./pages/ProductPage/ProductPage";
import VendorPage from "./pages/VendorPage/VendorPage";
import AccountManagerPage from "./pagesAdmin/AccountManagerPage/AccountManagerPage";
import CategoryManagerPage from "./pagesAdmin/CategoryManagerPage/CategoryManagerPage";
import DashboardPage from "./pagesAdmin/DashboardPage/DashboardPage";
import ServiceManagerPage from "./pagesAdmin/ServiceManagerPage/ServiceManagerPage";
import StoreListPage from "./pagesAdmin/StoreListPage/StoreListPage";
import TopicPage from "./pagesAdmin/TopicPage/TopicPage";
import 'bootstrap/dist/css/bootstrap.min.css';
import LoginLayout from "./layouts/LoginLayout/LoginLayout";
import LoginPage from "./pages/LoginPage/LoginPage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import AddNewAccount from "./pagesAdmin/AccountManagerPage/AddNewAccount";
import ContactManagerPage from "./pagesAdmin/ContactManagerPage/ContactManagerPage";
import UnWatchedContactPage from "./pagesAdmin/ContactManagerPage/UnWatchedContactPage";
import AccountPage from "./pages/AccountPage/AccountPage";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import UpdateAccount from "./pagesAdmin/AccountManagerPage/UpdateAccount";
import AddNewService from "./pagesAdmin/ServiceManagerPage/AddNewService";
import VendorDetail from "./pages/VendorDetail/VendorDetail";
import WishListPage from "./pages/WishListPage/WishListPage";
import CartPage from "./pages/CartPage/CartPage";
import UpdateService from "./pagesAdmin/ServiceManagerPage/UpdateService";
import AddNewStore from "./pagesAdmin/StoreListPage/AddNewStore";
// import UpdateStore from "./pagesAdmin/StoreListPage/UpdateStore";
import ViewStore from "./pagesAdmin/StoreListPage/ViewStore";
import ChangeEmailPage from "./pages/ChangeEmailPage/ChangeEmailPage";
import ChangePhoneNumberPage from "./pages/ChangePhoneNumberPage/ChangePhoneNumberPage";
import ChangePasswordPage from "./pages/ChangePasswordPage/ChangePasswordPage";
import SaleRegisterPage from "./pages/SaleRegisterPage/SaleRegisterPage";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { actReLogin } from "./redux/features/userSlice/userSlice";
import { KEY_ACCESS_TOKEN } from "./constants/config";
import StoreLayout from "./layouts/StoreLayout/StoreLayout";
import RevenueStorePage from "./pageStore/RevenueStorePage/RevenueStorePage";
import OrderStorePage from "./pageStore/OrderStorePage/OrderStorePage";
import StoreAddProductPage from "./pageStore/StoreAddProductPage/StoreAddProductPage";
import AllProductPage from "./pageStore/AllProductPage/AllProductPage";
import AddPromotionPage from "./pageStore/AddPromotionPage/AddPromotionPage";
import ListPromotionPage from "./pageStore/ListPromotionPage/ListPromotionPage";
import SearchBookByCategoryPage from "./pages/SearchBookByCategoryPage/SearchBookByCategoryPage";
import DetailProductStorePage from "./pageStore/DetailProductStorePage/DetaiProductStorePage";
import ListServicePage from "./pageStore/ListServicePage/ListServicePage";
import SearchResultPage from "./pages/SearchResultPage/SearchResultPage";
import PaymentPage from "./pages/PaymentPage/PaymentPage";
import ProfileStore from "./pageStore/ProfileStore/ProfileStore";
import ForgotPassword from "./pages/ForgotPassword/ForgotPassword";
import ResetPassword from "./pages/ResetPassword/ResetPassword";
import RegisterServicePage from "./pages/RegisterServicePage/RegisterServicePage";
import ROR404 from "./components/ROR404/ROR404"
import PaymentSuccess from "./components/PaymentSuccess/PaymentSuccess";



function App() {

  const dispatch = useDispatch()
  const accessToken = localStorage.getItem(KEY_ACCESS_TOKEN) || null
  useEffect(() => {
    if(accessToken) {
      dispatch(actReLogin(accessToken))
  }
  },[])

  const userCurrent = localStorage.getItem("user")

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomeLayout/>}>
              <Route index element={<HomePage/>}/>
              <Route path="product" element={<ProductPage/>}/>
              <Route path="product/:idProduct" element={<ProductDetailPage/>}/>
              <Route path="books/:idCategoryBook" element={<SearchBookByCategoryPage/>}/>
              <Route path="vendor" element={<VendorPage/>}/>
              <Route path="vendor/:idVendor" element={<VendorDetail/>}/>
              <Route path="blog" element={<BlogPage/>}/>
              <Route path="contact" element={<ContactPage/>}/>
              <Route path="account" element={<AccountPage/>}/>
              <Route path="account/profile" element={<ProfilePage/>}/>
              <Route path="account/profile/email" element={<ChangeEmailPage/>}/>
              <Route path="account/profile/phone" element={<ChangePhoneNumberPage/>}/>
              <Route path="account/profile/password" element={<ChangePasswordPage/>}/>
              <Route path="wish-list" element={<WishListPage/>}/>
              <Route path="cart" element={<CartPage/>}/>
              <Route path="product/search/"  element={<SearchResultPage/>}/>
              <Route path="payment"  element={<PaymentPage/>}/>
          </Route>
          <Route path="sale-register" element={<SaleRegisterPage/>}/>
          <Route path="register-service" element={<RegisterServicePage/>}/>
          <Route path="payment-success" element={<PaymentSuccess/>}/>
          <Route path="/admin" element={(userCurrent.role === 0 ? <ROR404/> : <AdminLayout/>)}>
              <Route index element={<DashboardPage/>}/>
              <Route path="store-list" element={<StoreListPage/>}/>
              <Route path="add-new-store" element={<AddNewStore/>}/>
              <Route path="store-list/:idStore" element={<ViewStore/>}/>
              <Route path="category" element={<CategoryManagerPage/>}/>
              <Route path="topic" element={<TopicPage/>}/>
              <Route path="account-manager" element={<AccountManagerPage/>}/>
              <Route path="add-new-account" element={<AddNewAccount/>}/>
              <Route path="account-manager/:idAccount" element={<UpdateAccount/>}/>
              <Route path="service" element={<ServiceManagerPage/>}/>
              <Route path="add-new-service" element={<AddNewService/>}/>
              <Route path="service/:idService" element={<UpdateService/>}/>
              <Route path="contact" element={<ContactManagerPage/>}/>
              <Route path="contact-unread" element={<UnWatchedContactPage/>}/>
          </Route>

          <Route path="/store" element={(userCurrent.storeId === 0 ? <ROR404/> : <StoreLayout/>)}>
              <Route index element={<RevenueStorePage/>}/>
              <Route path="order-store" element={<OrderStorePage/>}/>
              <Route path="add-product" element={<StoreAddProductPage/>}/>
              <Route path="detail-product/:idBook" element={<DetailProductStorePage/>}/>
              <Route path="all-product" element={<AllProductPage/>}/>
              <Route path="add-promotion" element={<AddPromotionPage/>}/>
              <Route path="list-promotion" element={<ListPromotionPage/>}/>
              <Route path="list-service" element={<ListServicePage/>}/>
              <Route path="profile-store" element={<ProfileStore/>}/>
          </Route>

          <Route path="/login-layout" element={<LoginLayout/>}>
              <Route index element={<LoginPage/>}/>
              <Route path="register" element={<RegisterPage/>}/>
              <Route path="forgot-password" element={<ForgotPassword/>}/>
              <Route path="reset-password" element={<ResetPassword/>}/>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
