import React from 'react'
import { Link } from 'react-router-dom'
import ReactStars from "react-rating-stars-component"

const options = {
    edit:false,
    color:"rgba(20,20,20,0.1)",
    activeColor:"tomato",
    size:window.innerWidth<600?20:25,
    isHalf:true
}

const ProductCard = ({product}) => {
  return (
    <div>
        <Link className='productCard' to={`/product/${product._id}`}>
            <img src={product.images[0].url} alt={product.name} />
            <p>{product.name}</p>
            <div>
                <ReactStars value={product.ratings} {...options} />
                    <span>{product.numOfReviews} Reviews</span>
            </div>
            <span>₹ {product.price}</span>
        </Link>
    </div>
  )
}

export default ProductCard