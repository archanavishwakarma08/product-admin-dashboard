"use client";

import { useEffect, useRef, useState } from "react";

interface ProductSearchProps {
  value: string;
  onSearch: (value: string) => void;
}

export default function ProductSearch({
  value,
  onSearch,
}: ProductSearchProps) {
  const [inputValue, setInputValue] = useState(value);

  const onSearchRef = useRef(onSearch);
  const valueRef = useRef(value);

  useEffect(() => {
    onSearchRef.current = onSearch;
    valueRef.current = value;
  }, [onSearch, value]);

  useEffect(() => {
    if (
      inputValue.trim() ===
      valueRef.current.trim()
    ) {
      return;
    }

    const timer = setTimeout(() => {
      if (
        inputValue.trim() !==
        valueRef.current.trim()
      ) {
        onSearchRef.current(
          inputValue.trim()
        );
      }
    }, 500);

    return () => {
      clearTimeout(timer);
    };
  }, [inputValue]);

  return (
    <div className="w-full">
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
        onChange={(event) =>
          setInputValue(
            event.target.value
          )
        }
        placeholder="Search products..."
        className="h-10 w-full rounded-md border border-gray-300 px-3 text-sm outline-none transition focus:border-gray-500 focus:ring-1 focus:ring-gray-400"
      />
    </div>
  );
}