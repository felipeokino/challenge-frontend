import Loading from "components/Loading";
import ProductItem from "components/ProductItem";
import useProducts from "hooks/useProducts";
import { CircleX } from "lucide-react";

const ProductsList = () => {
  const { products, isLoading } = useProducts();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center mt-32">
        <Loading size="medium" />
      </div>
    );
  }
  return (
    <div>
      {products.length > 0 ? (
        <div
          data-format={"list"}
          className="flex flex-wrap gap-4 w-full data-[format=list]:flex-col group"
        >
          {products.map((product, index) => (
            <ProductItem key={index} product={product} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col justify-center items-center mt-32 gap-2">
          <h1 className="text-2xl font-bold">No Products Found</h1>
          <CircleX size={52} />
        </div>
      )}
    </div>
  );
};

export default ProductsList;
