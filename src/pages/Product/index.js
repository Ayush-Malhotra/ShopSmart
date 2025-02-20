import React, { useEffect, useState } from "react";
import "./product.styles.css";
import { LoadingOutlined, ShoppingOutlined } from "@ant-design/icons";
import { useParams } from "react-router-dom";
import { productByCategory, productDetail } from "../../api/productApi";
import { Button } from "antd";
import ProductCard from "../../components/ProductCard";
function Product() {
  const [productDetails, setProductDetails] = useState({});
  const [loader, setLoader] = useState(true);
  const { id } = useParams();
  const [products, setProducts] = useState([]);
  const [mainImage, setMainImage] = useState();
  const [addedToCart, setAddedToCart] = useState(false);
  const [quantity, setQuantity] = useState(1);
  console.log(id);
  const getProductDetail = async () => {
    try {
      setLoader(true);
      const res = await productDetail(id);
      console.log(res);
      setMainImage(res.data.images[0]);
      setLoader(false);
      setProductDetails(res.data);
    } catch (err) {
      console.log("err", err);
    }
  };
  const getCategoryProducts = async () => {
    try {
      setLoader(true);
      let res2 = await productByCategory(productDetails.category.id);
      console.log(res2.data);
      setProducts(res2.data);
      setLoader(false);
    } catch (err) {
      console.log("err", err);
    }
  };
  const handleClick = (e) => {
    const id2 = e.target.id;
    console.log(e.target, id2, "hello");
    setMainImage(productDetails.images[id2]);
  };

  const handleCart = () => {
    let storageData = JSON.parse(localStorage.getItem("cartItems"));
    if (!addedToCart) {
      if (storageData) {
        localStorage.setItem("cartItems", JSON.stringify([...storageData, id]));
      } else {
        localStorage.setItem("cartItems", JSON.stringify([id]));
      }
      setAddedToCart(true);
      console.log("added to cart");
    } else {
      storageData = storageData.filter((data) => {
        return data !== id;
      });
      localStorage.setItem("cartItems", JSON.stringify(storageData));
      setAddedToCart(false);
      console.log("removed from cart");
    }
  };
  useEffect(() => {
    getProductDetail();
    let res = JSON.parse(localStorage.getItem("cartItems"));
    setAddedToCart(false);
    if (res?.length > 0) {
      res.map((ids) => {
        if (ids === id) {
          setAddedToCart(true);
        }
      });
    }
  }, [id]);

  useEffect(() => {
    getCategoryProducts();
  }, [productDetails]);
  return (
    <div className="product-page-main">
      {loader ? (
        <div className="loader">
          <LoadingOutlined
            spin="true"
            twoToneColor="[#414ba6]"
            style={{ fontSize: "40px", color: "#08c" }}
          />
        </div>
      ) : (
        <div className="product-page">
          <div className="all-images">
            <div className="s2">
              {productDetails?.images?.length > 0 &&
                productDetails.images.map((image, index) => {
                  let imageUrl = image.toString().replaceAll("[", "");
                  imageUrl.replaceAll("]", "");

                  return (
                    <div onClick={handleClick} className="product-image2">
                      <img
                        src={imageUrl}
                        alt="not-found"
                        id={index}
                        className="p-image"
                      />
                    </div>
                  );
                })}
            </div>
            <div>
              <img src={mainImage} alt="mainImage" className="main-image" />
            </div>
          </div>
          <div className="details">
            <div className="details-title">{productDetails.title}</div>
            <div>Category : {productDetails.category.name}</div>
            <div>
              <div>Desciption</div>
              <div>{productDetails.description}</div>
            </div>
            <div className="prices">
              <div className="dis-price">Rs. {productDetails.price} </div>
              <div className="actual-price">
                Rs. {productDetails.price + productDetails.price / 4}
              </div>
            </div>
            <Button type="primary" onClick={handleCart}>
              {!addedToCart ? "Add to Cart" : "Remove from Cart"}
              <ShoppingOutlined />
            </Button>
            <div>View Similar Products</div>
            <div className="product-list2">
              {products?.length > 0 &&
                products.map((product) => {
                  if (
                    product.images[0].includes("https://i.imgur.com") &&
                    product.id != id
                  ) {
                    console.log("hi");
                    return <ProductCard key={product.id} product={product} />;
                  }
                  return "";
                })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Product;
