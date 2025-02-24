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

export const createUser = (userdetails) => {
  try {
    console.log(userdetails);
    return api.post("/users/", userdetails, {
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
    });
  } catch (err) {
    console.log(err);
  }
};

export const getTokens = (userLogin) => {
  try {
    const res = api.post("/auth/login", userLogin);
    return res;
  } catch (err) {
    console.log(err);
  }
};

export const includeAuth = (tokens) => {
  api.interceptors.request.use(
    async (config) => {
      const token = tokens.access_token;
      if (token) {
        console.log("hello");
        config.headers["Authorization"] = ` bearer ${token}`;
        console.log(config.headers["Authorization"]);
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
};
