import React, { Fragment, useEffect, useState } from "react";
import "./Products.css";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, getProduct } from "../../redux/actions/productActions";
import Loader from "../layout/Loader/Loader";
import ProductCard from "../Home/ProductCard";
import Pagination from "react-js-pagination"

const Products = ({match}) => {
    const dispatch = useDispatch()
    const {products,error,loading} = useSelector(item=>item.products)

    const keyword = match.params.keyword
    useEffect(()=>{
        dispatch(getProduct(keyword))
    },[dispatch,keyword])


  return (
    <Fragment>
        {loading?<Loader/>:
        (<Fragment>
            <h2 className="productsHeading">Products</h2>
            <div className="products">
            {products && products.map((item,i)=><ProductCard key={i} product={item}/>)}
            </div>
            <div className="paginationBox">
                <Pagination
                activePage={currentPage}
                itemsCountPerPage={resultPerPage}
                totalItemsCount={productsCount}
                onChange={setCurrentPageNo}
                nextPageText="next"
                prevPageText="prev"
                firstPageText="1st"
                lastPageText="last"
                itemClass="page-item"
                linkClass="page-link"
                activeClass="pageItemActive"
                activeLinkClass="pageLinkActive"
                />
            </div>
        </Fragment>)}

    </Fragment>
  )
}

export default Products