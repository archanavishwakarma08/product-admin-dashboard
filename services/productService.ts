import api from "@/lib/axios";

export interface Product {
  id: number;
  title: string;
  category: string;
  price: number;
  rating: number;
  stock: number;
  thumbnail: string;
}

export interface ProductsResponse {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
}

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