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
export interface ProductReview {
  rating: number;
  comment: string;
  date: string;
  reviewerName: string;
  reviewerEmail: string;
}

export interface ProductDetails extends Product {
  reviews: ProductReview[];
}

export interface ProductFormData {
  title: string;
  price: number;
  stock: number;
  category: string;
  description: string;
  thumbnail: string;
}