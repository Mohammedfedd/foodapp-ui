import React from 'react'
import { Navbar } from '../component/Navbar/Navbar'
import {Routes ,Route  } from 'react-router-dom'
import Home from '../component/Home/Home'
import RestaurantDetails from '../component/Restaurant/RestaurantDetails'
import Cart from '../component/Cart/Cart'
import Profile from '../component/Profile/Profile'
import Auth from "../component/Auth/Auth";
import PasswordChangeSuccess from "../component/Auth/PasswordChangeSuccess";
import PaymentSuccess from "../component/PaymentSuccess/PaymentSuccess"


export const CustomerRoute=() => {

    return(
        <div>
            <Navbar/>
            <Routes >
                <Route path='/' element={<Home/>}/>
                <Route path='/account/:register' element={<Home/>}/>
                <Route exact path='/restaurant/:city/:title/:id' element={<RestaurantDetails/>}/>
                <Route path='/cart' element={<Cart/>}/>
                <Route path='/my-profile/*' element={<Profile/>}/>
                <Route exact path='/password-change-success' element={<PasswordChangeSuccess/>}/>
                <Route exact path='/payment/success/:id' element={<PaymentSuccess/>}/>


            </Routes>
            <Auth/>
        </div>
    )
}
export default CustomerRoute

// /my-profile/orders