"use client";

interface ProductPaginationProps {
  currentPage: number;
  totalPages: number;
  pageSize: number;
  totalProducts: number;
  onPageChange: (page: number) => void;
  onPageSizeChange: (pageSize: number) => void;
}

export default function ProductPagination({
  currentPage,
  totalPages,
  pageSize,
  totalProducts,
  onPageChange,
  onPageSizeChange,
}: ProductPaginationProps) {
  const startItem =
    totalProducts === 0 ? 0 : (currentPage - 1) * pageSize + 1;

  const endItem = Math.min(
    currentPage * pageSize,
    totalProducts
  );

  return (
    <div className="mt-6 flex flex-col gap-4 rounded-lg border bg-white p-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="text-sm text-gray-600">
        Showing{" "}
        <span className="font-medium text-gray-900">
          {startItem}–{endItem}
        </span>{" "}
        of{" "}
        <span className="font-medium text-gray-900">
          {totalProducts}
        </span>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <label
          htmlFor="page-size"
          className="text-sm text-gray-600"
        >
          Page size:
        </label>

        <select
          id="page-size"
          value={pageSize}
          onChange={(event) =>
            onPageSizeChange(Number(event.target.value))
          }
          className="rounded-md border px-3 py-2 text-sm"
        >
          <option value={10}>10</option>
          <option value={20}>20</option>
          <option value={50}>50</option>
        </select>

        <button
          type="button"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="rounded-md border px-3 py-2 text-sm disabled:cursor-not-allowed disabled:opacity-50"
        >
          Previous
        </button>

        <span className="px-2 text-sm font-medium">
          Page {currentPage} of {totalPages}
        </span>

        <button
          type="button"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="rounded-md border px-3 py-2 text-sm disabled:cursor-not-allowed disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
}