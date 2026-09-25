import api from "@/lib/axios";
import { ProductsResponse } from "@/types/product";

export const getProducts = async (
  limit: number = 10,
  skip: number = 0,
  signal?: AbortSignal
): Promise<ProductsResponse> => {
  const response = await api.get<ProductsResponse>("/products", {
    params: {
      limit,
      skip,
    },
    signal,
  });

  return response.data;
};

export const searchProducts = async (
  query: string,
  limit: number = 10,
  skip: number = 0,
  signal?: AbortSignal
): Promise<ProductsResponse> => {
  const response = await api.get<ProductsResponse>(
    "/products/search",
    {
      params: {
        q: query,
        limit,
        skip,
      },
      signal,
    }
  );

  return response.data;
};