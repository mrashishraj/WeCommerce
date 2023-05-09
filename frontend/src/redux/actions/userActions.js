import { 
  LOGIN_REQUEST,
  LOGIN_FAILED,
  LOGIN_SUCCESS,
  CLEAR_ERRORS, 
  REGISTER_USER_REQUEST, 
  REGISTER_USER_FAILED, 
  REGISTER_USER_SUCCESS,
  LOAD_USER_REQUEST,
  LOAD_USER_SUCCESS,
  LOAD_USER_FAILED } from "../constants/userConstant"
import axios from "axios"


// ====================USER LOGIN ACTION====================
export const login = (email,password) => async (dispatch)=>{
    try {
        dispatch({type:LOGIN_REQUEST})

        const config = {headers:{"Content-Type":"application/json"}}

        const {data} = await axios.post(`/api/v1/login`,{email,password},config)

        dispatch({type:LOGIN_SUCCESS, payload:data.user})
        
    } catch (error) {
        dispatch({type:LOGIN_FAILED,payload:error.response.data.message})
    }
}

// ====================USER REGISTER ACTION====================

export const register = (userData) => async (dispatch) => {
    try {
      dispatch({ type: REGISTER_USER_REQUEST });
  
      const config = { headers: { "Content-Type": "multipart/form-data" } };
  
      const { data } = await axios.post(`/api/v1/register`, userData, config);
  
      dispatch({ type: REGISTER_USER_SUCCESS, payload: data.user });
    } catch (error) { 
      dispatch({
        type: REGISTER_USER_FAILED,
        payload: error.response.data.message,
      });
    }
  };

// ====================LOAD USER ACTION====================

export const loadUser = () => async (dispatch) => {
  try {
    dispatch({ type: LOAD_USER_REQUEST });


    const { data } = await axios.get(`/api/v1/me`);

    dispatch({ type: LOAD_USER_SUCCESS, payload: data.user });
  } catch (error) { 
    dispatch({
      type: LOAD_USER_FAILED,
      payload: error.response.data.message,
    });
  }
};

// ===================== CLEAR ERROR ========================
export const clearErrors = () =>(dispatch) =>{
    dispatch({type:CLEAR_ERRORS})
}