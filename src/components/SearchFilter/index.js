import React, { useState, useEffect } from "react";
import { addPriceFilters } from "../../api/productApi";

import Input from "antd/es/input/Input";
function SearchFilter({ filterItems, setFilterItems, setProducts, setLoader }) {
  const f1 = async () => {
    try {
      console.log(filterItems);
      setLoader(true);
      let res = await addPriceFilters({ ...filterItems });
      setLoader(false);
      setProducts((prevProducts) => {
        if (JSON.stringify(prevProducts) !== JSON.stringify(res.data)) {
          return res.data;
        }
        return prevProducts;
      });
    } catch (err) {
      setLoader(false);
      console.log(err);
    }
  };

  function useDebounce(cb, delay) {
    const [debounceValue, setDebounceValue] = useState(cb);
    useEffect(() => {
      const handler = setTimeout(() => {
        setDebounceValue(cb);
      }, delay);

      return () => {
        clearTimeout(handler);
      };
    }, [cb, delay]);
    return debounceValue;
  }
  const debounceValue = useDebounce(filterItems.title, 1000);

  useEffect(() => {
    console.log("Debounced:", filterItems.title);
    f1();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debounceValue]);

  return (
    <div className="search">
      <Input
        type="search"
        enterButton="true"
        size="small"
        placeholder="search your product"
        onChange={async (e) => {
          setFilterItems({ ...filterItems, title: e.target.value });
        }}
      />
    </div>
  );
}

export default SearchFilter;
