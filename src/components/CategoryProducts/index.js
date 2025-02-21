import React, { useState, useEffect } from "react";
import { productByCategory } from "../../api/productApi";
import ProductCard from "../ProductCard";
function CategoryProduct({ category }) {
  const [products, setProducts] = useState([]);
  const getCategoryProducts = async () => {
    const res = await productByCategory(category.id);
    setProducts(res.data);
  };
  useEffect(() => {
    getCategoryProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <div className="product-title2" style={{ paddingLeft: 65 }}>
        {category.name}
      </div>
      <div className="product-list2">
        {products?.length > 0 &&
          products.map((product) => {
            return <ProductCard key={product.id} product={product} />;
          })}
      </div>
    </div>
  );
}

export default CategoryProduct;
