export type Product = {
  id: number;
  name: string;
  price: number;
  image?: string;
  description?: string;
};

export const addToCart = (product: Product) => {
  const cart = JSON.parse(localStorage.getItem("cart") || "[]");
  if (!cart.find((p: Product) => p.id === product.id)) {
    cart.push(product);
    localStorage.setItem("cart", JSON.stringify(cart));
  }
};

export const addToWishlist = (product: Product) => {
  const wishlist = JSON.parse(localStorage.getItem("wishlist") || "[]");
  if (!wishlist.find((p: Product) => p.id === product.id)) {
    wishlist.push(product);
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
  }
};
