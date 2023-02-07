import React,{Fragment, useEffect,useState} from 'react';
import Carousel from 'react-material-ui-carousel'
import "./ProductDeatails.css";
import { useSelector,useDispatch } from 'react-redux';
import Loader from '../layout/Loader/Loader';
import { Rating } from "@material-ui/lab";
import { addItemsToCart } from "../../redux/actions/cartAction";
import ReactStars from "react-rating-stars-component"
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
} from "@material-ui/core";
import {
  clearErrors,
  getProductDetails,
  newReview,
} from "../../redux/actions/productActions";
import ReviewCard from "./ReviewCard.js";
import {useAlert} from "react-alert"

const ProductDetails = ({match}) => {
    const dispatch = useDispatch()
    const [quantity, setQuantity] = useState(1);
    const [open, setOpen] = useState(false);
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState("");
    const alert = useAlert()
    const {product,loading,error} = useSelector(state=>state.productDetails)

    useEffect(()=>{
      if(error){ 
      alert.error(error)
      dispatch(clearErrors())}

      dispatch(getProductDetails(match.params.id))
    },[dispatch,match.params.id,error,alert])

    if(product.images){
      console.log(product.images);
    }else{
      console.log('product not found');
    }
    const options = {
        size: window.innerWidth<600?10:15,
        readOnly: true,
        precision: 0.5,
        value:product.ratings
      };

    const decreaseQuantity = () => {
    if (1 >= quantity) return;

    const qty = quantity - 1;
    setQuantity(qty);
    };

    const increaseQuantity = () => {
    if (product.Stock <= quantity) return;

    const qty = quantity + 1;
    setQuantity(qty);
    };

    const addToCartHandler = () => {
    dispatch(addItemsToCart(match.params.id, quantity));
    alert.success("Item Added To Cart");
    };

    const submitReviewToggle = () => {
    open ? setOpen(false) : setOpen(true);
      };

    const reviewSubmitHandler = () => {
      const myForm = new FormData();
  
      myForm.set("rating", rating);
      myForm.set("comment", comment);
      myForm.set("productId", match.params.id);
  
      dispatch(newReview(myForm));
  
      setOpen(false);
    };


  return (
    <Fragment>
        {loading?(<Loader/>):
        (<Fragment>
        <div className="ProductDetails">
            <div>
                <Carousel>
                    {product.images && product.images.map((item,i)=>                    
                    <img src={item.url} alt={`${i} Slide`} key={item.url} className="CarouselImage"/>
                    )}
                </Carousel>
            </div>

            <div>
              <div className="detailsBlock-1">
                <h2>{product.name}</h2>
                <p>Product # {product._id}</p>
              </div>
              <div className="detailsBlock-2">
                {/* <Rating {...options} value={product.ratings}/> */}
                <ReactStars value={product.ratings} {...options} />

                <span className="detailsBlock-2-span">
                  {" "}
                  ({product.numOfReviews} Reviews)
                </span>
              </div>
              <div className="detailsBlock-3">
                <h1>{`₹${product.price}`}</h1>
                <div className="detailsBlock-3-1">
                  <div className="detailsBlock-3-1-1">
                    <button>-</button>
                    <input readOnly type="number"  />
                    <button>+</button>
                  </div>
                  <button>
                    Add to Cart
                  </button>
                </div>

                <p>
                  Status:
                  <b className={product.Stock < 1 ? "redColor" : "greenColor"}>
                    {product.Stock < 1 ? "OutOfStock" : "InStock"}
                  </b>
                </p>
              </div>

              <div className="detailsBlock-4">
                Description : <p>{product.description}</p>
              </div>

              <button  className="submitReview">
                Submit Review
              </button>
            </div>
        </div>
        
        <h3 className="reviewsHeading">REVIEWS</h3>

<Dialog
  aria-labelledby="simple-dialog-title"
  open={open}
  onClose={submitReviewToggle}
>
  <DialogTitle>Submit Review</DialogTitle>
  <DialogContent className="submitDialog">
    <Rating
      onChange={(e) => setRating(e.target.value)}
      value={rating}
      size="large"
    />

    <textarea
      className="submitDialogTextArea"
      cols="30"
      rows="5"
      value={comment}
      onChange={(e) => setComment(e.target.value)}
    ></textarea>
  </DialogContent>
  <DialogActions>
    <Button onClick={submitReviewToggle} color="secondary">
      Cancel
    </Button>
    <Button onClick={reviewSubmitHandler} color="primary">
      Submit
    </Button>
  </DialogActions>
</Dialog>

{product.reviews && product.reviews[0] ? (
  <div className="reviews">
    {product.reviews &&
      product.reviews.map((review) => (
        <ReviewCard key={review._id} review={review} />
      ))}
  </div>
) : (
  <p className="noReviews">No Reviews Yet</p>
)}
        </Fragment>
        )}


    </Fragment>
  )
}

export default ProductDetails