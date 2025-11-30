"use client"; // خیلی مهم، حتماً اول خط باشه

import Link from "next/link";
import { useEffect, useState } from "react";

export default function Navbar() {
  const [cartCount, setCartCount] = useState(0);
  const [wishlistCount, setWishlistCount] = useState(0);

  useEffect(() => {
    const updateCounts = () => {
      const cart = JSON.parse(localStorage.getItem("cart") || "[]");
      const wishlist = JSON.parse(localStorage.getItem("wishlist") || "[]");
      setCartCount(cart.length);
      setWishlistCount(wishlist.length);
    };

    updateCounts();

    // وقتی localStorage تغییر می‌کنه، badge ها آپدیت بشن
    window.addEventListener("storage", updateCounts);
    return () => window.removeEventListener("storage", updateCounts);
  }, []);

  return (
    <nav className="bg-white dark:bg-zinc-900 shadow p-4 flex justify-between items-center">
      <Link href="/" className="text-xl font-bold text-black dark:text-zinc-50">
        Uni Market
      </Link>
      <div className="flex gap-6 items-center">
        <Link
          href="/cart"
          className="relative text-black dark:text-zinc-50 font-medium hover:underline"
        >
          Cart
          {cartCount > 0 && (
            <span className="absolute -top-2 -right-3 bg-red-600 text-white text-xs font-bold px-2 rounded-full">
              {cartCount}
            </span>
          )}
        </Link>
        <Link
          href="/wishlist"
          className="relative text-black dark:text-zinc-50 font-medium hover:underline"
        >
          Wishlist
          {wishlistCount > 0 && (
            <span className="absolute -top-2 -right-3 bg-blue-600 text-white text-xs font-bold px-2 rounded-full">
              {wishlistCount}
            </span>
          )}
        </Link>
      </div>
    </nav>
  );
}
