import React from 'react';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Button } from '@mui/material';
import { logout } from "../State/Authentication/Action";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export const UserProfile = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // Assuming `auth` contains the current logged-in user details
    const { user } = useSelector((store) => store.auth);

    const handleLogout = () => {
        dispatch(logout());
        navigate("/");
    }

    return (
        <div className='min-h-[80vh] flex flex-col justify-center items-center text-center'>
            <div className='flex flex-col items-center justify-center'>
                <AccountCircleIcon sx={{fontSize:"9rem"}}/>
                <h1 className='py-5 text-2xl font-semibold'>{user?.fullName || "User's Name"}</h1>
                <p>Email: {user?.email || "user@example.com"}</p>
                <Button variant='contained' onClick={handleLogout} sx={{margin:"2rem 0rem"}}>Logout</Button>
            </div>
        </div>
    );
}
