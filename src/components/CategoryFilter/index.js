import React from "react";
import { addPriceFilters } from "../../api/productApi";
function CategoryFilter({
  categories,
  filterItems,
  setFilterItems,
  setProducts,
  setLoader,
}) {
  const onChange = async (e) => {
    const id = e.target.id;
    setFilterItems({ ...filterItems, categoryId: id });
    setLoader(true);
    let res = await addPriceFilters({ ...filterItems, categoryId: id });
    setLoader(false);
    setProducts(res.data);
    console.log(res.data, id);
  };

  return (
    <div>
      <div>Category</div>
      {categories?.length > 0 &&
        categories.map((category) => (
          <div key={category.id}>
            <input
              type="radio"
              id={category.id}
              name="category"
              onChange={onChange}
              value={category.name}
              className="all-categories"
            />
            <label htmlFor={category.id}> {category.name}</label>
          </div>
        ))}
    </div>
  );
}

export default CategoryFilter;
