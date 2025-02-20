import React from "react";
import "./productcard.styles.css";
import { Link } from "react-router-dom";
function ProductCard({ product }) {
  const { id, title, images, price } = product;
  let imageUrl = images[0].toString().replaceAll(`"`, "");
  imageUrl = imageUrl.replaceAll("[", "");
  imageUrl = imageUrl.replaceAll("]", "");
  return (
    // product-list

    <div className="product-card">
      <Link to={`/${id}`}>
        <div className="product-image">
          <img src={imageUrl} alt="product-image" width={100} height={100} />
        </div>
        <div className="product-title">{title}</div>
        <div className="price">
          <span>Rs.{price} </span>
          <span className="actual-price">
            Rs.{price + Math.floor(price / 4)}
          </span>
        </div>
      </Link>
    </div>
  );
}

export default ProductCard;
