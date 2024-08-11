import {Avatar, Badge, Box, IconButton} from '@mui/material'
import React from 'react'
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import {pink} from '@mui/material/colors';
import "./Navbar.css"
import {Person} from "@material-ui/icons";
import {useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";


export const Navbar = () => {
    const {auth}=useSelector(store=>store);
    const navigate=useNavigate();
    const handleAvatarClick=()=>{
        if (auth.user?.role === "ROLE_ADMIN") {
            navigate("/super-admin");
        } else if (auth.user?.role === "ROLE_RESTAURANT_OWNER") {
            navigate("/admin/restaurant");
        } else {
            navigate("/my-profile");
        }
    }
  return (
  <Box>

  <div className='px-5 sticky top-0 z-50 py-[.8rem] bg-[#e91e63] lg:px-20 flex justify-between'>

         <div className='lg;mr-10 cursor-pointer flex items-center spacz-x-4'>
            <li onClick={()=>navigate("/")} className='logo font-semibold text-gray-300 text-2x1'>
                Tasty Dash
            </li>
         </div>

      <div className='flex items-center text-2x1 lg:space-x-10'>
      <div className=''>
          <IconButton  >
             <SearchIcon sx={{fontSize:"1.5rem"}}/>
          </IconButton>
      </div>
      <div className='cursor-pointer'>
          {auth.user? <Avatar onClick={handleAvatarClick} sx={{bgcolor:"white",color:pink.A400}}>{auth.user?.fullName[0].toUpperCase()}</Avatar>:
             <IconButton onClick={()=>navigate("/account/login")}>
                <Person/>
             </IconButton>}
      </div>
     <div className=''>
          <IconButton  >
            <Badge color="dark" badgeContent={3}>
                 <ShoppingCartIcon sx={{fontSize:"1.5rem"}}/>
            </Badge>

          </IconButton>
      </div>
      </div>
      </div>
  </Box>
  )
}