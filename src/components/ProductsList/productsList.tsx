import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useProducts from "../../hooks/useProducts";
import Button from '../Button/button';
import Loading from '../Loading/loading';
import ProductItem from "../ProductItem/productItem";

const ProductsList = () => {
  const { products, isLoading, ProductActions } = useProducts();

  const navigate = useNavigate();

  useEffect(() => {
    if (products.length === 0)
      ProductActions.fetchAll()
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
      <div className='flex justify-between items-center mb-6 max-sm:flex-col'>
        <h1 className='text-2xl font-bold mb-6'>Products</h1>
        <div className='flex gap-4 items-center max-sm:flex-col max-sm:w-full '>
          <Button onClick={ProductActions.fetchAll} variant='secondary'>Refresh</Button>
          <Button onClick={() => navigate('/product/create')} variant='primary'>Create Product</Button>
        </div>
      </div>
      {
        products.length > 0 ? (
          <div
          data-format={'list'}
          className='flex flex-wrap gap-4 w-full data-[format=list]:flex-col group'
        >
          {products.map((product, index) => (
            <ProductItem key={index} product={product} />
          ))}
        </div>) : (
          <div className='flex flex-col justify-center items-center gap-8'>
            <h1 className='text-2xl font-bold'>No Products Found</h1>
          </div>
        )
      }
      
    </div>
  );
};

export default ProductsList;
