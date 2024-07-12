/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { Product, ProductResponse } from "types/product.types";
import { create } from "zustand";

import api from "utils/api";

type ProductStore = {
  products: Product[];
  product: Product | null;
  isLoading: boolean;
  submmitLoading: boolean;
  error: string | null;
  setProducts: (products: Product[]) => void;
  setProduct: (product: Product | null) => void;
  setIsLoading: (isLoading: boolean) => void;
  setError: (error: string | null) => void;
  setSubmitLoading: (isLoading: boolean) => void;
};

const useStore = create<ProductStore>((set) => ({
  products: [],
  product: null,
  isLoading: false,
  error: null,
  submmitLoading: false,
  setProducts: (products) => set({ products }),
  setProduct: (product) => set({ product }),
  setIsLoading: (isLoading) => set({ isLoading }),
  setError: (error) => set({ error }),
  setSubmitLoading: (isLoading) => set({ submmitLoading: isLoading }),
}));

const useProducts = () => {
  const {
    setProducts,
    setProduct,
    setIsLoading,
    setError,
    isLoading,
    error,
    products,
    product,
    submmitLoading,
    setSubmitLoading,
  } = useStore((state) => state);
  const [loadProducts, setLoadProducts] = useState(false);
  const [filter, setFilter] = useState("");

  const [cookies] = useCookies(["user"]);

  const fetchProducts = async () => {
    setIsLoading(true);
    try {
      const params = {
        [filter]: filter ? true : "",
      };
      const { data } = await api.get<ProductResponse>(`/products`, {
        headers: {
          Authorization: `Bearer ${cookies.user}`,
        },
        params,
      });
      setProducts(data.products);
    } catch (error) {
      console.log(error);
    } finally {
      setLoadProducts(false);
      setIsLoading(false);
    }
  };

  const fetchProductById = async (id: string) => {
    setIsLoading(true);
    try {
      const { data } = await api.get<{ data: Product }>(`/products/${id}`, {
        headers: {
          Authorization: `Bearer ${cookies.user}`,
        },
      });
      setProduct(data.data);
    } catch (error: any) {
      setError(error.response.data.message);
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const deleteProduct = async (id: string) => {
    setSubmitLoading(true);
    try {
      await api.delete(`/products/${id}`, {
        headers: {
          Authorization: `Bearer ${cookies.user}`,
        },
      });
      fetchProducts();
    } catch (error) {
      console.log(error);
    } finally {
      setSubmitLoading(false);
    }
  };

  const createProduct = async (product: Omit<Product, "id">) => {
    setSubmitLoading(true);
    try {
      await api.post(`/products`, product, {
        headers: {
          Authorization: `Bearer ${cookies.user}`,
        },
      });
      fetchProducts();
    } catch (error: any) {
      setError(error.response.data.message);
      console.log(error);
    } finally {
      setSubmitLoading(false);
    }
  };

  const editProduct = async (product: Product) => {
    setSubmitLoading(true);
    try {
      await api.put(`/products/${product.id}`, product, {
        headers: {
          Authorization: `Bearer ${cookies.user}`,
        },
      });
      fetchProducts();
    } catch (error: any) {
      setError(error.response.data.message);
      console.log(error);
    } finally {
      setSubmitLoading(false);
    }
  };

  const handleFetchAll = (filter?: string) => {
    setLoadProducts(true);
    setFilter(filter || "");
  };

  useEffect(() => {
    if (loadProducts) {
      (async () => await fetchProducts())();
    }
  }, [loadProducts]);

  const ProductActions = {
    edit: editProduct,
    delete: deleteProduct,
    getDetails: fetchProductById,
    create: createProduct,
    fetchAll: handleFetchAll,
  };
  return {
    products,
    product,
    isLoading,
    error,
    ProductActions,
    submmitLoading,
  };
};

export default useProducts;
