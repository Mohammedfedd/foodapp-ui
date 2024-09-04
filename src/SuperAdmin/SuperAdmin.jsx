import React, {useEffect} from "react";
import { Route, Routes } from "react-router-dom";
import SuperAdminSidebar from "./SuperAdminSideBar";
import SuperAdminCustomerTable from "./SuperAdminCustomerTable/SuperAdminCustomerTable";
import Customers from "./SuperAdminCustomerTable/Customers";
import RestaurantTable from "./Restaurants/RestaurantTable";
import SuperAdminRestaurant from "./Restaurants/SuperAdminRestaurant";
import ArchivedRestaurant from "./RestaurantRequest/ArchivedRestaurant";
import SuperAdminDashboard from "./SuperAdminDashboard/SuperAdminDashboard";
import {useDispatch, useSelector} from "react-redux";
import {getCustomers} from '../State/SuperAdmin/superAdmin.action';
// import AdminDashboard from "./Dashboard/AdminDashboard";
// import AdminSidebar from "./AdminSidebar";
// import RestaurantDashboard from "./Dashboard/RestaurantDashboard";
// import RestaurantsOrder from "./Orders/RestaurantsOrder";
// import RestaurantsMenu from "./MenuItem/RestaurantsMenu";
// import AddMenuForm from "./AddMenu/AddMenuForm";
// import CreateRestaurantForm from "./AddRestaurants/CreateRestaurantForm";


const SuperAdmin = () => {
    const dispatch = useDispatch();
    const { auth, restaurant, ingredients } = useSelector((store) => store);
    const jwt = localStorage.getItem("jwt");
    useEffect(() => {

        dispatch(
            getCustomers({ jwt: localStorage.getItem("jwt") })
        );

    }, []);
    return (
        <div className="lg:flex justify-between">
            <div className="">

                <SuperAdminSidebar/>
            </div>

            <div className="w-[80vw]">
                <Routes>
                    <Route path="/" element={<SuperAdminDashboard/>}></Route>
                    <Route path="/customers" element={<Customers/>}></Route>
                    <Route path="/restaurants" element={<SuperAdminRestaurant/>}></Route>
                    <Route path="/archived" element={<ArchivedRestaurant/>}></Route>
                </Routes>
            </div>
        </div>
    );
};

export default SuperAdmin;
