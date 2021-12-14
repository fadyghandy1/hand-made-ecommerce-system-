import { Route } from "react-router-dom";
import productDetail from "../pages/productDetail/productDetail";
import Cart from "../pages/cart/cart";
import Login from "../pages/login/login";
import Register from "../pages/register/register";
import { Home } from "../pages/home/home";
import  {ProductSearch}  from "../pages/productSearch/productSearch";
import ListProducts from "../components/listProducts/listProducts";
import Profile from "../pages/profile/profile";
import UpdatePassword from "../pages/updatePassword/updatePassword";
import Shipping from "../pages/shipping/shipping";
import Payment from "../pages/payment/payment";
import PlaceOrder from "../pages/placeOrder/placeOrder";
import DisplayOrder from "../pages/displayOrder/displayOrder";
import { GetAllUsersPage } from "../pages/usersdashboard/getAllUsers/getAllUsers";
import { UpdateUser } from "../pages/usersdashboard/updateUser/updateUser";
import AdminListProducts from "../components/adminListProducts/adminListProducts";
import listOrders from "../components/order/listOrders";
import singleOrder from "../components/order/singleOrder";
import Mainbody from '../adminComponents/Mainbody/Mainbody';
import CategoryAdmin from '../adminComponents/categroryAdmin/categoryAdmin'
import CategoryUpdate from '../adminComponents/categroryAdmin/categoryUpdate'
import {Footer} from '../components/footer/footer'
import AboutUs from "../components/aboutUs/AboutUs";



export function Routes() {
    return (
        <div>
            <Route path="/products/:id" exact component={ListProducts} />
            <Route path="/product/:id" exact component={productDetail} />
            <Route path="/productSearch/:name" exact component={ProductSearch}/>
            <Route path="/cart/:id?" exact component={Cart} />
            <Route path="/login" exact component={Login} />
            <Route path="/register" exact component={Register} />
            <Route path="/profile" exact component={Profile} />
            <Route path="/changePassword" exact component={UpdatePassword} />
            <Route path="/shipping" exact component={Shipping} />
            <Route path="/payment" exact component={Payment} />
            <Route path="/placeorder" exact component={PlaceOrder} />
            <Route path="/order/:id" exact component={DisplayOrder} />
            <Route path="/" exact component={Home} />
            <Route path = "/getusers" exact component={GetAllUsersPage}/> 
            <Route path = "/edituser/:id" exact component = {UpdateUser} />
            <Route path="/productSearch" exact component={ProductSearch} />
            <Route path="/getproducts" exact component={AdminListProducts} />
            <Route path="/list" exact component={listOrders} />
            <Route path="/single/:id" exact component={singleOrder} />
            <Route path = "/admin" exact component = {Mainbody} />
            <Route path = "/getcategoryadmin" exact component = {CategoryAdmin} />
            <Route path = "/categoryupdate/:id" exact component = {CategoryUpdate}/>
            <Route path = "/aboutus" exact component = {Footer}/>
            <Route path = "/aboutuscontact" exact component = {AboutUs} />






        </div>
    );
}
