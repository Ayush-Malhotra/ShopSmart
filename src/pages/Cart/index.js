import React, { useEffect, useState } from "react";
import "./cart.styles.css";
import { productDetail } from "../../api/productApi";
import ProductCard from "../../components/ProductCard";
function Cart() {
  const [data2, setData] = useState([]);
  const [products, setProducts] = useState([]);

  // const getProductData = () => {};
  const getProductsById = async () => {
    if (data2) {
      let resArray = await Promise.all(
        data2.map(async (ids) => {
          try {
            let res = await productDetail(ids);
            return res.data;
          } catch (err) {
            console.log(err);
          }
        })
      );
      console.log(resArray);
      setProducts(resArray);
    }
  };

  useEffect(() => {
    let response = JSON.parse(localStorage.getItem("cartItems"));
    console.log(response);
    setData(response);
  }, []);

  useEffect(() => {
    getProductsById();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data2]);

  return (
    <div className="cart-page">
      <div className="cart-title">YOUR CART PRODUCTS</div>
      <div className="product-list2">
        {products?.length > 0 ? (
          products.map((product) => {
            if (product?.id)
              return <ProductCard key={product.id} product={product} />;
            return <></>;
          })
        ) : (
          <div className="no-product">Your Cart is Empty</div>
        )}
      </div>
    </div>
  );
}

export default Cart;
