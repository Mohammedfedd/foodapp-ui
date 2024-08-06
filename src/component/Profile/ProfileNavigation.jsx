import React from 'react'
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import FavoriteIcon from '@mui/icons-material/Favorite';
import HomeIcon from '@mui/icons-material/Home';
import AccountBalanceWalletIcon from '@material-ui/AccountBalanceWalletIcon';
import NotificationActiveIcon from '@mui/icons-material/NotificationActiveIcon';
import EventIcon from '@mui/icons-material/EventIcon';
import LoguoutIcon from '@mui/icons-material/LoguoutIcon';
import AddReactionIcon from '@mui/icons-material/AddReaction';
import { AccountBalanceWallet } from '@material-ui/icons';
import Drawer from '@mui/material/Drawer';

const menu=[ 
    {title:"Orders",icon:<ShoppingBagIcon/>},
    {title:"Favorite",icon:<FavoriteIcon/>},
    {title:"Address",icon:<AddReactionIcon/>},
    {title:"Payments",icon:<AccountBalanceWallet/>},
    {title:"Events",icon:<EventIcon/>},
    {title:"Logout",icon:<LoguoutIcon/>},
]
export const ProfileNavigation = ({open,handleClose}) => {
    const isSmallScreen = useMediaQuery('(max-width:900px)');
    const navigate=useNavigate();

    const handleNavigate=(item)=>  {
        navigate('/my-profile/${item.title.toLowerCase()}')

      

    }

    return (
        <div>
             <Drawer
               variant={isSmallScreen ?"temporary" : "permanent"}
             onClose={handleClose} 
             open={isSmallScreen ? open : true} 
            
             anchor="left"
             sx={{zIndex: -1 , position:"sticky"}}
             >
             <div className='w-[50vw] lg:w-[20vw] h-[100vh] flex flex-col
              justify-center text-xl pt-16 gap-8 '>
{menu.map((item)=> <>

<div onClick={()=>handleNavigate(item)} className='px-5 flex items-center space-x-5 cursor-pointer'>
    {item.icon}
    <span> {item.title}</span>
</div>
 {i!==menu.length-1 && <Divider/>}
</>)}
             </div>
             </Drawer>

        
        </div>
    );
};

