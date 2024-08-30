import React, { useEffect } from 'react'
import AdminSideBar from "./AdminSideBar";
import {Route, Routes} from "react-router-dom";
import Dashboard from "../Dashboard/Dashboard";
import Orders from "../Orders/Orders";
import Menu from "../Menu/Menu";
import {CreateRestaurantForm} from "../CreateRestaurantForm/CreateRestaurantForm";
import Events from "../Events/Events";
import {FoodCategory} from "../FoodCategory/FoodCategory";
import {RestaurantDetails} from "./RestaurantDetails";
import Ingredients from "../Ingredients/Ingredients";
import CreateMenuForm from "../Menu/CreateMenuForm";
import { useDispatch, useSelector } from 'react-redux';
import { getRestaurantById, getRestaurantsCategory } from '../../State/Restaurant/Action';
import { getMenuItemsByRestaurantId } from '../../State/Menu/Action';
import { fetchRestaurantsOrder } from '../../State/RestaurantOrder/Action';



const Admin = () => {
    const dispatch=useDispatch();
    const  jwt=localStorage.getItem("jwt");
    const { restaurant }=useSelector(store=>store);
    const handleClose=()=>{

    };
    useEffect(()=>{ 

        dispatch(
            getRestaurantsCategory({
             jwt,
             restaurantId:restaurant.usersRestaurant?.id,
         })
        );
        dispatch(fetchRestaurantsOrderntsOrder({ 
            jwt,
            restaurantId:restaurant.usersRestaurant?.id,


         }))
       // dispatch(getMenuItemsByRestaurantId())
        //dispatch(getRestaurantById())

     },[]);
    return (
        <div>
            <div className='lg:flex justify-between'>
                <div>
                    <AdminSideBar/>
                </div>
                <div className='lg:w-[80%]'>
                    <Routes>
                        <Route path="/" element={<Dashboard />} />
                        <Route path="/orders" element={<Orders />} />
                        <Route path="/menu" element={<Menu />} />
                        <Route path="/add-menu" element={<CreateMenuForm />} />
                        <Route path="/add-restaurant" element={<CreateRestaurantForm />} />
                        <Route path="/event" element={<Events/>} />
                        <Route path="/ingredients" element={<Ingredients/>} />
                        <Route path="/category" element={<FoodCategory />} />
                        <Route path="/details" element={<RestaurantDetails />} />
                    </Routes>

                </div>
            </div>
        </div>
    )
}
export default Admin
