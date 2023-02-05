import React,{Fragment, useEffect} from 'react'
import Carousel from "react-material-ui-carousel"
import "./ProductDeatails.css"
import { getProductDetails } from '../../redux/actions/productActions'
import { useSelector,useDispatch } from 'react-redux'

const ProductDetails = ({match}) => {
    const Dispatch = useDispatch()

    useEffect(()=>{
        Dispatch(getProductDetails(match.params.id))
    },[Dispatch,match.params.id])

    const {product,loading,error} = useSelector(state=>state.productDetails)
    console.log(product);
  return (
    <Fragment>
        <div className="ProductDetails">
            <Carousel>
            {/* {product.images && product.images.map((item,i)=>{
                <img src={item.url} alt={`${i} Slide`} key={item.url} />
            })} */}
            </Carousel>
        </div>
    </Fragment>
  )
}

export default ProductDetails