import { useEffect } from 'react';
import Loading from '../../components/Loading/loading';
import ProductsList from '../../components/ProductsList/productsList';
import useProducts from '../../hooks/useProducts';

const Logs = () => {
  const { products, isLoading, ProductActions } = useProducts();

  const handleFetch = () => {
    ProductActions.fetchAll('deleted')
  }
  useEffect(() => {
    if (products.length === 0)
      handleFetch()
  }, [products.length])

  if (isLoading) {
    return (
      <div className='flex justify-center items-center mt-32'>
        <Loading size='medium' />
      </div>
    )
  }

  return (
    <div>
      <h1 className='text-2xl font-bold mb-6'>Deleted Products</h1>
      <ProductsList />
    </div>
  )
}

export default Logs