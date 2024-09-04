import React, { useEffect } from 'react';
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getCustomers, getAllRestaurantsAction } from "../../State/SuperAdmin/superAdmin.action";
import { Grid } from "@mui/material";
import SuperAdminCustomerTable from "../SuperAdminCustomerTable/SuperAdminCustomerTable";
import RestaurantTable from "../Restaurants/RestaurantTable";

const SuperAdminDashboard = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { customers, restaurants, loading } = useSelector(store => store);

  // Fetch customers when `id` changes
  useEffect(() => {
    if (id) {
      dispatch(getCustomers({ customerId: id, jwt: localStorage.getItem("jwt") }));
    }
  }, [id, dispatch]);

  // Fetch all restaurants once on component mount
  useEffect(() => {
    dispatch(getAllRestaurantsAction(localStorage.getItem("jwt")));
  }, [dispatch]);

  // Show loading indicator if any data is being fetched
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
                filterRole="ALL"
            />
          </Grid>
          <Grid container spacing={1}>
            <Grid item lg={20} xs={12}>
              <RestaurantTable
                  name={"Recent Restaurants"}
                  filter="ALL" // Set the filter to show all restaurants
              />
            </Grid>
          </Grid>
        </Grid>
      </div>
  );
};

export default SuperAdminDashboard;
