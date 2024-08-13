import { api, API_URL } from "../../config/api";
import {
    GET_CUSTOMERS_FAILURE,
    GET_CUSTOMERS_REQUEST,
    GET_CUSTOMERS_SUCCESS,
    GET_PENDING_CUSTOMERS_FAILURE,
    GET_PENDING_CUSTOMERS_REQUEST,
    GET_PENDING_CUSTOMERS_SUCCESS,
    GET_RESTAURANTS_FAILURE,
    GET_RESTAURANTS_REQUEST,
    GET_RESTAURANTS_SUCCESS,
    GET_PENDING_RESTAURANTS_FAILURE,
    GET_PENDING_RESTAURANTS_REQUEST,
    GET_PENDING_RESTAURANTS_SUCCESS,
    DELETE_CUSTOMER_FAILURE,
    DELETE_CUSTOMER_SUCCESS,
    DELETE_CUSTOMER_REQUEST,
    DELETE_RESTAURANT_FAILURE,
    DELETE_RESTAURANT_SUCCESS,
    DELETE_RESTAURANT_REQUEST,
    APPROVE_RESTAURANT_REQUEST_REQUEST,
    APPROVE_RESTAURANT_REQUEST_SUCCESS,
    REJECT_RESTAURANT_REQUEST_SUCCESS,
    APPROVE_RESTAURANT_REQUEST_FAILURE,
    REJECT_RESTAURANT_REQUEST_REQUEST,
    REJECT_RESTAURANT_REQUEST_FAILURE
} from "./ActionType";
import axios from "axios";

// Fetch all customers
export const getCustomers = () => {
    return async (dispatch) => {
        dispatch({ type: GET_CUSTOMERS_REQUEST });
        try {
            const token = localStorage.getItem('jwt'); // Get the JWT token from localStorage
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`, // Set the Authorization header with the JWT token
                },
            };
            const { data } = await api.get(`${API_URL}/api/customers`, config);
            dispatch({ type: GET_CUSTOMERS_SUCCESS, payload: data });
            console.log("Fetched customers: ", data);
        } catch (error) {
            dispatch({
                type: GET_CUSTOMERS_FAILURE,
                payload: error.message // Include the error message in the payload
            });
            console.error("Error fetching customers: ", error); // Improved error logging
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


// Fetch pending customers
export const getPendingCustomers = () => {
    return async (dispatch) => {
        dispatch({ type: GET_PENDING_CUSTOMERS_REQUEST });
        try {
            const { data } = await api.get(`${API_URL}/api/customers?status=pending`);
            dispatch({ type: GET_PENDING_CUSTOMERS_SUCCESS, payload: data });
            console.log("Fetched pending customers: ", data);
        } catch (error) {
            dispatch({ type: GET_PENDING_CUSTOMERS_FAILURE, error: error.message });
        }
    };
};

// Fetch all restaurants
export const getRestaurants = () => async (dispatch) => {
    dispatch({ type: GET_RESTAURANTS_REQUEST });

    const jwtToken = localStorage.getItem("jwt");

    try {
        const response = await axios.get(`${API_URL}/api/restaurants`, {
            headers: {
                Authorization: `Bearer ${jwtToken}`, // Include JWT token in headers
            },
        });

        dispatch({
            type: GET_RESTAURANTS_SUCCESS,
            payload: response.data,
        });
    } catch (error) {
        dispatch({
            type: GET_RESTAURANTS_FAILURE,
            payload: error.message,
        });
    }
};

// Fetch pending restaurants
export const getPendingRestaurants = () => {
        return async (dispatch) => {
            dispatch({type: GET_PENDING_RESTAURANTS_REQUEST});
            try {
                const token = localStorage.getItem('jwt');
                const config = {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                };
                const response = await axios.get(`${API_URL}/api/restaurant/pending`, config);
                dispatch({type: GET_PENDING_RESTAURANTS_SUCCESS, payload: response.data});
            } catch (error) {
                dispatch({
                    type: GET_PENDING_RESTAURANTS_FAILURE,
                    payload: error.message,
                });
            }
        };
};
export const approveRestaurantRequest = (requestId) => {
    return async (dispatch) => {
        dispatch({ type: APPROVE_RESTAURANT_REQUEST_REQUEST });
        try {
            const token = localStorage.getItem('jwt');
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };
            await axios.post(`${API_URL}/api/restaurant/approve/${requestId}`, {}, config);
            dispatch({ type: APPROVE_RESTAURANT_REQUEST_SUCCESS, payload: requestId });
            dispatch(getRestaurants()); // Refresh the list of pending requests
        } catch (error) {
            dispatch({
                type: APPROVE_RESTAURANT_REQUEST_FAILURE,
                payload: error.message,
            });
        }
    };
};

// Reject restaurant request
export const rejectRestaurantRequest = (requestId) => {
    return async (dispatch) => {
        dispatch({ type: REJECT_RESTAURANT_REQUEST_REQUEST });
        try {
            const token = localStorage.getItem('jwt');
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };
            await axios.post(`${API_URL}/api/restaurant/reject/${requestId}`, {}, config);
            dispatch({ type: REJECT_RESTAURANT_REQUEST_SUCCESS, payload: requestId });
            dispatch(getRestaurants()); // Refresh the list of pending requests
        } catch (error) {
            dispatch({
                type: REJECT_RESTAURANT_REQUEST_FAILURE,
                payload: error.message,
            });
        }
    };
};

// Delete restaurant
export const SuperdeleteRestaurant = (restaurantId) => {
    return async (dispatch) => {
        dispatch({ type: DELETE_RESTAURANT_REQUEST });
        try {
            const token = localStorage.getItem('jwt');
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };
            console.log(`Deleting restaurant with ID: ${restaurantId}`);
            console.log(`Request URL: ${API_URL}/api/restaurants/${restaurantId}`);
            await api.delete(`${API_URL}/api/restaurants/${restaurantId}`, config);
            dispatch({ type: DELETE_RESTAURANT_SUCCESS, payload: restaurantId });
        } catch (error) {
            console.error(`Error deleting restaurant with id ${restaurantId}: `, error);
            dispatch({
                type: DELETE_RESTAURANT_FAILURE,
                payload: error.message,
            });
        }
    };
};
