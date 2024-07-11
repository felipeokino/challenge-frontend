import React, { useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { Product, ProductResponse } from '../types/product.types';
import api from '../utils/api';


const useProducts = () => {
  const [products, setProducts] = React.useState<Product[]>([])
  const [product, setProduct] = React.useState<Product | null>(null)
  const [cookies] = useCookies(['user']);
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const fetchProducts = async () => {
    setIsLoading(true)
    try {
      const { data } = await api.get<ProductResponse>(`/products`, {
        headers: {
          'Authorization': `Bearer ${cookies.user}`
        }
      })
      console.log(data)
      // setProducts(data.products)
    } catch (error) {
      console.log(error)
    } finally {
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

  useEffect(() => {
    (async () => await fetchProducts())()
  }, [])

  const ProductActions = {
    edit: () => {},
    delete: deleteProduct,
    getDetails: fetchProductById,
    create: () => {}
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