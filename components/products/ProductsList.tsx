"use client";

import {
  useEffect,
  useState,
} from "react";
import {
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";

import { getProducts } from "@/services/productService";
import { Product } from "@/types/product";
import ProductTable from "@/components/products/ProductTable";
import ProductPagination from "@/components/products/ProductPagination";

const VALID_PAGE_SIZES = [10, 20, 50];

export default function ProductsList() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const rawPage = Number(searchParams.get("page"));
  const rawPageSize = Number(searchParams.get("pageSize"));

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

  useEffect(() => {
    const loadProducts = async () => {
      setIsLoading(true);
      setError("");

      try {
        const skip = (currentPage - 1) * pageSize;

        const response = await getProducts(
          pageSize,
          skip
        );

        setProducts(response.products);
        setTotalProducts(response.total);
      } catch {
        setError("Failed to load products.");
      } finally {
        setIsLoading(false);
      }
    };

    loadProducts();
  }, [currentPage, pageSize]);

  const updateUrl = (
    page: number,
    newPageSize: number = pageSize
  ) => {
    const params = new URLSearchParams(
      searchParams.toString()
    );

    params.set("page", String(page));
    params.set("pageSize", String(newPageSize));

    router.push(`${pathname}?${params.toString()}`);
  };

  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages) {
      return;
    }

    updateUrl(page);
  };

  const handlePageSizeChange = (newPageSize: number) => {
    if (!VALID_PAGE_SIZES.includes(newPageSize)) {
      return;
    }

    updateUrl(1, newPageSize);
  };

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
          onClick={() => updateUrl(currentPage)}
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

  return (
    <>
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