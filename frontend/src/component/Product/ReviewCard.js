import React from 'react'
import ReactStars from 'react-rating-stars-component';
import profilePng from "../../images/Profile.png"

const ReviewCard = ({review}) => {
    const options = {
        size: window.innerWidth<600?10:15,
        readOnly: true,
        precision: 0.5,
        value:review.rating
      };

  return (
    <div className='reviewCard'>
        <img src={profilePng} alt="" />
        <p>{review.name}</p>
        <ReactStars {...options} />
        <span>{review.comment}</span>
    </div>
  )
}

export default ReviewCard