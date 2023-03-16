import { Rating } from "@mui/material";
import React from "react";
import profilePng from "../../image/Profile.png"
const ReviewCard = ({ review }) => {
  const options = {
    size: "large",
    readOnly: true,
    precision: 0.5,
    value: review.rating,
 
  };
  return (
    <div className="reviewCard">
      <img src={profilePng} alt="user" />
      <p>{review.name}</p>
      <Rating {...options} />
      <span className="reviewCardComment">{review.comment}</span>
    </div>
  );
};


export default ReviewCard;
