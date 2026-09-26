"use client";

import { useEffect, useState } from "react";

import { getCategories } from "@/services/productService";
import { ProductCategory } from "@/types/product";

interface ProductCategoryFilterProps {
  value: string;
  onChange: (category: string) => void;
}

export default function ProductCategoryFilter({
  value,
  onChange,
}: ProductCategoryFilterProps) {
  const [categories, setCategories] =
    useState<ProductCategory[]>([]);

  const [isLoading, setIsLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  useEffect(() => {
    const loadCategories =
      async () => {
        try {
          const response =
            await getCategories();

          setCategories(response);
          setError("");
        } catch {
          setError(
            "Failed to load categories."
          );
        } finally {
          setIsLoading(false);
        }
      };

    loadCategories();
  }, []);

  if (isLoading) {
    return (
      <div className="w-full">
        <label className="mb-2 block text-sm font-medium text-gray-700">
          Category
        </label>

        <div className="flex h-10 items-center rounded-md border border-gray-300 px-3 text-sm text-gray-500">
          Loading categories...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full">
        <label className="mb-2 block text-sm font-medium text-gray-700">
          Category
        </label>

        <div className="flex h-10 items-center rounded-md border border-red-300 px-3 text-sm text-red-600">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">
      <label
        htmlFor="product-category"
        className="mb-2 block text-sm font-medium text-gray-700"
      >
        Category
      </label>

      <select
        id="product-category"
        value={value}
        onChange={(event) =>
          onChange(
            event.target.value
          )
        }
        className="h-10 w-full rounded-md border border-gray-300 bg-white px-3 text-sm outline-none focus:border-gray-500 focus:ring-1 focus:ring-gray-400"
      >
        <option value="">
          All categories
        </option>

        {categories.map(
          (category) => (
            <option
              key={category.slug}
              value={category.slug}
            >
              {category.name}
            </option>
          )
        )}
      </select>
    </div>
  );
}