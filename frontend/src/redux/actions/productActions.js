import axios from "axios"
import { 
    ALL_PRODUCT_SUCCESS, 
    ALL_PRODUCT_FAILED, 
    ALL_PRODUCT_REQUEST,
    PRODUCT_DETAILS_REQUEST,
    PRODUCT_DETAILS_SUCCESS,
    PRODUCT_DETAILS_FAILED,
    CLEAR_ERRORS } from "../constants/productConstants";

// Getting all product list
export const getProduct = () =>  async (dispatch)=>{
    try {
        dispatch({type:ALL_PRODUCT_REQUEST})

        const {data} = await axios.get("/api/v1/products")
        dispatch({
            type:ALL_PRODUCT_SUCCESS,
            payload:data
        })
        
    } catch (error) {
        dispatch({
            type:ALL_PRODUCT_FAILED,
            payload:error.response.data.message
        })
    }
}

// GET PRODUCT DETAILS
export const getProductDetails = (id) =>  async (dispatch)=>{
    try {
        dispatch({type:PRODUCT_DETAILS_REQUEST})

        const {data} = await axios.get(`/api/v1/products/${id}`)
        dispatch({
            type:PRODUCT_DETAILS_SUCCESS,
            payload:data
        })
        
    } catch (error) {
        dispatch({
            type:PRODUCT_DETAILS_FAILED,
            payload:error.response.data.message
        })
    }
}

// Clearing Errors
export const clearErrors = () =>async (dispatch)=>{
    dispatch({type:CLEAR_ERRORS})
}