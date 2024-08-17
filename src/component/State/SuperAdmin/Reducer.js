import * as actionTypes from "./ActionType";

const initialState = {
    customers: [],
    pendingCustomers: [],
    restaurants: [],
    pendingRestaurants: [],
    archivedRestaurants: [], // Added state for archived restaurants
    loading: false,
    error: null,
};

const superAdminReducer = (state = initialState, action) => {
    switch (action.type) {
        // Request Actions
        case actionTypes.GET_CUSTOMERS_REQUEST:
        case actionTypes.GET_PENDING_CUSTOMERS_REQUEST:
        case actionTypes.GET_RESTAURANTS_REQUEST:
        case actionTypes.GET_PENDING_RESTAURANTS_REQUEST:
        case actionTypes.ARCHIVE_RESTAURANT_REQUEST:
        case actionTypes.GET_ARCHIVED_RESTAURANTS_REQUEST:
        case actionTypes.UNARCHIVE_RESTAURANT_REQUEST:
        case actionTypes.DELETE_CUSTOMER_REQUEST: // Added delete request action
            return {
                ...state,
                loading: true,
                error: null,
            };

        // Success Actions
        case actionTypes.GET_CUSTOMERS_SUCCESS:
            return {
                ...state,
                loading: false,
                customers: action.payload,
            };
        case actionTypes.GET_PENDING_CUSTOMERS_SUCCESS:
            return {
                ...state,
                loading: false,
                pendingCustomers: action.payload,
            };
        case actionTypes.GET_RESTAURANTS_SUCCESS:
            return {
                ...state,
                loading: false,
                restaurants: action.payload,
            };
        case actionTypes.GET_PENDING_RESTAURANTS_SUCCESS:
            return {
                ...state,
                loading: false,
                pendingRestaurants: action.payload,
            };
        case actionTypes.GET_ARCHIVED_RESTAURANTS_SUCCESS:
            return {
                ...state,
                loading: false,
                archivedRestaurants: action.payload,
            };
        case actionTypes.ARCHIVE_RESTAURANT_SUCCESS:
            return {
                ...state,
                loading: false,
                // Remove the archived restaurant from the main list
                restaurants: state.restaurants.filter(restaurant => restaurant.id !== action.payload),
            };
        case actionTypes.UNARCHIVE_RESTAURANT_SUCCESS:
            return {
                ...state,
                loading: false,
                // Remove the restaurant from archived list and add it back to the main list
                archivedRestaurants: state.archivedRestaurants.filter(restaurant => restaurant.id !== action.payload),
                restaurants: [
                    ...state.restaurants,
                    state.archivedRestaurants.find(restaurant => restaurant.id === action.payload)
                ]
            };
        case actionTypes.DELETE_CUSTOMER_SUCCESS:
            return {
                ...state,
                loading: false,
                customers: state.customers.filter(customer => customer.id !== action.payload), // Remove the deleted customer
            };

        // Failure Actions
        case actionTypes.GET_CUSTOMERS_FAILURE:
        case actionTypes.GET_PENDING_CUSTOMERS_FAILURE:
        case actionTypes.GET_RESTAURANTS_FAILURE:
        case actionTypes.GET_PENDING_RESTAURANTS_FAILURE:
        case actionTypes.ARCHIVE_RESTAURANT_FAILURE:
        case actionTypes.GET_ARCHIVED_RESTAURANTS_FAILURE:
        case actionTypes.UNARCHIVE_RESTAURANT_FAILURE:
        case actionTypes.DELETE_CUSTOMER_FAILURE: // Added delete failure action
            return {
                ...state,
                loading: false,
                error: action.payload,
            };

        default:
            return state;
    }
};

export default superAdminReducer;
