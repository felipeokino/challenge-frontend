import { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { create } from 'zustand';
import { Product, ProductResponse } from '../types/product.types';
import api from '../utils/api';

type ProductStore = {
  products: Product[]
  product: Product | null
  isLoading: boolean
  error: string | null
  setProducts: (products: Product[]) => void
  setProduct: (product: Product | null) => void
  setIsLoading: (isLoading: boolean) => void
  setError: (error: string | null) => void
}

const useStore = create<ProductStore>((set) => ({
  products: [],
  product: null,
  isLoading: false,
  error: null,
  setProducts: (products) => set({ products }),
  setProduct: (product) => set({ product }),
  setIsLoading: (isLoading) => set({ isLoading }),
  setError: (error) => set({ error }),
}));

const useProducts = () => {
  const { setProducts, setProduct, setIsLoading, setError, isLoading, error, products, product } = useStore((state) => state);
  const [ loadProducts, setLoadProducts ] = useState(false);

  const [cookies] = useCookies(['user']);

  const fetchProducts = async () => {
    setIsLoading(true)
    try {
      const { data } = await api.get<ProductResponse>(`/products`, {
        headers: {
          'Authorization': `Bearer ${cookies.user}`
        }
      })
      setProducts(data.products)
    } catch (error) {
      console.log(error)
    } finally {
      setLoadProducts(false)
      setIsLoading(false)
    }
  }

  const fetchProductById = async (id: string) => {
    setIsLoading(true)
    try {
      const { data } = await api.get<{data: Product}>(`/products/${id}`, {
        headers: {
          'Authorization': `Bearer ${cookies.user}`
        }
      })
      setProduct(data.data)
    } catch (error: any) {
      setError(error.response.data.message)
      console.log(error)
    } finally {
      setIsLoading(false)
    }
  }

  const deleteProduct = async (id: string) => {
    setIsLoading(true)
    try {
      await api.delete(`/products/${id}`, {
        headers: {
          'Authorization': `Bearer ${cookies.user}`
        }
      })
      fetchProducts()
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoading(false)
    }
  }

  const createProduct = async (product: Omit<Product, 'id'>) => {
    setIsLoading(true)
    try {
      await api.post(`/products`, product, {
        headers: {
          'Authorization': `Bearer ${cookies.user}`
        }
      })
      fetchProducts()
    } catch (error: any) {
      setError(error.response.data.message)
      console.log(error)
    } finally {
      setIsLoading(false)
    }
  }

  const editProduct = async (product: Product) => {
    setIsLoading(true)
    try {
      await api.put(`/products/${product.id}`, product, {
        headers: {
          'Authorization': `Bearer ${cookies.user}`
        }
      })
      fetchProducts()
    } catch (error: any) {
      setError(error.response.data.message)
      console.log(error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => { 
    if (loadProducts) {
      (async () => await fetchProducts())()
    }
  }, [loadProducts])

  const ProductActions = {
    edit: editProduct,
    delete: deleteProduct,
    getDetails: fetchProductById,
    create: createProduct,
    fetchAll: () => setLoadProducts(true)
  }
  return {
    products,
    product,
    isLoading,
    error,
    ProductActions
  }
}

export default useProducts