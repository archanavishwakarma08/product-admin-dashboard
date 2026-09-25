"use client";

import Image from "next/image";
import { Product } from "@/types/product";

interface ProductTableProps {
  products: Product[];
}

export default function ProductTable({
  products,
}: ProductTableProps) {
  return (
    <div className="overflow-x-auto rounded-lg border">
      <table className="w-full min-w-[700px] text-left text-sm">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-3 font-semibold">Product</th>
            <th className="px-4 py-3 font-semibold">Category</th>
            <th className="px-4 py-3 font-semibold">Price</th>
            <th className="px-4 py-3 font-semibold">Rating</th>
            <th className="px-4 py-3 font-semibold">Stock</th>
          </tr>
        </thead>

        <tbody>
          {products.map((product) => (
            <tr
              key={product.id}
              className="border-t hover:bg-gray-50"
            >
              <td className="px-4 py-3">
                <div className="flex items-center gap-3">
                  <Image
                    src={product.thumbnail}
                    alt={product.title}
                    width={48}
                    height={48}
                    className="rounded-md object-cover"
                  />

                  <span className="font-medium">
                    {product.title}
                  </span>
                </div>
              </td>

              <td className="px-4 py-3 capitalize">
                {product.category}
              </td>

              <td className="px-4 py-3">
                ${product.price.toFixed(2)}
              </td>

              <td className="px-4 py-3">
                ⭐ {product.rating}
              </td>

              <td className="px-4 py-3">
                {product.stock}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}