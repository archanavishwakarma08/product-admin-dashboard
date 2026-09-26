"use client";

import { FormEvent, useState } from "react";

import {
  addProduct,
  updateProduct,
} from "@/services/productService";

import {
  Product,
  ProductFormData,
} from "@/types/product";

interface ProductFormProps {
  product?: Product | null;
  onSuccess: (product: Product) => void;
  onCancel: () => void;
}

export default function ProductForm({
  product,
  onSuccess,
  onCancel,
}: ProductFormProps) {
  const isEditMode = Boolean(product);

  const [title, setTitle] = useState(
    product?.title ?? ""
  );

  const [price, setPrice] = useState(
    product?.price?.toString() ?? ""
  );

  const [stock, setStock] = useState(
    product?.stock?.toString() ?? ""
  );

  const [category, setCategory] = useState(
    product?.category ?? ""
  );

  const [description, setDescription] =
    useState(product?.description ?? "");

  const [thumbnail, setThumbnail] =
    useState(product?.thumbnail ?? "");

  const [error, setError] = useState("");

  const [isSaving, setIsSaving] =
    useState(false);

  const handleSubmit = async (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    if (isSaving) {
      return;
    }

    setError("");

    const trimmedTitle = title.trim();
    const trimmedCategory =
      category.trim();
    const trimmedDescription =
      description.trim();
    const trimmedThumbnail =
      thumbnail.trim();

    const numericPrice = Number(price);
    const numericStock = Number(stock);

    if (!trimmedTitle) {
      setError("Product title is required.");
      return;
    }

    if (
      !price.trim() ||
      !Number.isFinite(numericPrice) ||
      numericPrice < 0
    ) {
      setError(
        "Please enter a valid price."
      );
      return;
    }

    if (
      !stock.trim() ||
      !Number.isInteger(numericStock) ||
      numericStock < 0
    ) {
      setError(
        "Please enter a valid stock quantity."
      );
      return;
    }

    if (!trimmedCategory) {
      setError("Category is required.");
      return;
    }

    if (!trimmedDescription) {
      setError(
        "Product description is required."
      );
      return;
    }

    if (!trimmedThumbnail) {
      setError(
        "Product image URL is required."
      );
      return;
    }

    const formData: ProductFormData = {
      title: trimmedTitle,
      price: numericPrice,
      stock: numericStock,
      category: trimmedCategory,
      description: trimmedDescription,
      thumbnail: trimmedThumbnail,
    };

    try {
      setIsSaving(true);

      let response: Product;

      if (isEditMode && product) {
        response = await updateProduct(
          product.id,
          formData
        );

        // Keep the original values that
        // DummyJSON may not return.
        response = {
          ...product,
          ...response,
          ...formData,
        };
      } else {
        response = await addProduct(
          formData
        );

        response = {
          ...response,
          ...formData,
        };
      }

      onSuccess(response);
    } catch {
      setError(
        isEditMode
          ? "Failed to update product."
          : "Failed to add product."
      );
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4"
    >
      {error && (
        <div
          role="alert"
          className="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-600"
        >
          {error}
        </div>
      )}

      <div>
        <label
          htmlFor="product-title"
          className="mb-1 block text-sm font-medium text-gray-700"
        >
          Title
        </label>

        <input
          id="product-title"
          type="text"
          value={title}
          onChange={(event) =>
            setTitle(event.target.value)
          }
          disabled={isSaving}
          placeholder="Enter product title"
          className="h-10 w-full rounded-md border border-gray-300 px-3 text-sm outline-none focus:border-gray-500 focus:ring-1 focus:ring-gray-400 disabled:bg-gray-100"
        />
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label
            htmlFor="product-price"
            className="mb-1 block text-sm font-medium text-gray-700"
          >
            Price
          </label>

          <input
            id="product-price"
            type="number"
            min="0"
            step="0.01"
            value={price}
            onChange={(event) =>
              setPrice(event.target.value)
            }
            disabled={isSaving}
            placeholder="0.00"
            className="h-10 w-full rounded-md border border-gray-300 px-3 text-sm outline-none focus:border-gray-500 focus:ring-1 focus:ring-gray-400 disabled:bg-gray-100"
          />
        </div>

        <div>
          <label
            htmlFor="product-stock"
            className="mb-1 block text-sm font-medium text-gray-700"
          >
            Stock
          </label>

          <input
            id="product-stock"
            type="number"
            min="0"
            step="1"
            value={stock}
            onChange={(event) =>
              setStock(event.target.value)
            }
            disabled={isSaving}
            placeholder="0"
            className="h-10 w-full rounded-md border border-gray-300 px-3 text-sm outline-none focus:border-gray-500 focus:ring-1 focus:ring-gray-400 disabled:bg-gray-100"
          />
        </div>
      </div>

      <div>
        <label
          htmlFor="product-category"
          className="mb-1 block text-sm font-medium text-gray-700"
        >
          Category
        </label>

        <input
          id="product-category"
          type="text"
          value={category}
          onChange={(event) =>
            setCategory(event.target.value)
          }
          disabled={isSaving}
          placeholder="Enter category"
          className="h-10 w-full rounded-md border border-gray-300 px-3 text-sm outline-none focus:border-gray-500 focus:ring-1 focus:ring-gray-400 disabled:bg-gray-100"
        />
      </div>

      <div>
        <label
          htmlFor="product-description"
          className="mb-1 block text-sm font-medium text-gray-700"
        >
          Description
        </label>

        <textarea
          id="product-description"
          value={description}
          onChange={(event) =>
            setDescription(
              event.target.value
            )
          }
          disabled={isSaving}
          rows={4}
          placeholder="Enter product description"
          className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm outline-none focus:border-gray-500 focus:ring-1 focus:ring-gray-400 disabled:bg-gray-100"
        />
      </div>

      <div>
        <label
          htmlFor="product-thumbnail"
          className="mb-1 block text-sm font-medium text-gray-700"
        >
          Image URL
        </label>

        <input
          id="product-thumbnail"
          type="url"
          value={thumbnail}
          onChange={(event) =>
            setThumbnail(
              event.target.value
            )
          }
          disabled={isSaving}
          placeholder="https://example.com/image.jpg"
          className="h-10 w-full rounded-md border border-gray-300 px-3 text-sm outline-none focus:border-gray-500 focus:ring-1 focus:ring-gray-400 disabled:bg-gray-100"
        />
      </div>

      <div className="flex flex-col-reverse gap-3 border-t pt-4 sm:flex-row sm:justify-end">
        <button
          type="button"
          onClick={onCancel}
          disabled={isSaving}
          className="h-10 rounded-md border border-gray-300 px-4 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
        >
          Cancel
        </button>

        <button
          type="submit"
          disabled={isSaving}
          className="h-10 rounded-md bg-blue-600 px-5 text-sm font-medium text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isSaving
            ? "Saving..."
            : isEditMode
              ? "Update Product"
              : "Add Product"}
        </button>
      </div>
    </form>
  );
}