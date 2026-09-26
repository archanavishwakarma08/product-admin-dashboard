"use client";

import Image from "next/image";
import { Product } from "@/types/product";
import Link from "next/link";

interface ProductTableProps {
  products: Product[];
}

export default function ProductTable({
  products,
}: ProductTableProps) {
  return (
    <>
      {/* Desktop */}
      <div className="hidden overflow-x-auto rounded-lg border md:block">
        <table className="w-full min-w-[760px] text-left text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 font-semibold">
                Image
              </th>

              <th className="px-4 py-3 font-semibold">
                Title
              </th>

              <th className="px-4 py-3 font-semibold">
                Category
              </th>

              <th className="px-4 py-3 font-semibold">
                Price
              </th>

              <th className="px-4 py-3 font-semibold">
                Rating
              </th>

              <th className="px-4 py-3 font-semibold">
                Stock
              </th>

              <th className="px-4 py-3 text-center font-semibold">
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {products.map(
              (product) => (
                <tr
                  key={product.id}
                  className="border-t hover:bg-gray-50"
                >
                  <td className="px-4 py-3">
                    <Image
                      src={
                        product.thumbnail
                      }
                      alt={
                        product.title
                      }
                      width={44}
                      height={44}
                      className="rounded-md object-cover"
                    />
                  </td>

                  <td className="px-4 py-3 font-medium">
                   
                    <Link
                        href={`/products/${product.id}`}
                        className="text-blue-600 hover:underline"
                      >
                        {product.title}
                      </Link>
                    </td>

                  <td className="px-4 py-3 capitalize text-gray-600">
                    {product.category}
                  </td>

                  <td className="px-4 py-3">
                    $
                    {product.price.toFixed(
                      2
                    )}
                  </td>

                  <td className="px-4 py-3">
                    ⭐{" "}
                    {product.rating}
                  </td>

                  <td className="px-4 py-3">
                    {product.stock}
                  </td>

                  <td className="px-4 py-3">
                    <div className="flex items-center justify-center gap-3">
                      <button
                        type="button"
                        className="text-sm font-medium text-blue-600 hover:underline"
                      >
                        Edit
                      </button>

                      <button
                        type="button"
                        className="text-sm font-medium text-red-600 hover:underline"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>
      </div>

      {/* Mobile */}
      <div className="grid gap-3 md:hidden">
        {products.map(
          (product) => (
            <article
              key={product.id}
              className="rounded-lg border bg-white p-4"
            >
              <div className="flex gap-3">
                <Image
                  src={
                    product.thumbnail
                  }
                  alt={
                    product.title
                  }
                  width={72}
                  height={72}
                  className="h-[72px] w-[72px] shrink-0 rounded-md object-cover"
                />

                <div className="min-w-0 flex-1">
                  
                  
                  <h2 className="break-words text-sm font-semibold">
                  
                   <Link
                      href={`/products/${product.id}`}
                      className="text-blue-600 hover:underline"
                    >
                      {product.title}
                    </Link>
                  </h2>

                  <p className="mt-1 text-xs capitalize text-gray-500">
                    {product.category}
                  </p>

                  <p className="mt-2 text-sm font-semibold">
                    $
                    {product.price.toFixed(
                      2
                    )}
                  </p>
                </div>
              </div>

              <div className="mt-4 grid grid-cols-2 gap-2 border-t pt-3 text-xs text-gray-600">
                <span>
                  ⭐ {product.rating}
                </span>

                <span className="text-right">
                  Stock:{" "}
                  {product.stock}
                </span>
              </div>

              <div className="mt-3 flex gap-2 border-t pt-3">
                <button
                  type="button"
                  className="flex-1 rounded-md border border-blue-600 px-3 py-2 text-sm font-medium text-blue-600 hover:bg-blue-50"
                >
                  Edit
                </button>

                <button
                  type="button"
                  className="flex-1 rounded-md border border-red-600 px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-50"
                >
                  Delete
                </button>
              </div>
            </article>
          )
        )}
      </div>
    </>
  );
}