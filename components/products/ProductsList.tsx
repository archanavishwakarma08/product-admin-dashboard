"use client";

import { useEffect, useState } from "react";
import { getProducts } from "@/services/productService";
import { Product } from "@/types/product";
import ProductTable from "@/components/products/ProductTable";

export default function ProductsList() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchProducts = async () => {
    setError("");

    try {
      const response = await getProducts(10, 0);
      setProducts(response.products);
    } catch {
      setError("Failed to load products.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const response = await getProducts(10, 0);
        setProducts(response.products);
      } catch {
        setError("Failed to load products.");
      } finally {
        setIsLoading(false);
      }
    };

    loadProducts();
  }, []);

  if (isLoading) {
    return (
      <div className="rounded-lg border p-8 text-center">
        Loading products...
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-lg border p-8 text-center">
        <p className="mb-4 text-red-600">{error}</p>

        <button
          type="button"
          onClick={fetchProducts}
          className="rounded-md bg-black px-4 py-2 text-white"
        >
          Retry
        </button>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="rounded-lg border p-8 text-center">
        No products found.
      </div>
    );
  }

  return <ProductTable products={products} />;
}