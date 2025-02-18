import axios from "axios";

const api = axios.create({
  baseURL: "https://api.escuelajs.co/api/v1",
});

export const getAllProducts = () => {
  return api.get("/products");
};

export const getAllCategories = () => {
  return api.get("/categories");
};

export const addFilters = (id) => {
  return api.get(`/products/?categoryId=${id}`);
};

export const getProductByTitle = (title) => {
  return api.get(`/products/?title=${title}`);
};
