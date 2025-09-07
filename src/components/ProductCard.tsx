"use client";

import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import {
  ShoppingCart,
  Star,
  Headphones,
  Watch,
  Laptop,
  Zap,
  Speaker,
  Shirt,
  ShirtIcon,
  ShoppingBag,
  Glasses,
  Wallet,
  Smartphone,
  Coffee,
  ChefHat,
  Utensils,
  Sparkles,
  Brush,
  Wind,
} from "lucide-react";
import Image from "next/image";

interface Item {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image?: string;
  stock: number;
}

interface ProductCardProps {
  item: Item;
}

export default function ProductCard({ item }: ProductCardProps) {
  const [isAdding, setIsAdding] = useState(false);
  const [added, setAdded] = useState(false);
  const { user, token } = useAuth();

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "Electronics":
        if (item.name.toLowerCase().includes("headphone"))
          return (
            <Headphones className="h-8 w-8 text-blue-600 dark:text-blue-400" />
          );
        if (item.name.toLowerCase().includes("watch"))
          return <Watch className="h-8 w-8 text-blue-600 dark:text-blue-400" />;
        if (item.name.toLowerCase().includes("laptop"))
          return (
            <Laptop className="h-8 w-8 text-blue-600 dark:text-blue-400" />
          );
        if (item.name.toLowerCase().includes("charg"))
          return <Zap className="h-8 w-8 text-blue-600 dark:text-blue-400" />;
        if (item.name.toLowerCase().includes("speaker"))
          return (
            <Speaker className="h-8 w-8 text-blue-600 dark:text-blue-400" />
          );
        return (
          <Smartphone className="h-8 w-8 text-blue-600 dark:text-blue-400" />
        );
      case "Clothing":
        if (item.name.toLowerCase().includes("shirt"))
          return (
            <Shirt className="h-8 w-8 text-green-600 dark:text-green-400" />
          );
        if (item.name.toLowerCase().includes("hoodie"))
          return (
            <ShirtIcon className="h-8 w-8 text-green-600 dark:text-green-400" />
          );
        return <Shirt className="h-8 w-8 text-green-600 dark:text-green-400" />;
      case "Accessories":
        if (item.name.toLowerCase().includes("bag"))
          return (
            <ShoppingBag className="h-8 w-8 text-purple-600 dark:text-purple-400" />
          );
        if (item.name.toLowerCase().includes("sunglass"))
          return (
            <Glasses className="h-8 w-8 text-purple-600 dark:text-purple-400" />
          );
        if (item.name.toLowerCase().includes("wallet"))
          return (
            <Wallet className="h-8 w-8 text-purple-600 dark:text-purple-400" />
          );
        if (item.name.toLowerCase().includes("phone"))
          return (
            <Smartphone className="h-8 w-8 text-purple-600 dark:text-purple-400" />
          );
        return (
          <ShoppingBag className="h-8 w-8 text-purple-600 dark:text-purple-400" />
        );
      case "Home & Kitchen":
        if (item.name.toLowerCase().includes("coffee"))
          return <Coffee className="h-8 w-8 text-red-600 dark:text-red-400" />;
        if (item.name.toLowerCase().includes("fryer"))
          return <ChefHat className="h-8 w-8 text-red-600 dark:text-red-400" />;
        if (item.name.toLowerCase().includes("blender"))
          return <ChefHat className="h-8 w-8 text-red-600 dark:text-red-400" />;
        if (item.name.toLowerCase().includes("dinnerware"))
          return (
            <Utensils className="h-8 w-8 text-red-600 dark:text-red-400" />
          );
        return <ChefHat className="h-8 w-8 text-red-600 dark:text-red-400" />;
      case "Beauty":
        if (item.name.toLowerCase().includes("skincare"))
          return (
            <Sparkles className="h-8 w-8 text-pink-600 dark:text-pink-400" />
          );
        if (item.name.toLowerCase().includes("makeup"))
          return <Brush className="h-8 w-8 text-pink-600 dark:text-pink-400" />;
        if (item.name.toLowerCase().includes("perfume"))
          return (
            <Sparkles className="h-8 w-8 text-pink-600 dark:text-pink-400" />
          );
        if (item.name.toLowerCase().includes("hair"))
          return <Wind className="h-8 w-8 text-pink-600 dark:text-pink-400" />;
        if (item.name.toLowerCase().includes("mask"))
          return (
            <Sparkles className="h-8 w-8 text-pink-600 dark:text-pink-400" />
          );
        return (
          <Sparkles className="h-8 w-8 text-pink-600 dark:text-pink-400" />
        );
      default:
        return (
          <ShoppingCart className="h-8 w-8 text-gray-600 dark:text-gray-400" />
        );
    }
  };

  const handleAddToCart = async () => {
    if (!user || !token) {
      window.location.href = "/auth/login";
      return;
    }

    setIsAdding(true);
    try {
      const response = await fetch("/api/cart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ itemId: item.id, quantity: 1 }),
      });

      if (response.ok) {
        setAdded(true);
        setTimeout(() => setAdded(false), 2000);
      } else {
        const error = await response.json();
        alert(error.error || "Failed to add item to cart");
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
      alert("Failed to add item to cart");
    } finally {
      setIsAdding(false);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all duration-300">
      {/* Image */}
      <div className="relative h-48 w-full">
        {item.image ? (
          <Image
            src={item.image}
            alt={item.name}
            fill
            className="object-cover"
            priority
          />
        ) : (
          <div className="w-full h-full bg-gray-200 dark:bg-gray-600 flex items-center justify-center">
            <span className="text-gray-500 dark:text-gray-300">No Image</span>
          </div>
        )}

        {/* Category Icon */}
        <div className="absolute top-2 left-2">
          <div className="w-10 h-10 bg-white dark:bg-gray-800 rounded-full flex items-center justify-center shadow-md border border-gray-200 dark:border-gray-600">
            {getCategoryIcon(item.category)}
          </div>
        </div>

        {/* Out of Stock Overlay */}
        {item.stock === 0 && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <span className="text-white font-semibold">Out of Stock</span>
          </div>
        )}
      </div>

      {/* Card Content */}
      <div className="p-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-blue-600 dark:text-blue-400 font-medium">
            {item.category}
          </span>
          <div className="flex items-center">
            <Star className="h-4 w-4 text-yellow-400 fill-current" />
            <span className="text-sm text-gray-600 dark:text-gray-400 ml-1">
              4.5
            </span>
          </div>
        </div>

        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2">
          {item.name}
        </h3>

        <p className="text-gray-600 dark:text-gray-300 text-sm mb-3 line-clamp-2">
          {item.description}
        </p>

        <div className="flex items-center justify-between">
          <span className="text-xl font-bold text-gray-900 dark:text-white">
            ${item.price.toFixed(2)}
          </span>

          <button
            onClick={handleAddToCart}
            disabled={isAdding || item.stock === 0 || added}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
              added
                ? "bg-green-600 text-white"
                : item.stock === 0
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            } disabled:opacity-50 disabled:cursor-not-allowed`}
          >
            {isAdding ? (
              "Adding..."
            ) : added ? (
              "Added!"
            ) : item.stock === 0 ? (
              "Out of Stock"
            ) : (
              <>
                <ShoppingCart className="h-4 w-4 inline mr-1" />
                Add to Cart
              </>
            )}
          </button>
        </div>

        {item.stock > 0 && item.stock < 10 && (
          <p className="text-xs text-orange-600 mt-2">
            Only {item.stock} left in stock!
          </p>
        )}
      </div>
    </div>
  );
}
