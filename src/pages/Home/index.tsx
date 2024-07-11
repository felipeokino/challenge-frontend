import { Plus, RefreshCcw } from "lucide-react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../components/Button/button";
import ProductsList from "../../components/ProductsList/productsList";
import useProducts from "../../hooks/useProducts";

const Home = () => {
  const { products, isLoading, ProductActions } = useProducts();
  const navigate = useNavigate();

  const handleFetch = () => {
    ProductActions.fetchAll();
  };
  useEffect(() => {
    if (products.length === 0) handleFetch();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [products.length]);

  return (
    <div>
      <div className="flex justify-between items-center mb-6 max-sm:flex-col">
        <h1 className="text-2xl font-bold mb-6">Products</h1>
        <div className="flex gap-4 items-center max-sm:flex-col max-sm:w-full ">
          <Button onClick={handleFetch} variant="secondary">
            Refresh
            <RefreshCcw />
          </Button>
          <Button onClick={() => navigate("/product/create")} variant="primary">
            Product <Plus />
          </Button>
        </div>
      </div>
      <ProductsList />
    </div>
  );
};

export default Home;
