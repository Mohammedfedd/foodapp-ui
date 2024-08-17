import React from "react";
import { Route, Routes } from "react-router-dom";
import CustomerRoutes, {CustomerRoute} from "./CustomerRoute";
//import Admin from "../Admin/Admin";
//import AdminDashboard from "../Admin/Dashboard/AdminDashboard";
import SuperAdmin from "../SuperAdmin/SuperAdmin";
import { useSelector } from "react-redux";
//import AdminRouters from "./AdminRouters";

const Routers = () => {
    const { auth } = useSelector((store) => store);

    return (
        <>

            <Routes>

                {/*<Route*/}
                {/*    path="/admin/restaurant/*"*/}
                {/*    element={<AdminRouters/>}*/}
                {/*/>*/}
                <Route path="/super-admin/*" element={<SuperAdmin/>}/>
                <Route path="/*" element={<CustomerRoute />} />
            </Routes>
        </>

    );
};

export default Routers;