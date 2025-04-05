
export interface ApiResponse<T> {
  data: T[];
  status: number;
  message: string;
  pagination?: {
    total: number;
    pages: number;
    page: number;
    limit: number;
  };
}
