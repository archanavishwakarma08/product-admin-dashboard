import api from "@/lib/axios";
import {
  ProductCategory,
   ProductDetails,
  ProductsResponse,
  ProductSortBy,
  SortOrder,
} from "@/types/product";

export const getProducts = async (
  limit: number = 10,
  skip: number = 0,
  sortBy?: ProductSortBy,
  order?: SortOrder,
  signal?: AbortSignal
): Promise<ProductsResponse> => {
  const response = await api.get<ProductsResponse>(
    "/products",
    {
      params: {
        limit,
        skip,
        ...(sortBy && { sortBy }),
        ...(order && { order }),
      },
      signal,
    }
  );

  return response.data;
};

export const searchProducts = async (
  query: string,
  limit: number = 10,
  skip: number = 0,
  sortBy?: ProductSortBy,
  order?: SortOrder,
  signal?: AbortSignal
): Promise<ProductsResponse> => {
  const response = await api.get<ProductsResponse>(
    "/products/search",
    {
      params: {
        q: query,
        limit,
        skip,
        ...(sortBy && { sortBy }),
        ...(order && { order }),
      },
      signal,
    }
  );

  return response.data;
};

export const getCategories = async (): Promise<
  ProductCategory[]
> => {
  const response = await api.get<ProductCategory[]>(
    "/products/categories"
  );

  return response.data;
};

export const getProductsByCategory = async (
  category: string,
  limit: number = 10,
  skip: number = 0,
  sortBy?: ProductSortBy,
  order?: SortOrder,
  signal?: AbortSignal
): Promise<ProductsResponse> => {
  const response = await api.get<ProductsResponse>(
    `/products/category/${category}`,
    {
      params: {
        limit,
        skip,
        ...(sortBy && { sortBy }),
        ...(order && { order }),
      },
      signal,
    }
  );

  return response.data;
};
export const getProductById = async (
  id: number
): Promise<ProductDetails> => {
  const response =
    await api.get<ProductDetails>(
      `/products/${id}`
    );

  return response.data;
};