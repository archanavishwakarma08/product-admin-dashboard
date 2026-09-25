"use client";

import { useCallback, useEffect, useState } from "react";
import {
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";

import {
  getProducts,
  getProductsByCategory,
  searchProducts,
} from "@/services/productService";

import {
  Product,
  ProductSortBy,
  SortOrder,
} from "@/types/product";

import ProductTable from "@/components/products/ProductTable";
import ProductPagination from "@/components/products/ProductPagination";
import ProductSearch from "@/components/products/ProductSearch";
import ProductCategoryFilter from "@/components/products/ProductCategoryFilter";
import ProductSort from "@/components/products/ProductSort";

const VALID_PAGE_SIZES = [10, 20, 50];

const VALID_SORT_FIELDS: ProductSortBy[] = [
  "price",
  "rating",
  "title",
];

const VALID_SORT_ORDERS: SortOrder[] = [
  "asc",
  "desc",
];

export default function ProductsList() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const rawPage = Number(searchParams.get("page"));
  const rawPageSize = Number(searchParams.get("pageSize"));

  const searchQuery =
    searchParams.get("search") || "";

  const category =
    searchParams.get("category") || "";

  const rawSortBy =
    searchParams.get("sortBy");

  const rawOrder =
    searchParams.get("order");

  const currentPage =
    Number.isInteger(rawPage) && rawPage > 0
      ? rawPage
      : 1;

  const pageSize = VALID_PAGE_SIZES.includes(
    rawPageSize
  )
    ? rawPageSize
    : 10;

  const sortBy: ProductSortBy =
    rawSortBy &&
    VALID_SORT_FIELDS.includes(
      rawSortBy as ProductSortBy
    )
      ? (rawSortBy as ProductSortBy)
      : "price";

  const order: SortOrder =
    rawOrder &&
    VALID_SORT_ORDERS.includes(
      rawOrder as SortOrder
    )
      ? (rawOrder as SortOrder)
      : "asc";

  const [products, setProducts] = useState<Product[]>(
    []
  );

  const [totalProducts, setTotalProducts] =
    useState(0);

  const [isLoading, setIsLoading] =
    useState(true);

  const [error, setError] = useState("");

  const totalPages = Math.max(
    1,
    Math.ceil(totalProducts / pageSize)
  );

  const fetchProducts = useCallback(
    async (signal?: AbortSignal) => {
      const skip =
        (currentPage - 1) * pageSize;

      if (searchQuery) {
        return searchProducts(
          searchQuery,
          pageSize,
          skip,
          sortBy,
          order,
          signal
        );
      }

      if (category) {
        return getProductsByCategory(
          category,
          pageSize,
          skip,
          sortBy,
          order,
          signal
        );
      }

      return getProducts(
        pageSize,
        skip,
        sortBy,
        order,
        signal
      );
    },
    [
      currentPage,
      pageSize,
      searchQuery,
      category,
      sortBy,
      order,
    ]
  );

  useEffect(() => {
    const controller =
      new AbortController();

    const loadProducts = async () => {
      setIsLoading(true);
      setError("");

      try {
        const response =
          await fetchProducts(
            controller.signal
          );

        setProducts(response.products);
        setTotalProducts(response.total);
      } catch {
        if (controller.signal.aborted) {
          return;
        }

        setError(
          "Failed to load products."
        );
      } finally {
        if (!controller.signal.aborted) {
          setIsLoading(false);
        }
      }
    };

    loadProducts();

    return () => {
      controller.abort();
    };
  }, [fetchProducts]);

  const updateUrl = (
    page: number,
    newPageSize: number = pageSize,
    newSearch: string = searchQuery,
    newCategory: string = category,
    newSortBy: ProductSortBy = sortBy,
    newOrder: SortOrder = order
  ) => {
    const params =
      new URLSearchParams(
        searchParams.toString()
      );

    params.set(
      "page",
      String(page)
    );

    params.set(
      "pageSize",
      String(newPageSize)
    );

    if (newSearch) {
      params.set(
        "search",
        newSearch
      );

      params.delete("category");
    } else {
      params.delete("search");

      if (newCategory) {
        params.set(
          "category",
          newCategory
        );
      } else {
        params.delete("category");
      }
    }

    params.set(
      "sortBy",
      newSortBy
    );

    params.set(
      "order",
      newOrder
    );

    router.push(
      `${pathname}?${params.toString()}`
    );
  };

  const handlePageChange = (
    page: number
  ) => {
    if (
      page < 1 ||
      page > totalPages
    ) {
      return;
    }

    updateUrl(page);
  };

  const handlePageSizeChange = (
    newPageSize: number
  ) => {
    if (
      !VALID_PAGE_SIZES.includes(
        newPageSize
      )
    ) {
      return;
    }

    updateUrl(
      1,
      newPageSize
    );
  };

  const handleSearch = (
    value: string
  ) => {
    updateUrl(
      1,
      pageSize,
      value,
      "",
      sortBy,
      order
    );
  };

  const handleCategoryChange = (
    value: string
  ) => {
    updateUrl(
      1,
      pageSize,
      "",
      value,
      sortBy,
      order
    );
  };

  const handleSortByChange = (
    value: ProductSortBy
  ) => {
    if (
      !VALID_SORT_FIELDS.includes(
        value
      )
    ) {
      return;
    }

    updateUrl(
      1,
      pageSize,
      searchQuery,
      category,
      value,
      order
    );
  };

  const handleOrderChange = (
    value: SortOrder
  ) => {
    if (
      !VALID_SORT_ORDERS.includes(
        value
      )
    ) {
      return;
    }

    updateUrl(
      1,
      pageSize,
      searchQuery,
      category,
      sortBy,
      value
    );
  };

  const handleRetry = async () => {
    setIsLoading(true);
    setError("");

    try {
      const response =
        await fetchProducts();

      setProducts(
        response.products
      );

      setTotalProducts(
        response.total
      );
    } catch {
      setError(
        "Failed to load products."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const searchAndFilterControls = (
    <>
      <ProductSearch
        key={`${searchQuery}-${category}`}
        value={searchQuery}
        onSearch={handleSearch}
      />

      <ProductCategoryFilter
        value={category}
        onChange={
          handleCategoryChange
        }
      />

      <ProductSort
        sortBy={sortBy}
        order={order}
        onSortByChange={
          handleSortByChange
        }
        onOrderChange={
          handleOrderChange
        }
      />
    </>
  );

  if (isLoading) {
    return (
      <>
        {searchAndFilterControls}

        <div className="rounded-lg border p-8 text-center">
          Loading products...
        </div>
      </>
    );
  }

  if (error) {
    return (
      <>
        {searchAndFilterControls}

        <div className="rounded-lg border p-8 text-center">
          <p className="mb-4 text-red-600">
            {error}
          </p>

          <button
            type="button"
            onClick={handleRetry}
            className="rounded-md bg-black px-4 py-2 text-white"
          >
            Retry
          </button>
        </div>
      </>
    );
  }

  if (products.length === 0) {
    return (
      <>
        {searchAndFilterControls}

        <div className="rounded-lg border p-8 text-center">
          No products found.
        </div>
      </>
    );
  }

  return (
    <>
      {searchAndFilterControls}

      <ProductTable
        products={products}
      />

      <ProductPagination
        currentPage={currentPage}
        totalPages={totalPages}
        pageSize={pageSize}
        totalProducts={
          totalProducts
        }
        onPageChange={
          handlePageChange
        }
        onPageSizeChange={
          handlePageSizeChange
        }
      />
    </>
  );
}