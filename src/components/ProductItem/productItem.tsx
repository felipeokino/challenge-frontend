import { useNavigate } from 'react-router-dom';
import { Product } from '../../types/product.types';

type ProductItemProps = {
  product: Product
}
const ProductItem = ({ product}: ProductItemProps) => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`/product/${product.id}`)
  }
  return (
    <div onClick={handleClick} className='w-full h-[100px] items-center gap-6 bg-gray-800 shadow-lg p-4 rounded-lg group-data-[format=list]:flex min-w-[250px] group-data-[format=grid]:w-full group-data-[format=grid]:md:max-[200px] group-data-[format=grid]:h-[200px] group-data-[format=grid]:rounded-lg mr-auto max-sm:!w-full '>
      <h2 className='text-2xl font-bold'>{product.name}</h2>
      <p className='text-sm'>{product.description}</p>
      <p className='text-lg font-bold group-data-[format=list]:ml-auto'>${product.price}</p>
    </div>
  )
}

export default ProductItem