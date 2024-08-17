import React from 'react'
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import FavoriteIcon from '@mui/icons-material/Favorite';
import HomeIcon from '@mui/icons-material/Home';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import EventIcon from '@mui/icons-material/Event';
import LogoutIcon from '@mui/icons-material/Logout';
import AddReactionIcon from '@mui/icons-material/AddReaction';
import { AccountBalanceWallet } from '@material-ui/icons';
import Drawer from '@mui/material/Drawer';
import {Divider, useMediaQuery} from "@mui/material";
import { useNavigate } from "react-router-dom";
import {useDispatch} from "react-redux";
import {logout} from "../State/Authentication/Action";


const menu=[
    {title:"Orders",icon:<ShoppingBagIcon/>},
    {title:"Favorites",icon:<FavoriteIcon/>},
    {title:"Address",icon:<AddReactionIcon/>},
    {title:"Payments",icon:<AccountBalanceWallet/>},
    {title:"Events",icon:<EventIcon/>},
    {title:"Logout",icon:<LogoutIcon/>},
]
export const ProfileNavigation = ({open,handleClose}) => {
    const isSmallScreen = useMediaQuery('(max-width:900px)');
    const navigate=useNavigate();
    const dispatch=useDispatch();

    const handleNavigate=(item)=>  {
        if(item.title==="Logout"){
            dispatch(logout());
            navigate("/")
        }
        else
        navigate(`/my-profile/${item.title.toLowerCase()}`);



    }

    return (
        <React.Fragment>
            <Drawer
                sx={{ zIndex: 1,position:"sticky" }}
                anchor={"left"}
                open={isSmallScreen ? open :true}
                onClose={handleClose}
                variant={isSmallScreen ? "temporary" : "permanent"}
                // variant="persistent"
            >
                <div className="w-[50vw] lg:w-[20vw] h-[100vh] flex flex-col
              justify-center text-xl pt-16 gap-14">
                    {menu.map((item, i) => (
                        <>
                            <div
                                onClick={() => handleNavigate(item)}
                                className="px-5 flex items-center space-x-5 cursor-pointer"
                            >
                                {item.icon}
                                <span>{item.title}</span>
                            </div>
                            {i !== menu.length - 1 && <Divider/>}
                        </>
                    ))}
                </div>
            </Drawer>
        <
        /React.Fragment>
    );
};

