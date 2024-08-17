import React, { useState } from 'react'
import { ProfileNavigation } from './ProfileNavigation'
import { UserProfile} from './UserProfile'
import {Routes ,Route  } from 'react-router-dom'
import { Orders } from './Orders';
import UsersAddresses   from "./UsersAddresses";
import Favorites from './Favorites';
import { Events } from './Events';
const Profile = () => {
    const [openSideBar, setOpenSideBar]=useState(false);
    return (
        <div className= 'lg:flex justify-between'>
            <div className='stiky h-[80vh] lg:w-[20%]'>
               <ProfileNavigation open={openSideBar}/>
            </div>
            <div className='lg:w-[80%]'>
 
    <Routes>

        <Route path='/' element={<UserProfile/>}/>
        <Route path='/orders' element={<Orders/>}/>
        <Route path='/address' element={<UsersAddresses/>}/>
        <Route path='/favorites' element={<Favorites/>}> </Route>
        <Route path='/events' element={< Events/>} > </Route>

        

    </Routes>
                
            </div>
        </div>
    );
};

export default Profile;