import useProducts from "../../hooks/useProducts";
import Loading from '../Loading/loading';
import ProductItem from "../ProductItem/productItem";


const ProductsList = () => {
  const { products, isLoading, ProductActions } = useProducts();

  if (isLoading) {
    return (
      <div className='flex justify-center items-center mt-32'>
        <Loading size='medium' />
      </div>
    )
  }
  return (
    <div>
      
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
