import React, { useEffect } from "react";
import "./HomePage.css";
import Navbar from "../../components/Navbar/Navbar";
import MultipleItemsCarousel from "../../components/MultiItemCarousel/MultiItemCarousel";
import RestaurantCard from "../../components/RestarentCard/RestaurantCard";
import { useDispatch, useSelector } from "react-redux";
import { getAllRestaurantsAction } from "../../../State/Customers/Restaurant/restaurant.action";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
    const { auth, restaurant } = useSelector((store) => store);
    const dispatch = useDispatch();
    const navigate = useNavigate(); // Initialize useNavigate

    useEffect(() => {
        if (auth.user) {
            dispatch(getAllRestaurantsAction(localStorage.getItem("jwt")));
        }
    }, [auth.user, dispatch]);

    const handleSignUpClick = () => {
        navigate("/account/register"); // Redirect to the signup page
    };

    return (
        <div>
            <section className="banner relative flex flex-col justify-center items-center py-20">
                <div className="relative z-10 flex flex-col items-center text-center">
                    <p className="text-2xl lg:text-7xl font-bold text-white py-5">Tasty Dash</p>
                    <p className="text-gray-300 text-xl lg:text-4xl mb-6">
                        Delivering Happiness to your doorstep.
                    </p>
                    {!auth.user && (
                        <button
                            onClick={handleSignUpClick}
                            className="bg-orange-500 text-white py-2 px-4 rounded hover:bg-orange-600 transition duration-300"
                        >
                            Sign Up to Explore Restaurants
                        </button>
                    )}
                </div>
                <div className="cover absolute top-0 left-0 right-0"></div>
                <div className="fadout"></div>
            </section>

            <section className="p-10 lg:py-10 lg:px-20">
                <div>
                    <p className="text-2xl font-semibold text-gray-400 py-3 pb-10">
                        Top Meals
                    </p>
                    <MultipleItemsCarousel />
                </div>
            </section>

            {auth.user && ( // Only show this section if the user is logged in
                <section className="px-5 lg:px-20">
                    <div>
                        <h1 className="text-2xl font-semibold text-gray-400 py-3">
                            Order From Our Handpicked Favorites
                        </h1>
                        <div className="flex flex-wrap items-center justify-around">
                            {restaurant.restaurants.map((item, i) => (
                                <RestaurantCard data={item} index={i} key={i} />
                            ))}
                        </div>
                    </div>
                </section>
            )}
        </div>
    );
};

export default HomePage;
