
export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
  brand: string;
  color: string;
  dimensions: {
    width: number;
    height: number;
    depth: number;
  };
  weight: number;
  stock: number;
  rating: number;
  image: string;
  features: string[];
}

export interface PaginationInfo {
  currentPage: number;
  totalPages: number;
  itemsPerPage: number;
  totalItems: number;
}

export type ViewMode = "grid" | "list";
