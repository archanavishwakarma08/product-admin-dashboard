"use client";

import { useEffect, useState } from "react";

interface ProductSearchProps {
  value: string;
  onSearch: (value: string) => void;
}

export default function ProductSearch({
  value,
  onSearch,
}: ProductSearchProps) {
  const [inputValue, setInputValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      onSearch(inputValue.trim());
    }, 500);

    return () => {
      clearTimeout(timer);
    };
  }, [inputValue, onSearch]);

  return (
    <div className="mb-6">
      <label
        htmlFor="product-search"
        className="mb-2 block text-sm font-medium text-gray-700"
      >
        Search products
      </label>

      <input
        id="product-search"
        type="search"
        value={inputValue}
        onChange={(event) => setInputValue(event.target.value)}
        placeholder="Search by product name..."
        className="w-full rounded-md border px-4 py-2 outline-none focus:ring-2 focus:ring-black sm:max-w-md"
      />
    </div>
  );
}