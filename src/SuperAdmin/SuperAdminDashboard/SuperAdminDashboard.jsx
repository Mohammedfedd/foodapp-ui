import React, { useEffect } from 'react';
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getCustomers } from "../../component/State/SuperAdmin/Action";
import { Grid } from "@mui/material";
import SuperAdminCustomerTable from "../SuperAdminCustomerTable/SuperAdminCustomerTable";
import RestaurantTable from "../Restaurants/RestaurantTable";

const SuperAdminDashboard = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const { auth, customers,restaurants, loading } = useSelector(store => store);

    useEffect(() => {
        if (id) {
            dispatch(getCustomers({ customerId: id, jwt: localStorage.getItem("jwt") }));
        }
    }, [id, dispatch]);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="px-2">
            <Grid container spacing={1}>
                <Grid item lg={20} xs={12}>
                    <SuperAdminCustomerTable
                        name={"Recent users"}
                        isDashboard={true}
                        customers={customers}
                    />
                </Grid>
                <Grid container spacing={1}>
                <Grid item lg={20} xs={12}>
                    <RestaurantTable
                        name={"Recent Restaurants"}
                        restaurants={restaurants}
                    />
                </Grid>
            </Grid>
            </Grid>
        </div>
    );
};

export default SuperAdminDashboard;
