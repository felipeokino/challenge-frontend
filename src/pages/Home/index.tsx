import Button from "components/Button";
import ProductsList from "components/ProductsList";
import useProducts from "hooks/useProducts";
import { Plus, RefreshCcw } from "lucide-react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const { products, ProductActions } = useProducts();
  const navigate = useNavigate();

  const handleFetch = () => {
    ProductActions.fetchAll();
  };
  useEffect(() => {
    if (products.length === 0) handleFetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [products.length]);

  return (
    <div className="">
      <div className="flex justify-between items-center mb-6 max-sm:flex-col w-full fixed top-16 left-0 bg-gray-600 p-4">
        <h1 className="text-2xl font-bold mb-6">Products</h1>
        <div className="flex gap-4 items-center max-sm:flex-col max-sm:w-full">
          <Button onClick={handleFetch} variant="secondary">
            Refresh
            <RefreshCcw />
          </Button>
          <Button onClick={() => navigate("/product/create")} variant="primary">
            Product <Plus />
          </Button>
        </div>
      </div>
      <div className="overflow-y-auto max-sm:mt-44 md:mt-20">
        <ProductsList />
      </div>
    </div>
  );
};

export default Home;
