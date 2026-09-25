import api from "@/lib/axios";
import { ProductsResponse } from "@/types/product";
export const getProducts = async (
  limit: number = 10,
  skip: number = 0
): Promise<ProductsResponse> => {
  const response = await api.get<ProductsResponse>("/products", {
    params: {
      limit,
      skip,
    },
  });

  return response.data;
};