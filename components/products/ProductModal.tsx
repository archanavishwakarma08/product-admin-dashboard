"use client";

import ProductForm from "@/components/products/ProductForm";

import { Product } from "@/types/product";

interface ProductModalProps {
  product?: Product | null;
  onSuccess: (product: Product) => void;
  onClose: () => void;
}

export default function ProductModal({
  product,
  onSuccess,
  onClose,
}: ProductModalProps) {
  const isEditMode = Boolean(product);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="product-modal-title"
    >
      <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-lg bg-white shadow-xl">
        <div className="flex items-center justify-between border-b px-5 py-4 sm:px-6">
          <h2
            id="product-modal-title"
            className="text-lg font-semibold"
          >
            {isEditMode
              ? "Edit Product"
              : "Add Product"}
          </h2>

          <button
            type="button"
            onClick={onClose}
            className="rounded-md px-2 py-1 text-xl leading-none text-gray-500 hover:bg-gray-100 hover:text-gray-900"
            aria-label="Close product form"
          >
            ×
          </button>
        </div>

        <div className="p-5 sm:p-6">
          <ProductForm
            product={product}
            onSuccess={onSuccess}
            onCancel={onClose}
          />
        </div>
      </div>
    </div>
  );
}