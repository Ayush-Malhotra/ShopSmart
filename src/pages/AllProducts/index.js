import React, { useEffect, useState } from "react";
import { Button } from "antd";
import "./allproducts.styles.css";
import { getAllCategories, getAllProducts } from "../../api/productApi";
import ProductCard from "../../components/ProductCard";
import CategoryFilter from "../../components/CategoryFilter";
import PriceFilter from "../../components/PriceFilter";
import SearchFilter from "../../components/SearchFilter";
import { LoadingOutlined } from "@ant-design/icons";
import { toast } from "react-toastify";
function AllProducts() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState();
  const [loader, setLoader] = useState(true);
  const [page, setPage] = useState(1);
  const [filterItems, setFilterItems] = useState({
    title: ``,
    categoryId: ``,
    min_price: 0,
    max_price: 1000,
  });

  const allProducts = async () => {
    try {
      const res = await getAllProducts();
      console.log(res);

      setProducts(res.data);
    } catch (err) {
      console.log(err);
    }
    setLoader(false);
  };

  const allCategories = async () => {
    try {
      const res = await getAllCategories();
      console.log(res.data);
      setCategories(res.data);
    } catch (err) {
      toast.error("Network Error Occured! , Please Check Network");
      console.log(err);
    }
  };

  useEffect(() => {
    allCategories();
    allProducts();
  }, []);

  useEffect(() => {
    setPage(1);
  }, [filterItems]);
  return (
    <>
      <section className="home-page">
        <div className="left-side">
          <div className="product-title2">FILTERS</div>
          <SearchFilter
            filterItems={filterItems}
            setFilterItems={setFilterItems}
            setProducts={setProducts}
            setLoader={setLoader}
          />
          <CategoryFilter
            categories={categories}
            filterItems={filterItems}
            setFilterItems={setFilterItems}
            setProducts={setProducts}
            setLoader={setLoader}
          />
          <PriceFilter
            filterItems={filterItems}
            setFilterItems={setFilterItems}
            setProducts={setProducts}
            setLoader={setLoader}
          />
        </div>
        <div className="product-list">
          {loader ? (
            <div className="loader">
              <LoadingOutlined
                spin="true"
                twoToneColor="[#414ba6]"
                style={{ fontSize: "40px", color: "#08c" }}
              />
            </div>
          ) : products?.length > 0 ? (
            products.map((product, index) => {
              if (
                product.images[0].includes("https://i.imgur.com") &&
                index >= (page - 1) * 12 &&
                index < page * 12
              ) {
                return <ProductCard key={product.id} product={product} />;
              }
              return "";
            })
          ) : (
            <div className="no-product">No Products Available</div>
          )}
        </div>
      </section>
      <Button
        type="primary"
        disabled={page === 1 ? true : false}
        onClick={() => setPage(page - 1)}
        style={{ margin: 10 }}
      >
        Prev
      </Button>
      Page {page} of{" "}
      {Math.floor(products.length / 12) + (products.length % 12 !== 0)}
      <Button
        type="primary"
        onClick={() => setPage(page + 1)}
        disabled={
          page ===
            Math.floor(products.length / 12) + (products.length % 12 !== 0) ||
          products.length === 0
            ? true
            : false
        }
        style={{ margin: 10 }}
      >
        Next
      </Button>
    </>
  );
}

export default AllProducts;
