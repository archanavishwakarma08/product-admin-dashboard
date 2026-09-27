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
    totalProducts === 0
      ? 0
      : (currentPage - 1) * pageSize + 1;

  const endItem = Math.min(
    currentPage * pageSize,
    totalProducts
  );

  const getPageNumbers = () => {
    if (totalPages <= 7) {
      return Array.from(
        { length: totalPages },
        (_, index) => index + 1
      );
    }

    if (currentPage <= 4) {
      return [1, 2, 3, 4, 5, "...", totalPages];
    }

    if (currentPage >= totalPages - 3) {
      return [
        1,
        "...",
        totalPages - 4,
        totalPages - 3,
        totalPages - 2,
        totalPages - 1,
        totalPages,
      ];
    }

    return [
      1,
      "...",
      currentPage - 1,
      currentPage,
      currentPage + 1,
      "...",
      totalPages,
    ];
  };

  const pageNumbers = getPageNumbers();

  return (
    <div className="mt-6 flex flex-col gap-4 rounded-lg border bg-white p-4">
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

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
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
              onPageSizeChange(
                Number(event.target.value)
              )
            }
            className="h-9 rounded-md border border-gray-300 bg-white px-3 text-sm outline-none focus:border-gray-500 focus:ring-1 focus:ring-gray-400"
          >
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={50}>50</option>
          </select>
        </div>

        <nav
          aria-label="Product pagination"
          className="flex flex-wrap items-center gap-1"
        >
          <button
            type="button"
            onClick={() =>
              onPageChange(currentPage - 1)
            }
            disabled={currentPage === 1}
            className="rounded-md border border-gray-300 px-3 py-2 text-sm disabled:cursor-not-allowed disabled:opacity-50"
          >
            Previous
          </button>

          {pageNumbers.map((page, index) =>
            page === "..." ? (
              <span
                key={`ellipsis-${index}`}
                className="px-2 py-2 text-sm text-gray-500"
                aria-hidden="true"
              >
                ...
              </span>
            ) : (
              <button
                key={page}
                type="button"
                onClick={() =>
                  onPageChange(page)
                }
                aria-current={
                  currentPage === page
                    ? "page"
                    : undefined
                }
                className={`min-w-9 rounded-md border px-3 py-2 text-sm ${
                  currentPage === page
                    ? "border-blue-600 bg-blue-600 text-white"
                    : "border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
                }`}
              >
                {page}
              </button>
            )
          )}

          <button
            type="button"
            onClick={() =>
              onPageChange(currentPage + 1)
            }
            disabled={
              currentPage === totalPages
            }
            className="rounded-md border border-gray-300 px-3 py-2 text-sm disabled:cursor-not-allowed disabled:opacity-50"
          >
            Next
          </button>
        </nav>
      </div>
    </div>
  );
}