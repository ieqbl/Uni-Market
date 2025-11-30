"use client";

import { useEffect, useState } from "react";
import { Product } from "@/utils/storage";

export default function CartPage() {
  const [cart, setCart] = useState<Product[]>([]);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart") || "[]");
    setCart(storedCart);
  }, []);

  const removeFromCart = (id: number) => {
    const updated = cart.filter((p) => p.id !== id);
    setCart(updated);
    localStorage.setItem("cart", JSON.stringify(updated));
  };

  const totalPrice = cart.reduce((sum, p) => sum + p.price, 0);

  if (cart.length === 0) return <p className="p-8">Your cart is empty</p>;

  return (
    <div className="min-h-screen p-8 bg-zinc-50 dark:bg-black">
      <h1 className="text-3xl font-bold mb-6 text-black dark:text-zinc-50">Cart</h1>
      <div className="flex flex-col gap-4">
        {cart.map((product) => (
          <div
            key={product.id}
            className="flex justify-between items-center p-4 bg-white dark:bg-zinc-900 rounded shadow"
          >
            <div className="flex items-center gap-4">
              {product.image && (
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-20 h-20 object-cover rounded"
                />
              )}
              <div>
                <h2 className="font-bold text-black dark:text-zinc-50">{product.name}</h2>
                <p className="text-gray-700 dark:text-gray-300">{product.price} TOMAN</p>
              </div>
            </div>
            <button
              className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
              onClick={() => removeFromCart(product.id)}
            >
              Remove
            </button>
          </div>
        ))}
      </div>
      <p className="mt-6 text-xl font-bold text-black dark:text-zinc-50">
        Total: {totalPrice} TOMAN
      </p>
    </div>
  );
}
