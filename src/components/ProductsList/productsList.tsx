import { useNavigate } from 'react-router-dom';
import useProducts from "../../hooks/useProducts";
import Button from '../Button/button';
import ProductItem from "../ProductItem/productItem";

const ProductsList = () => {
  const { products, isLoading } = useProducts();

  const navigate = useNavigate();

  return (
    <div>
      <h1>Products</h1>
      
        {/* <div className='flex gap-4 items-center mb-6 w-full'>
          <select
            value={gridOrList}
            onChange={(e) => setGridOrList(e.target.value as 'list' | 'grid')}
            className='rounded-lg px-4 py-2 text-sm font-bold bg-gray-900 ml-auto focus:outline-none'
          >
            <option  value='list'>List</option>
            <option  value='grid'>Grid</option>
          </select>
        </div> */}
      {isLoading && (
        <div className='flex justify-center items-center'>
          <div className='animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-gray-800'></div>
        </div>
      )}

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
            <Button onClick={() => navigate('/product/create')} variant='primary'>Create Product</Button>
          </div>
        )
      }
      
    </div>
  );
};

export default ProductsList;
