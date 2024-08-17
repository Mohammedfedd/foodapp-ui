import React from 'react';
import RestaurantCard from '../Restaurant/RestaurantCard';
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function Favorites() {
    const navigate = useNavigate();
    const { auth } = useSelector(store => store);

    const handleNavigateToRestaurant = (restaurant) => {
        console.log("Navigating to restaurant:", restaurant); // Debugging output

        if (restaurant.open) {
            const city = restaurant.city || 'default-city';
            const name = restaurant.title || 'default-name';  // Ensure 'name' or 'title' is used correctly
            navigate(`/restaurant/${city}/${name}/${restaurant.id}`);
        } else {
            console.log(`${restaurant.title} is closed`); // Debugging output
        }
    };

    return (
        <div>
            <h1 className='py-5 text-xl font-semibold text-center'>My Favorites</h1>
            <div className='flex flex-wrap gap-3 justify-center'>
                {auth.favorites?.map(favorite => (
                    <div key={favorite.id} onClick={() => handleNavigateToRestaurant(favorite)}>
                        <RestaurantCard item={favorite} />
                    </div>
                ))}
            </div>
        </div>
    );
}
