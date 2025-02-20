import axios from "axios";

const api = axios.create({
  baseURL: "https://api.escuelajs.co/api/v1",
});

export const getAllProducts = () => {
  try {
    return api.get("/products");
  } catch (err) {
    console.log(err);
  }
};

export const getAllCategories = () => {
  try {
    return api.get("/categories");
  } catch (err) {
    console.log(err);
  }
};

export const addFilters = (id) => {
  try {
    return api.get(`/products/?categoryId=${id}`);
  } catch (err) {
    console.log(err);
  }
};

export const addPriceFilters = (filterItems) => {
  try {
    const { title, categoryId, min_price, max_price } = filterItems;
    return api.get(
      `/products/?title=${title}&price_min=${min_price}&price_max=${max_price}&categoryId=${categoryId}`
    );
  } catch (err) {
    console.log(err);
  }
};

export const getProductByTitle = (title) => {
  try {
    return api.get(`/products/?title=${title}`);
  } catch (err) {
    console.log(err);
  }
};

export const productDetail = (id) => {
  try {
    return api.get(`/products/${id}`);
  } catch (err) {
    console.log(err);
  }
};

export const productByCategory = (id) => {
  try {
    return api.get(`/products/?categoryId=${id}&offset=1&limit=4`);
  } catch (err) {
    console.log(err);
  }
};
