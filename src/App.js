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
import UpdateStore from "./pagesAdmin/StoreListPage/UpdateStore";
import ViewStore from "./pagesAdmin/StoreListPage/ViewStore";
import ChangeEmailPage from "./pages/ChangeEmailPage/ChangeEmailPage";
import ChangePhoneNumberPage from "./pages/ChangePhoneNumberPage/ChangePhoneNumberPage";
import ChangePasswordPage from "./pages/ChangePasswordPage/ChangePasswordPage";
import SaleRegisterPage from "./pages/SaleRegisterPage/SaleRegisterPage";


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomeLayout/>}>
              <Route index element={<HomePage/>}/>
              <Route path="product" element={<ProductPage/>}/>
              <Route path="product/:idProduct" element={<ProductDetailPage/>}/>
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
          </Route>
          <Route path="sale-register" element={<SaleRegisterPage/>}/>
          <Route path="/admin" element={<AdminLayout/>}>
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

          <Route path="/login-layout" element={<LoginLayout/>}>
              <Route index element={<LoginPage/>}/>
              <Route path="register" element={<RegisterPage/>}/>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
