import React, { useEffect, useState } from "react";
import "./product.styles.css";
import { LoadingOutlined, ShoppingOutlined } from "@ant-design/icons";
import { useParams } from "react-router-dom";
import { productByCategory, productDetail } from "../../api/productApi";
import { Button, Input } from "antd";
import ProductCard from "../../components/ProductCard";
function Product() {
  const [productDetails, setProductDetails] = useState({});
  const [loader, setLoader] = useState(true);
  const { id } = useParams();
  const [products, setProducts] = useState([]);
  const [mainImage, setMainImage] = useState();
  const [addedToCart, setAddedToCart] = useState(false);
  const [quantity, setQuantity] = useState(0);
  const [st, setSt] = useState("");
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
    if (st !== "") {
      st.target.style.borderWidth = "0px";
    }
    const id2 = e.target.id;
    console.log(e.target.style);
    e.target.style.borderWidth = "3px";
    setSt(e);
    console.log(e.target, id2, "hello");
    setMainImage(productDetails.images[id2]);
  };

  const handleCart = () => {
    let storageData = JSON.parse(localStorage.getItem("cartItems"));

    if (storageData) {
      localStorage.setItem("cartItems", JSON.stringify([...storageData, id]));
    } else {
      localStorage.setItem("cartItems", JSON.stringify([id]));
    }
    setAddedToCart(true);
    setQuantity(1);
    console.log("added to cart");
  };

  const handleQuantity = () => {
    setQuantity(quantity - 1);
    if (quantity === 1) {
      let storageData = JSON.parse(localStorage.getItem("cartItems"));
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
      res.forEach((ids) => {
        if (ids === id) {
          setAddedToCart(true);
          setQuantity(1);
        }
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  useEffect(() => {
    getCategoryProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
            <div>
              <span className="product-title2">Category : </span>
              {productDetails.category.name}
            </div>
            <div>
              <div className="product-title2">Description</div>
              <div>{productDetails.description}</div>
            </div>
            <div className="prices">
              <div className="dis-price">Rs. {productDetails.price} </div>
              <div className="actual-price">
                Rs. {productDetails.price + productDetails.price / 4}
              </div>
            </div>
            <div className="imp-buttons">
              {!addedToCart ? (
                <Button
                  type="primary"
                  onClick={handleCart}
                  size="large"
                  style={{ width: 300 }}
                >
                  Add to Cart
                  <ShoppingOutlined />
                </Button>
              ) : (
                <div>
                  <div className="product-title2">Specify Quantity</div>
                  <Button onClick={handleQuantity} size="large">
                    -
                  </Button>
                  <Input
                    type="number"
                    value={quantity}
                    size="large"
                    min={0}
                    max={5}
                    onChange={(e) => {
                      setQuantity(e.target.value);
                      handleQuantity();
                    }}
                    style={{
                      width: 200,
                      paddingLeft: 90,
                      marginLeft: 10,
                      marginRight: 10,
                    }}
                  />
                  <Button
                    onClick={() => {
                      if (quantity < 10) setQuantity(quantity + 1);
                    }}
                    size="large"
                  >
                    +
                  </Button>
                </div>
              )}
              <Button type="primary" size="large" style={{ width: 300 }}>
                Buy Now
                <ShoppingOutlined />
              </Button>
            </div>
            <div className="product-title2">View Similar Products</div>
            <div className="product-list2">
              {products?.length > 0 &&
                products.map((product) => {
                  if (
                    product.images[0].includes("https://i.imgur.com") &&
                    product.id !== id
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
