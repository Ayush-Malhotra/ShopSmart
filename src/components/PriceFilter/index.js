import React, { useState } from "react";

function PriceFiter() {
  const [price, setPrice] = useState({
    minPrice: 0,
    maxPrice: 500,
  });

  const onChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setPrice({ ...price, [name]: value });
  };

  return (
    <div>
      <div>Price Range</div>
      <input
        type="number"
        name="minPrice"
        className="price-input"
        value={price.minPrice}
        onChange={onChange}
      />
      <input
        type="number"
        name="maxPrice"
        className="price-input"
        value={price.maxPrice}
        onChange={onChange}
      />
      <button onClick={handleClick}>Apply PriceFiter</button>
    </div>
  );
}

export default PriceFiter;
