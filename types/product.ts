export interface Product {
  id: number;
  title: string;
  category: string;
  price: number;
  rating: number;
  stock: number;
  thumbnail: string;
  description?: string;
  images?: string[];
}

export interface ProductsResponse {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
}

export interface ProductCategory {
  slug: string;
  name: string;
  url: string;
}

export type ProductSortBy = "price" | "rating" | "title";

export type SortOrder = "asc" | "desc";