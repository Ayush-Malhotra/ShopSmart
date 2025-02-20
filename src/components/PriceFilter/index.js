import React from "react";
import { addPriceFilters } from "../../api/productApi";
import { Slider } from "antd";
function PriceFilter({ filterItems, setFilterItems, setProducts, setLoader }) {
  const onChange = async (e) => {
    try {
      console.log(e);
      const value = e;

      setFilterItems({
        ...filterItems,
        min_price: value[0],
        max_price: value[1],
      });

      setLoader(true);
      const res = await addPriceFilters(filterItems);
      setProducts(res.data);
      setLoader(false);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <div>Price Range</div>
      <Slider
        included={true}
        range="true"
        defaultValue={[100, 300]}
        value={[filterItems.min_price, filterItems.max_price]}
        min={0}
        max={1000}
        onChange={onChange}
      />
      {/* <button onClick={handleClick}>Apply PriceFiter</button> */}
      <div>
        Rs. {filterItems.min_price} - Rs. {filterItems.max_price}
      </div>
    </div>
  );
}

export default PriceFilter;
