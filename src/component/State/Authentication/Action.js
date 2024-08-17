import {
    ADD_TO_FAVORITE_FAILURE,
    ADD_TO_FAVORITE_REQUEST, ADD_TO_FAVORITE_SUCCESS, GET_USER_FAILURE,
    GET_USER_REQUEST, GET_USER_SUCCESS, LOGIN_FAILURE,
    LOGIN_REQUEST, LOGIN_SUCCESS, LOGOUT, REGISTER_FAILURE,
    REGISTER_REQUEST,
    REGISTER_SUCCESS, REQUEST_RESET_PASSWORD_FAILURE, REQUEST_RESET_PASSWORD_REQUEST, REQUEST_RESET_PASSWORD_SUCCESS
} from "./ActionType";
import axios from "axios";
import {api, API_URL} from "../../config/api";
import {useDispatch} from "react-redux";
export const registerUser=(reqData)=>async(dispatch)=>{
    dispatch({type:REGISTER_REQUEST})
    try {
        const {data}=await axios.post(`${API_URL}/auth/signup`,reqData.userData)
        if(data.jwt)localStorage.setItem("jwt",data.jwt);
        if(data.role==="ROLE_RESTAURANT_OWNER"){
            reqData.navigate("/admin/restaurant")
        }
        else{
            reqData.navigate("/")
        }
        dispatch({type:REGISTER_SUCCESS,payload:data.jwt})
        console.log("register sucess",data)

    }   catch (error)
    {
        dispatch({type:REGISTER_FAILURE,payload:error})
        console.log("error",error)
    }
}
export const loginUser=(reqData)=>async(dispatch)=>{
    dispatch({type:LOGIN_REQUEST})
    try {
        const {data}=await axios.post(`${API_URL}/auth/signin`,reqData.userData)
        if(data.jwt)localStorage.setItem("jwt",data.jwt);
        if(data.role==="ROLE_RESTAURANT_OWNER"){
            reqData.navigate("/admin/restaurant")
        }
        else{
            reqData.navigate("/")
        }
        dispatch({type:LOGIN_SUCCESS,payload:data.jwt})
        console.log("login success",data)

    }   catch (error)
    {
        dispatch({type:LOGIN_FAILURE,payload:error})
        console.log("error",error)
    }
}
export const getUser = (jwt) => {
    return async (dispatch) => {
        dispatch({ type: GET_USER_REQUEST });
        try {
            const response = await api.get(`${API_URL}/api/user/profile`, {
                headers: {
                    Authorization: `Bearer ${jwt}`,
                },
            });
            const user = response.data;

            dispatch({ type: GET_USER_SUCCESS, payload: user });
            console.log("req User ", user);
        } catch (error) {
            const errorMessage = error.message;
            dispatch({ type: GET_USER_FAILURE, payload: errorMessage });
        }
    };
};

export const addToFavourites=({restaurantId,jwt})=>async(dispatch)=>{
    dispatch({type:ADD_TO_FAVORITE_REQUEST})
    try {
        const {data}=await api.put(`${API_URL}/api/restaurants/${restaurantId}/add-favourites`,{},{
            headers:{
                Authorization:`Bearer ${jwt}`
            }
        })
        dispatch({type:ADD_TO_FAVORITE_SUCCESS,payload:data})
        console.log("added to favourites",data)

    }   catch (error)
    {
        dispatch({type:ADD_TO_FAVORITE_FAILURE,payload:error})
        console.log("error",error)
    }
}
export const resetPasswordRequest = (email) => async (dispatch) => {
    dispatch({type:REQUEST_RESET_PASSWORD_REQUEST});
    try {
        const {data} = await axios.post(`${API_URL}/auth/reset-password-request?email=${email}`,{});

        console.log("reset password -: ", data);

        dispatch({type:REQUEST_RESET_PASSWORD_SUCCESS,payload:data});
    } catch (error) {
        console.log("error ",error)
        dispatch({type:REQUEST_RESET_PASSWORD_FAILURE,payload:error.message});
    }
};

export const resetPassword = (reqData) => async (dispatch) => {
    dispatch({type:REQUEST_RESET_PASSWORD_REQUEST});
    try {
        const {data} = await axios.post(`${API_URL}/auth/reset-password`,reqData.data);

        console.log("reset password -: ", data);

        reqData.navigate("/password-change-success")

        dispatch({type:REQUEST_RESET_PASSWORD_SUCCESS,payload:data});
    } catch (error) {
        console.log("error ",error)
        dispatch({type:REQUEST_RESET_PASSWORD_FAILURE,payload:error.message});
    }
};
export const logout=()=>async(dispatch)=>{
    try {
        localStorage.clear()
        dispatch({type:LOGOUT})
        console.log("logout success")

    }   catch (error)
    {
        console.log("error",error)
    }
}



