import React, { useEffect, useState } from "react";
import "./home.styles.css";
import { getAllCategories, getAllProducts } from "../../api/productApi";
import ProductCard from "../../components/ProductCard";
import Filter from "../../components/CategoryFilter";

function Home() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState();
  const [page, setPage] = useState(1);
  const allProducts = async () => {
    try {
      const res = await getAllProducts();
      console.log(res);
      setProducts(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const allCategories = async () => {
    try {
      const res = await getAllCategories();
      console.log(res.data);
      setCategories(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    allCategories();
    allProducts();
  }, []);

  return (
    <section className="home-page">
      <Filter
        categories={categories}
        products={products}
        setProducts={setProducts}
      />
      <div className="product-list">
        {products?.length > 0 &&
          products.map((product, index) => {
            if (
              product.images[0].includes("https://i.imgur.com") &&
              index >= (page - 1) * 12 &&
              index < page * 12
            ) {
              return <ProductCard key={product.id} product={product} />;
            }
            return "";
          })}
      </div>
      <button
        disabled={page === 1 ? true : false}
        onClick={() => setPage(page - 1)}
      >
        Prev
      </button>
      Page {page} of{" "}
      {Math.floor(products.length / 12) + (products.length % 12 !== 0)}
      <button onClick={() => setPage(page + 1)}>Next</button>
    </section>
  );
}

export default Home;
