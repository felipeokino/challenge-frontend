import useCustomNavigate from "hooks/useCustomNavigate";
import { useLocation } from "react-router-dom";

import { Product } from "types/product.types";
import { formatPrice } from "utils/number";

type ProductItemProps = {
  product: Product;
};
const ProductItem = ({ product }: ProductItemProps) => {
  const { navigate } = useCustomNavigate();
  const location = useLocation();

  const handleClick = () => {
    if (!location.pathname.includes("logs")) {
      navigate(`/product/${product.id}`);
    }
  };

  return (
    <>
      <div
        onClick={handleClick}
        className="flex flex-col w-full h-[100px] gap-2 bg-gray-800 shadow-lg p-4rounded-lg p-4 rounded-lg"
      >
        {product.deletedAt && (
          <span className="text-sm text-red-500">
            Deleted: {new Date(product.deletedAt).toLocaleDateString()}{" "}
            {new Date(product.deletedAt).toLocaleTimeString()}
          </span>
        )}
        <div className="w-full group-data-[format=list]:flex min-w-[250px] group-data-[format=grid]:w-full group-data-[format=grid]:md:max-[200px] group-data-[format=grid]:h-[200px] group-data-[format=grid]:rounded-lg mr-auto max-sm:!w-full justify-center items-center gap-4">
          <h2 className="text-2xl font-bold max-sm:text-lg">{product.name}</h2>
          <p className="text-sm max-sm:text-xs">{product.description}</p>
          <p className="text-lg font-bold group-data-[format=list]:ml-auto">
            {formatPrice(product.price)}
          </p>
        </div>
      </div>
    </>
  );
};

export default ProductItem;
