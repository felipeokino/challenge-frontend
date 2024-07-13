/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";

import Button from "components/Button";
import Loading from "components/Loading";
import useCustomNavigate from "hooks/useCustomNavigate";
import useProducts from "hooks/useProducts";
import { formatPrice } from "utils/number";
import { routes } from "utils/routes";

const ProductDetail = () => {
  const { id } = useParams();
  const { isLoading, product, ProductActions, error } = useProducts();
  const { navigate, goBack } = useCustomNavigate();
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    if (id) {
      ProductActions.getDetails(id);
    }
  }, [id]);

  if (!id) return <Navigate to={routes.home} />;

  if (isLoading)
    return (
      <div className="flex justify-center items-center">
        <Loading size="small" />
      </div>
    );

  const handleEdit = () => {
    navigate(`/product/${id}/edit`);
  };

  const handleDelete = () => {
    if (!isDeleting) {
      setIsDeleting(true);
      return;
    }
    ProductActions.delete(id).then(goBack);
  };

  if (error) {
    return (
      <div className="text-white text-2xl flex flex-col justify-center items-center gap-6 w-full mt-28">
        {error}
        <Button onClick={goBack} variant="secondary">
          Back
        </Button>
      </div>
    );
  }

  if (product?.deletedAt) {
    return (
      <div className="text-white text-2xl flex flex-col justify-center items-center gap-6 w-full mt-28">
        <h1 className="text-2xl font-bold">Product Deleted</h1>
        <Button onClick={goBack} variant="secondary">
          Back
        </Button>
      </div>
    );
  }

  return (
    <div>
      {product && (
        <div>
          <h1 className="text-3xl font-bold">{product.name}</h1>
          <div>
            <div className="w-full flex justify-center items-center h-[250px] bg-gray-600 my-4 rounded-lg shadow-lg">
              <span>Product Image</span>
            </div>
          </div>
          <p className="text-lg">{product.description}</p>
          <p className="text-2xl text-end">{formatPrice(product.price)}</p>
        </div>
      )}
      <footer className="flex justify-center items-center mt-10 gap-4 max-sm:flex-col md:justify-end">
        <Button onClick={goBack} variant="ghost">
          Back
        </Button>
        {!product?.deletedAt && <Button onClick={handleEdit}>Edit</Button>}
        <Button variant="danger" onClick={handleDelete}>
          Delete
        </Button>
      </footer>

      {isDeleting && (
        <div
          id="modal"
          className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50 z-10 flex justify-center items-center"
          onClick={(e) => {
            e.currentTarget === e.target && setIsDeleting(false);
          }}
        >
          <div className="flex flex-col justify-center items-center gap-4 p-8 rounded-lg bg-white shadow-lg">
            <h1 className="text-gray-800 text-lg">
              Are you sure you want to delete this product?
            </h1>
            <Button variant="danger" onClick={handleDelete}>
              Delete
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetail;
