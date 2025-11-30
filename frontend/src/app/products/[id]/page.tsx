"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import api from "@/services/api";
import { AxiosError } from "axios";
import { addToCart, addToWishlist, Product as ProductType } from "@/utils/storage";

export default function ProductPage() {
  const { id } = useParams();
  const [product, setProduct] = useState<ProductType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    setLoading(true);
    setError(null);

    api
      .get<ProductType>(`/products/${id}`)
      .then((res) => {
        setProduct(res.data);
      })
      .catch((err: AxiosError) => {
        console.error("Failed to fetch product:", err.message);
        setError(err.message);
      })
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <p className="p-8">Loading...</p>;
  if (error) return <p className="p-8 text-red-600">Error: {error}</p>;
  if (!product) return <p className="p-8">Product not found</p>;

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black p-8 flex flex-col items-center">
      {product.image && (
        <img
          src={product.image}
          alt={product.name}
          className="w-full max-w-md h-64 object-cover rounded mb-6"
        />
      )}
      <h1 className="text-3xl font-bold mb-4 text-black dark:text-zinc-50">
        {product.name}
      </h1>
      <p className="text-gray-700 dark:text-gray-300 mb-4">
        {product.description}
      </p>
      <p className="text-xl font-bold text-black dark:text-zinc-50 mb-6">
        {product.price} TOMAN
      </p>
      <div className="flex gap-4">
        <button
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
          onClick={() => product && addToCart(product)}
        >
          Add to Cart
        </button>
        <button
          className="bg-gray-600 text-white px-6 py-2 rounded hover:bg-gray-700"
          onClick={() => product && addToWishlist(product)}
        >
          Add to Wishlist
        </button>
      </div>
    </div>
  );
}
