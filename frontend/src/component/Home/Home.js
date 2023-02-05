import React,{Fragment,useEffect} from 'react'
import { CgMouse } from 'react-icons/all'
import MetaData from '../layout/MetaData'
import "./Home.css"
import Product from "./Product.js"
import { useSelector,useDispatch } from 'react-redux';
import { getProduct } from '../../redux/actions/productActions'
import Loader from "../layout/Loader/Loader"
import {useAlert} from "react-alert"

const Home = () => {
    const alert = useAlert()
    const dispatch = useDispatch()
    const {loading,error, products, productCounts} = useSelector(state=>state.products)

    useEffect(()=>{
        if(error){
            return alert.error(error)
        }
            dispatch(getProduct())
        },[dispatch,error,alert])

  return (
   <Fragment>
    {loading? <Loader/> :
     <Fragment>
     <MetaData title="WeCommerce"/>  
     <div className="banner">
         <p>Welcome to WECOMMERCE</p>
         <h1>FIND AMAZING PRODUCT BELOW</h1>

         <a href="#container">
             <button>Scroll <CgMouse/></button>
         </a>
     </div>
     <h2 className="homeHeading">Featured Products</h2>
     <div className="container" id="container">
         {products && products.map(product=>(<Product product={product} key={product.name}/>))}
     </div>
 </Fragment>}
   </Fragment>
  )
}

export default Home