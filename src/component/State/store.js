import { authReducer } from "./Authentication/Reducer";
import { applyMiddleware, combineReducers, legacy_createStore } from "redux";
import restaurantReducer from "./Restaurant/Reducer";
import menuItemReducer from "./Menu/Reducer";
import cartReducer from "./Cart/Reducer";
import { orderReducer } from "./Order/Reducer";
import restaurantsOrderReducer from "./RestaurantOrder/Reducer";
import { ingredientReducer } from "./Ingredients/Reducer";
import superAdminReducer from "./SuperAdmin/Reducer";
import { persistStore, persistReducer } from "redux-persist";
import {thunk} from "redux-thunk";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web

// Configure persist
const persistConfig = {
    key: "root",
    storage,
    whitelist: ["restaurant", "superAdmin"], // Add any other reducers you want to persist
};

// Combine reducers
const rootReducer = combineReducers({
    auth: authReducer,
    restaurant: restaurantReducer,
    menu: menuItemReducer,
    cart: cartReducer,
    order: orderReducer,
    restaurantOrder: restaurantsOrderReducer,
    ingredients: ingredientReducer,
    superAdmin: superAdminReducer,
});

// Create a persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Create store with the persisted reducer
export const store = legacy_createStore(persistedReducer, applyMiddleware(thunk));

// Create a persistor
export const persistor = persistStore(store);
