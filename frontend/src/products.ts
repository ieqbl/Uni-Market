import api from "./services/api";

export const getProducts = async () => {
  try {
    const res = await api.get("/products");
    return res.data;
  } catch (err) {
    console.error("Failed to fetch products", err);
    return [];
  }
};
