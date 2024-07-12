import { useEffect } from "react";

import Loading from "components/Loading";
import ProductsList from "components/ProductsList";
import useProducts from "hooks/useProducts";

const Logs = () => {
  const { products, isLoading, ProductActions } = useProducts();

  const handleFetch = () => {
    ProductActions.fetchAll("deleted");
  };
  useEffect(() => {
    if (products.length === 0) handleFetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [products.length]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center mt-32">
        <Loading size="medium" />
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6 bg-gray-600 fixed top-16 left-0 w-full p-4 pb-0">
        <h1 className="text-2xl font-bold mb-6">Deleted Products</h1>
      </div>
      <div className="w-full mt-20 overflow-y-auto max-sm:max-h-[500px]">
        <ProductsList />
      </div>
    </div>
  );
};

export default Logs;
