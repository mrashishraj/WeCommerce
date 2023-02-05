import { 
    ALL_PRODUCT_SUCCESS, 
    ALL_PRODUCT_FAILED, 
    ALL_PRODUCT_REQUEST,
    PRODUCT_DETAILS_REQUEST,
    PRODUCT_DETAILS_SUCCESS,
    PRODUCT_DETAILS_FAILED,
    CLEAR_ERRORS } from "../constants/productConstants";


export const productReducer = (state={products:[]},action)=>{
        switch (action.type) {
            case ALL_PRODUCT_REQUEST:
                return{
                    loading:true,
                    product:[]
                }
                case ALL_PRODUCT_SUCCESS:
                    return{
                        loading:false,
                        products:action.payload.products,
                        productCount:action.payload.productCount
                    }
            case ALL_PRODUCT_FAILED:
                return{
                    loading:false,
                    error:action.payload
                }
            case CLEAR_ERRORS:
                return{
                    ...state,
                    error:null
                }
        
            default:
                return state;
        }

}

export const productDetailsReducer = (state={products:{}},action)=>{
    switch (action.type) {
        case PRODUCT_DETAILS_REQUEST:
            return{
                loading:true,
                ...state
            }
            case PRODUCT_DETAILS_SUCCESS:
                return{
                    loading:false,
                    product:action.payload.product,
                }
        case PRODUCT_DETAILS_FAILED:
            return{
                loading:false,
                error:action.payload
            }
        case CLEAR_ERRORS:
            return{
                ...state,
                error:null
            }
    
        default:
            return state;
    }

}
