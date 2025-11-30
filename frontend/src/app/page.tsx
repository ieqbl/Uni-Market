"use client";

import Image from "next/image";

type Product = {
  id: number;
  name: string;
  price: number;
  image?: string;
};

const products: Product[] = [
  { id: 1, name: "Uni Sneakers", price: 1200, image: "/sneakers.jpg" },
  { id: 2, name: "Uni Backpack", price: 900, image: "/backpack.jpg" },
  { id: 3, name: "Uni Watch", price: 2500, image: "/watch.jpg" },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black p-8">
      <h1 className="text-4xl font-bold text-black dark:text-zinc-50 mb-8">
        Uni Market Products
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {products.map((product) => (
          <a
            key={product.id}
            href={`/products/${product.id}`}
            className="border rounded-lg shadow p-4 flex flex-col items-center bg-white dark:bg-zinc-900 hover:shadow-lg transition-shadow"
          >
            {product.image && (
              <img
                src={product.image}
                alt={product.name}
                className="w-40 h-40 object-cover rounded mb-2"
              />
            )}
            <h2 className="font-bold text-lg text-black dark:text-zinc-50">
              {product.name}
            </h2>
            <p className="text-gray-700 dark:text-gray-300">
              {product.price} TOMAN
            </p>
          </a>
        ))}
      </div>
    </div>
  );
}
