"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

import { getProductById } from "@/services/productService";
import { ProductDetails } from "@/types/product";

export default function ProductDetailsPage() {
  const params = useParams();

  const rawId = params.id;

  const productId =
    typeof rawId === "string"
      ? Number(rawId)
      : NaN;

  const isInvalidProductId =
    !Number.isInteger(productId) ||
    productId <= 0;

  const [product, setProduct] =
    useState<ProductDetails | null>(null);

  const [isLoading, setIsLoading] =
    useState(!isInvalidProductId);

  const [error, setError] =
    useState("");

  useEffect(() => {
    if (isInvalidProductId) {
      return;
    }

    const loadProduct = async () => {
      try {
        setIsLoading(true);
        setError("");

        const response =
          await getProductById(productId);

        setProduct(response);
      } catch {
        setError("Product not found.");
      } finally {
        setIsLoading(false);
      }
    };

    loadProduct();
  }, [productId, isInvalidProductId]);

  if (isInvalidProductId) {
    return (
      <main className="min-h-screen bg-gray-50 px-4 py-8">
        <div className="mx-auto max-w-6xl">
          <div className="rounded-lg border bg-white p-8 text-center">
            <h1 className="text-xl font-semibold">
              Invalid product ID.
            </h1>

            <p className="mt-2 text-sm text-gray-600">
              Please provide a valid product ID.
            </p>

            <Link
              href="/products"
              className="mt-6 inline-flex rounded-md bg-black px-4 py-2 text-sm font-medium text-white hover:bg-gray-800"
            >
              Back to Products
            </Link>
          </div>
        </div>
      </main>
    );
  }

  if (isLoading) {
    return (
      <main className="min-h-screen bg-gray-50 px-4 py-8">
        <div className="mx-auto max-w-6xl">
          <div className="rounded-lg border bg-white p-8 text-center">
            Loading product...
          </div>
        </div>
      </main>
    );
  }

  if (error || !product) {
    return (
      <main className="min-h-screen bg-gray-50 px-4 py-8">
        <div className="mx-auto max-w-6xl">
          <div className="rounded-lg border bg-white p-8 text-center">
            <h1 className="text-xl font-semibold">
              {error || "Product not found."}
            </h1>

            <p className="mt-2 text-sm text-gray-600">
              The requested product could not
              be loaded.
            </p>

            <Link
              href="/products"
              className="mt-6 inline-flex rounded-md bg-black px-4 py-2 text-sm font-medium text-white hover:bg-gray-800"
            >
              Back to Products
            </Link>
          </div>
        </div>
      </main>
    );
  }

  const images =
    product.images &&
    product.images.length > 0
      ? product.images
      : [product.thumbnail];

  return (
    <main className="min-h-screen bg-gray-50 px-4 py-8">
      <div className="mx-auto max-w-6xl">
        <Link
          href="/products"
          className="mb-6 inline-flex text-sm font-medium text-blue-600 hover:underline"
        >
          ← Back to Products
        </Link>

        <section className="rounded-lg border bg-white p-5 shadow-sm sm:p-6">
          <div className="grid gap-8 lg:grid-cols-2">
            <div>
              <div className="overflow-hidden rounded-lg border bg-gray-50">
                <Image
                  src={images[0]}
                  alt={product.title}
                  width={600}
                  height={600}
                  className="h-auto max-h-[500px] w-full object-contain"
                />
              </div>

              {images.length > 1 && (
                <div className="mt-4 grid grid-cols-4 gap-3">
                  {images
                    .slice(0, 4)
                    .map((image, index) => (
                      <div
                        key={`${image}-${index}`}
                        className="overflow-hidden rounded-md border bg-gray-50"
                      >
                        <Image
                          src={image}
                          alt={`${product.title} image ${
                            index + 1
                          }`}
                          width={120}
                          height={120}
                          className="h-20 w-full object-cover"
                        />
                      </div>
                    ))}
                </div>
              )}
            </div>

            <div>
              <p className="text-sm capitalize text-gray-500">
                {product.category}
              </p>

              <h1 className="mt-2 text-2xl font-bold text-gray-900 sm:text-3xl">
                {product.title}
              </h1>

              <div className="mt-4 flex flex-wrap items-center gap-4">
                <span className="text-2xl font-bold">
                  ${product.price.toFixed(2)}
                </span>

                <span className="rounded-md bg-gray-100 px-3 py-1 text-sm">
                  ⭐ {product.rating}
                </span>

                <span className="rounded-md bg-gray-100 px-3 py-1 text-sm">
                  Stock: {product.stock}
                </span>
              </div>

              <div className="mt-6 border-t pt-6">
                <h2 className="text-lg font-semibold">
                  Description
                </h2>

                <p className="mt-2 leading-7 text-gray-600">
                  {product.description ||
                    "No description available."}
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="mt-6 rounded-lg border bg-white p-5 shadow-sm sm:p-6">
          <h2 className="text-xl font-semibold">
            Reviews
          </h2>

          {product.reviews &&
          product.reviews.length > 0 ? (
            <div className="mt-5 divide-y">
              {product.reviews.map(
                (review, index) => (
                  <article
                    key={`${review.reviewerEmail}-${index}`}
                    className="py-5 first:pt-0 last:pb-0"
                  >
                    <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                      <div>
                        <h3 className="font-medium">
                          {review.reviewerName}
                        </h3>

                        <p className="text-xs text-gray-500">
                          {review.reviewerEmail}
                        </p>
                      </div>

                      <div className="text-sm">
                        ⭐ {review.rating}
                      </div>
                    </div>

                    <p className="mt-3 text-sm leading-6 text-gray-600">
                      {review.comment}
                    </p>

                    <p className="mt-2 text-xs text-gray-400">
                      {new Date(
                        review.date
                      ).toLocaleDateString()}
                    </p>
                  </article>
                )
              )}
            </div>
          ) : (
            <p className="mt-4 text-sm text-gray-500">
              No reviews available.
            </p>
          )}
        </section>
      </div>
    </main>
  );
}