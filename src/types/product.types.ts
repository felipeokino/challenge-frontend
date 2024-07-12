export type Product = {
  id: number;
  name: string;
  description: string;
  price: number;
  deletedAt?: string;
};

export type ProductResponse = {
  products: Product[];
  total: number;
};
