import React, {useEffect} from 'react'
import {useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {getCustomers} from "../../component/State/SuperAdmin/Action";
import {Grid} from "@mui/material";
import SuperAdminCustomerTable from "../SuperAdminCustomerTable/SuperAdminCustomerTable";

const SuperAdminDashboard = () => {
  const { id } = useParams();
  const {restaurant}=useSelector(store=>store);
  console.log("restaurants id ", id);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
        getCustomers({
            customerId:id,
          jwt: localStorage.getItem("jwt"),
        })
    );
  }, []);

  console.log("restaurant",restaurant)
  return (
      <div className="px-2">

        <Grid container spacing={1}>
          {}
          <Grid lg={6} xs={12} item>
            <SuperAdminCustomerTable name={"Recent users"} isDashboard={true} />
          </Grid>
          {/*<Grid lg={6} xs={12} item>*/}
          {/*  <MenuItemTable isDashboard={true} name={"Recently Added Menu"} />*/}
          {/*</Grid>*/}
        </Grid>
      </div>
  );
};

export default SuperAdminDashboard