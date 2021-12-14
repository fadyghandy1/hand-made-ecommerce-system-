import SidebarCard from "../Sidebar/SidebarCard/SidebarCard";
import axios from "axios";
import NavBar from "../NavBar/NavBar";
import { Card } from "primereact/card";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUsersAction } from "../../actions/userAction"; 

import "./Mainbody.scss";
import ChartData from "../ChartData/ChartData";
const Mainbody = ({history}) => {
    const dispatch = useDispatch();

    const [orders, setOrders] = useState([]);
    const [products, setProducts] = useState([]);
    const [users, setUsers] = useState([]);
    const [totalSales, setTotalSales] = useState([]);
    const userLogin = useSelector((state) => state.userLoginReducer);
    const { userInfo } = userLogin;

    useEffect(() => {
        if (userInfo.length !== 0) {
          if(userInfo.data.user.isAdmin === false){
            
            history.push("/");
          }else{
            dispatch(getUsersAction());
          }
        } 
        else {
          history.push("/login");
    
        }
      }, [dispatch, userInfo]);

    
    const getOrderCount = ()=>{
        axios({
            method: "GET",
            url: "http://localhost:3000/api/v1/orders/get/count",
            withCredentials: false,
            headers:{
                Authorization: `Bearer ${userInfo.token}`
            }
        })
            .then((res) => {
                setOrders(res.data.data.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }

    const getProductCount = ()=>{
        axios({
            method: "GET",
            url: "http://localhost:3000/api/v1/products/get/count",
            withCredentials: false,
            headers:{
                Authorization: `Bearer ${userInfo.token}`
            }
        })
            .then((res) => {
                setProducts(res.data.data.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }

    const getUsersCount = ()=>{
        axios({
            method: "GET",
            url: "http://localhost:3000/api/v1/users/get/count",
            withCredentials: false,
            headers:{
                Authorization: `Bearer ${userInfo.token}`
            }
        })
            .then((res) => {
                console.log(res.data.userCount)
                setUsers(res.data.userCount);
            })
            .catch((err) => {
                console.log(err);
            });
    }
    
    const getTotalsales = ()=>{
        axios({
            method: "GET",
            url: "http://localhost:3000/api/v1/orders/get/totalsales",
            withCredentials: false,
            headers:{
                Authorization: `Bearer ${userInfo.token}`
            }
        })
            .then((res) => {
                setTotalSales(res.data.data.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }
    
    useEffect(() => {
        if (userInfo.length === 0) {
            history.push("/login");
        } else {
            getOrderCount();
            getProductCount();
            getUsersCount();
            getTotalsales();
        }
    }, []);
    return (
        <>
        <NavBar />
        <div className="container my-5  ">
            
            <Card>
                <div className=" p-2">
                <div className="pb-5 d-flex flex-wrap ">
                    <SidebarCard stats={orders} css={"d-orders"} name={"Orders"} icon={"pi-shopping-cart"} />
                    <SidebarCard stats={products} css={"d-products"} name={"Products"} icon={"pi-briefcase"} />
                    <SidebarCard stats={users} css={"d-users"} name={"Users"} icon={"pi-users"} />
                    <SidebarCard stats={`${totalSales}$`} name={"Total Sales"} icon={"pi-dollar"} css={"d-totalsales"} />
                </div>
                <div className="p-grid">
                    <ChartData />
                </div>
                </div>
            </Card>
           
        </div>
        </>
    );
};

export default Mainbody;
