import { api, API_URL } from "../../config/api";
import {
    GET_CUSTOMERS_FAILURE,
    GET_CUSTOMERS_REQUEST,
    GET_CUSTOMERS_SUCCESS,
    DELETE_CUSTOMER_FAILURE,
    DELETE_CUSTOMER_SUCCESS,
    DELETE_CUSTOMER_REQUEST,
    ARCHIVE_RESTAURANT_REQUEST,
    ARCHIVE_RESTAURANT_SUCCESS,
    ARCHIVE_RESTAURANT_FAILURE,

    UNARCHIVE_RESTAURANT_FAILURE,
    UNARCHIVE_RESTAURANT_SUCCESS,
    UNARCHIVE_RESTAURANT_REQUEST
} from "./superAdmin.actionType";
import axios from "axios";
import {
    GET_ALL_RESTAURANTS_FAILURE,
    GET_ALL_RESTAURANTS_REQUEST,
    GET_ALL_RESTAURANTS_SUCCESS,
    GET_ARCHIVED_RESTAURANTS_REQUEST,
    GET_ARCHIVED_RESTAURANTS_SUCCESS,
    GET_ARCHIVED_RESTAURANTS_FAILURE,
} from "../Customers/Restaurant/ActionTypes";

// Fetch all customers
export const getCustomers = () => {
    return async (dispatch) => {
        dispatch({ type: GET_CUSTOMERS_REQUEST });
        try {
            const token = localStorage.getItem('jwt');
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };
            const { data } = await axios.get(`${API_URL}/api/customers`, config);
            dispatch({ type: GET_CUSTOMERS_SUCCESS, payload: data });
            console.log("Fetched customers: ", data); // Check data in console
        } catch (error) {
            dispatch({
                type: GET_CUSTOMERS_FAILURE,
                payload: error.message
            });
            console.error("Error fetching customers: ", error);
        }
    };
};

// Delete customer
export const deleteCustomer = (userId) => {
    return async (dispatch) => {
        dispatch({ type: DELETE_CUSTOMER_REQUEST });
        try {
            const token = localStorage.getItem('jwt');
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };
            console.log(`Deleting customer with ID: ${userId}`);
            console.log(`Request URL: ${API_URL}/api/customers/${userId}`);
            await api.delete(`${API_URL}/api/customers/${userId}`, config); // Make sure URL is correct
            dispatch({ type: DELETE_CUSTOMER_SUCCESS, payload: userId });
        } catch (error) {
            console.error(`Error deleting customer with id ${userId}: `, error);
            dispatch({
                type: DELETE_CUSTOMER_FAILURE,
                payload: error.message,
            });
        }
    };
};

// Fetch all restaurants
export const getAllRestaurantsAction = () => async (dispatch) => {
    dispatch({ type: GET_ALL_RESTAURANTS_REQUEST });
    try {
        const token = localStorage.getItem('jwt'); // Get the JWT token from localStorage
        const config = {
            headers: {
                Authorization: `Bearer ${token}`, // Set the Authorization header with the JWT token
            },
        };
        const { data } = await axios.get(`${API_URL}/api/restaurants/restaurantList?status=ACTIVE`, config); // Ensure the status is ACTIVE
        dispatch({ type: GET_ALL_RESTAURANTS_SUCCESS, payload: data });
        console.log("Fetched active restaurants: ", data);
    } catch (error) {
        dispatch({
            type: GET_ALL_RESTAURANTS_FAILURE,
            payload: error.message // Include the error message in the payload
        });
        console.error("Error fetching active restaurants: ", error); // Improved error logging
    }
};






// Fetch archived restaurants
export const getArchivedRestaurants = () => async (dispatch) => {
    dispatch({ type: GET_ARCHIVED_RESTAURANTS_REQUEST });

    try {
        const token = localStorage.getItem('jwt'); // Get the JWT token from localStorage
        const config = {
            headers: {
                Authorization: `Bearer ${token}`, // Set the Authorization header with the JWT token
            },
        };

        const { data } = await axios.get(`${API_URL}/api/restaurants/restaurantList?status=ARCHIVED`, config); // Ensure the status is ARCHIVED
        dispatch({ type: GET_ARCHIVED_RESTAURANTS_SUCCESS, payload: data });
        console.log("Fetched archived restaurants: ", data);
    } catch (error) {
        dispatch({
            type: GET_ARCHIVED_RESTAURANTS_FAILURE,
            payload: error.message // Include the error message in the payload
        });
        console.error("Error fetching archived restaurants: ", error); // Improved error logging
    }
};




export const unarchiveRestaurant = (restaurantId) => async (dispatch) => {
    dispatch({ type: UNARCHIVE_RESTAURANT_REQUEST });

    try {
        const token = localStorage.getItem('jwt'); // Get the JWT token from localStorage
        const response = await fetch(`${API_URL}/api/restaurants/${restaurantId}/unarchive`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${token}`, // Set the Authorization header with the JWT token
                'Content-Type': 'application/json', // Specify content type as JSON
            },
        });

        if (response.ok) {
            dispatch({
                type: UNARCHIVE_RESTAURANT_SUCCESS,
                payload: restaurantId,
            });
        } else {
            const errorData = await response.json();
            dispatch({
                type: UNARCHIVE_RESTAURANT_FAILURE,
                payload: errorData.message,
            });
        }
    } catch (error) {
        dispatch({
            type: UNARCHIVE_RESTAURANT_FAILURE,
            payload: error.message,
        });
    }
};

// Delete restaurant
export const SuperarchiveRestaurant = (restaurantId) => {
    return async (dispatch) => {
        dispatch({ type: ARCHIVE_RESTAURANT_REQUEST });
        try {
            const token = localStorage.getItem('jwt');
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };
            console.log(`Archiving restaurant with ID: ${restaurantId}`);
            console.log(`Request URL: ${API_URL}/api/restaurants/${restaurantId}/archive`);
            await api.post(`${API_URL}/api/restaurants/${restaurantId}/archive`, {}, config); // POST request to archive
            dispatch({ type: ARCHIVE_RESTAURANT_SUCCESS, payload: restaurantId });
        } catch (error) {
            console.error(`Error archiving restaurant with id ${restaurantId}: `, error);
            dispatch({
                type: ARCHIVE_RESTAURANT_FAILURE,
                payload: error.message,
            });
        }
    };
};

