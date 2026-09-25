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

import { Product } from "@/types/product";
import ProductTable from "@/components/products/ProductTable";
import ProductPagination from "@/components/products/ProductPagination";
import ProductSearch from "@/components/products/ProductSearch";
import ProductCategoryFilter from "@/components/products/ProductCategoryFilter";

const VALID_PAGE_SIZES = [10, 20, 50];

export default function ProductsList() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const rawPage = Number(searchParams.get("page"));
  const rawPageSize = Number(searchParams.get("pageSize"));

  const searchQuery = searchParams.get("search") || "";
  const category = searchParams.get("category") || "";

  const currentPage =
    Number.isInteger(rawPage) && rawPage > 0
      ? rawPage
      : 1;

  const pageSize = VALID_PAGE_SIZES.includes(rawPageSize)
    ? rawPageSize
    : 10;

  const [products, setProducts] = useState<Product[]>([]);
  const [totalProducts, setTotalProducts] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const totalPages = Math.max(
    1,
    Math.ceil(totalProducts / pageSize)
  );

  const fetchProducts = useCallback(
    async (signal?: AbortSignal) => {
      const skip = (currentPage - 1) * pageSize;

      if (searchQuery) {
        return searchProducts(
          searchQuery,
          pageSize,
          skip,
          signal
        );
      }

      if (category) {
        return getProductsByCategory(
          category,
          pageSize,
          skip,
          signal
        );
      }

      return getProducts(
        pageSize,
        skip,
        signal
      );
    },
    [currentPage, pageSize, searchQuery, category]
  );

  useEffect(() => {
    const controller = new AbortController();

    const loadProducts = async () => {
      try {
        const response = await fetchProducts(
          controller.signal
        );

        setProducts(response.products);
        setTotalProducts(response.total);
        setError("");
      } catch {
        if (controller.signal.aborted) {
          return;
        }

        setError("Failed to load products.");
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
    newCategory: string = category
  ) => {
    const params = new URLSearchParams(
      searchParams.toString()
    );

    params.set("page", String(page));
    params.set("pageSize", String(newPageSize));

    if (newSearch) {
      params.set("search", newSearch);
      params.delete("category");
    } else {
      params.delete("search");

      if (newCategory) {
        params.set("category", newCategory);
      } else {
        params.delete("category");
      }
    }

    router.push(
      `${pathname}?${params.toString()}`
    );
  };

  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages) {
      return;
    }

    updateUrl(page);
  };

  const handlePageSizeChange = (
    newPageSize: number
  ) => {
    if (!VALID_PAGE_SIZES.includes(newPageSize)) {
      return;
    }

    updateUrl(1, newPageSize);
  };

  const handleSearch = (value: string) => {
    updateUrl(1, pageSize, value, "");
  };

  const handleCategoryChange = (value: string) => {
    updateUrl(1, pageSize, "", value);
  };

  const handleRetry = async () => {
    setIsLoading(true);
    setError("");

    try {
      const response = await fetchProducts();

      setProducts(response.products);
      setTotalProducts(response.total);
    } catch {
      setError("Failed to load products.");
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <>
        <ProductSearch
          key={`${searchQuery}-${category}`}
          value={searchQuery}
          onSearch={handleSearch}
        />

        <ProductCategoryFilter
          value={category}
          onChange={handleCategoryChange}
        />

        <div className="rounded-lg border p-8 text-center">
          Loading products...
        </div>
      </>
    );
  }

  if (error) {
    return (
      <>
        <ProductSearch
          key={`${searchQuery}-${category}`}
          value={searchQuery}
          onSearch={handleSearch}
        />

        <ProductCategoryFilter
          value={category}
          onChange={handleCategoryChange}
        />

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
        <ProductSearch
          key={`${searchQuery}-${category}`}
          value={searchQuery}
          onSearch={handleSearch}
        />

        <ProductCategoryFilter
          value={category}
          onChange={handleCategoryChange}
        />

        <div className="rounded-lg border p-8 text-center">
          No products found.
        </div>
      </>
    );
  }

  return (
    <>
      <ProductSearch
        key={`${searchQuery}-${category}`}
        value={searchQuery}
        onSearch={handleSearch}
      />

      <ProductCategoryFilter
        value={category}
        onChange={handleCategoryChange}
      />

      <ProductTable products={products} />

      <ProductPagination
        currentPage={currentPage}
        totalPages={totalPages}
        pageSize={pageSize}
        totalProducts={totalProducts}
        onPageChange={handlePageChange}
        onPageSizeChange={handlePageSizeChange}
      />
    </>
  );
}