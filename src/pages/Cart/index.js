import React, { useEffect, useState } from "react";
import "./cart.styles.css";
import { productDetail } from "../../api/productApi";
import ProductCard from "../../components/ProductCard";
function Cart() {
  const [data2, setData] = useState([]);
  const [products, setProducts] = useState([]);

  const getProductsById = async () => {
    let resArray = await Promise.all(
      data2.map(async (ids) => {
        let res = await productDetail(ids);
        return res.data;
      })
    );
    console.log(resArray);
    setProducts(resArray);
  };

  useEffect(() => {
    let response = JSON.parse(localStorage.getItem("cartItems"));
    console.log(response);
    setData(response);
  }, []);

  useEffect(() => {
    getProductsById();
  }, [data2]);
  return (
    <div className="cart-page">
      <div>Cart</div>
      <div className="product-list2">
        {products?.length > 0 &&
          products.map((product) => {
            return <ProductCard key={product.id} product={product} />;
          })}
      </div>
    </div>
  );
}

export default Cart;
