import * as actionTypes from "./ActionType";

const initialState = {
    customers: [],
    pendingCustomers: [],
    restaurants: [],
    pendingRestaurants: [],
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
        case actionTypes.DELETE_CUSTOMER_REQUEST:
        case actionTypes.DELETE_RESTAURANT_REQUEST:
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
        case actionTypes.DELETE_CUSTOMER_SUCCESS:
            return {
                ...state,
                loading: false,
                customers: state.customers.filter(customer => customer.id !== action.payload),
            };
        case actionTypes.DELETE_RESTAURANT_SUCCESS:
            return {
                ...state,
                loading: false,
                restaurants: state.restaurants.filter(restaurant => restaurant.id !== action.payload),
            };

        // Failure Actions
        case actionTypes.GET_CUSTOMERS_FAILURE:
        case actionTypes.GET_PENDING_CUSTOMERS_FAILURE:
        case actionTypes.GET_RESTAURANTS_FAILURE:
        case actionTypes.GET_PENDING_RESTAURANTS_FAILURE:
        case actionTypes.DELETE_CUSTOMER_FAILURE:
        case actionTypes.DELETE_RESTAURANT_FAILURE:
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
