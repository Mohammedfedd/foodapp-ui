import React from 'react'
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import FavoriteIcon from '@mui/icons-material/Favorite';
import HomeIcon from '@mui/icons-material/Home';
import AccountBalanceWalletIcon from '@material-ui/AccountBalanceWalletIcon';
import NotificationActiveIcon from '@mui/icons-material/NotificationActiveIcon';
import EventIcon from '@mui/icons-material/EventIcon';
import LoguoutIcon from '@mui/icons-material/LoguoutIcon';
import { AddReaction } from '@mui/icons-material';
import { AccountBalanceWallet } from '@material-ui/icons';
import { Drawer } from '@mui/material';

const menu=[ 
    {title:"Orders",icon:<ShoppingBagIcon/>},
    {title:"Favorite",icon:<FavoriteIcon/>},
    {title:"Address",icon:<AddReaction/>},
    {title:"Payments",icon:<AccountBalanceWallet/>},
    {title:"Events",icon:<EventsIcon/>},
    {title:"Logout",icon:<LoguoutIcon/>},
]
export const ProfileNavigation = ({open,handleClose}) => {
    const isSmallScreen=useMediaQuery("(max-with:1080)");
    
    return (
        <div>
             <Drawer variant={isSmallScreen ?"temporary" : "permanent"}
             onClose={handleClose} 
             open={open} 
             anchor="left"
             sx={{zIndex:1}}
             >
             <div className='w-[50vw] lg:w-[20vw] h-[100vh] flex flex-col
              justify-center text-xl gap-8 pt-16'>
{menu.map((item)=> <>

<div></div>
</>)}
             </div>
             </Drawer>

        
        </div>
    );
};

