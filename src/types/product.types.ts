export type Product = {
  id: number;
  name: string;
  description: string;
  price: number;
}

export type ProductResponse = {
  products: Product[];
  total: number;
}