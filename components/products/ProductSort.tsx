"use client";

import {
  ProductSortBy,
  SortOrder,
} from "@/types/product";

interface ProductSortProps {
  sortBy: ProductSortBy;
  order: SortOrder;
  onSortByChange: (
    value: ProductSortBy
  ) => void;
  onOrderChange: (
    value: SortOrder
  ) => void;
}

export default function ProductSort({
  sortBy,
  order,
  onSortByChange,
  onOrderChange,
}: ProductSortProps) {
  return (
    <>
      <div className="w-full">
        <label
          htmlFor="product-sort"
          className="mb-2 block text-sm font-medium text-gray-700"
        >
          Sort by
        </label>

        <select
          id="product-sort"
          value={sortBy}
          onChange={(event) =>
            onSortByChange(
              event.target
                .value as ProductSortBy
            )
          }
          className="h-10 w-full rounded-md border border-gray-300 bg-white px-3 text-sm outline-none focus:border-gray-500 focus:ring-1 focus:ring-gray-400"
        >
          <option value="price">
            Price
          </option>

          <option value="rating">
            Rating
          </option>

          <option value="title">
            Title
          </option>
        </select>
      </div>

      <div className="w-full">
        <label
          htmlFor="sort-order"
          className="mb-2 block text-sm font-medium text-gray-700"
        >
          Order
        </label>

        <select
          id="sort-order"
          value={order}
          onChange={(event) =>
            onOrderChange(
              event.target
                .value as SortOrder
            )
          }
          className="h-10 w-full rounded-md border border-gray-300 bg-white px-3 text-sm outline-none focus:border-gray-500 focus:ring-1 focus:ring-gray-400"
        >
          <option value="asc">
            Ascending
          </option>

          <option value="desc">
            Descending
          </option>
        </select>
      </div>
    </>
  );
}