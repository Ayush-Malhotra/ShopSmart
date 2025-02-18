import React, { useState } from "react";
import { Search, X } from "lucide-react";
import {
  addFilters,
  getAllProducts,
  getProductByTitle,
} from "../../api/productApi";

function Filter({ categories, products, setProducts }) {
  const [categoryCnt, setCategoryCnt] = useState(0);
  const [search, setSearch] = useState("");
  const [onSearch, setOnSearch] = useState(false);

  const getProduct = async () => {
    let res = await getProductByTitle(search);
    console.log(res);
    setProducts(res.data);
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    await getProduct();
    setOnSearch(true);
  };

  const handleSearchCancel = async () => {
    try {
      let res = await getAllProducts();
      setProducts(res.data);
    } catch (err) {
      console.log(err);
    }
    setSearch("");
    setOnSearch(false);
  };

  const onChange = async (e) => {
    const checked = e.target.checked;
    const name = e.target.name;
    const id = e.target.id;
    if (checked) {
      let res = await addFilters(id);
      setCategoryCnt((prev) => prev + 1);
      if (categoryCnt === 0) {
        setProducts(res.data);
      } else {
        setProducts([...products, ...res.data]);
      }
    } else {
      setCategoryCnt((prev) => prev - 1);
      if (categoryCnt === 1) {
        let res = await getAllProducts();
        setProducts(res.data);
      } else {
        let tempProducts = products.filter((product) => {
          return product.category.name !== name;
        });
        setProducts(tempProducts);
      }
    }
  };

  return (
    <div className="left-side">
      <div>
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="search-input"
        />
        {!onSearch ? (
          <button onClick={handleSearch} className="search-btn">
            <Search size={13} />
          </button>
        ) : (
          <button onClick={handleSearchCancel} className="search-btn">
            <X size={13} />
          </button>
        )}
      </div>
      <div>Filters</div>
      <div>Category</div>
      {categories?.length > 0 &&
        categories.map((category) => (
          <div key={category.id}>
            <input
              type="checkbox"
              id={category.id}
              name={category.name}
              onChange={onChange}
              value={category.name}
            />
            <label htmlFor={category.id}> {category.name}</label>
          </div>
        ))}
    </div>
  );
}

export default Filter;
