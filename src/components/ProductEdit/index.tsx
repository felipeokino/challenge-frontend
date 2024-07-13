/* eslint-disable react-hooks/exhaustive-deps */
import Button from "components/Button";
import Input from "components/Input";
import Loading from "components/Loading";
import { FormEvent, useEffect, useRef, useState } from "react";
import { Navigate, useParams } from "react-router-dom";

import useCustomNavigate from "hooks/useCustomNavigate";
import useProducts from "hooks/useProducts";
import { ProductForm } from "types/form.types";
import { formatNumber, onlyNumbers } from "utils/number";
import { routes } from "utils/routes";

const ProductEdit = () => {
  const { id } = useParams();
  const { navigate, goBack, goHome } = useCustomNavigate();
  const [errors, setErrors] = useState<Record<string, boolean | string>>({
    name: false,
    description: false,
    price: false,
  });

  const { ProductActions, error, product, submmitLoading } = useProducts();

  const formRef = useRef<ProductForm>(null);

  const loadFormData = () => {
    if (product) {
      if (product.deletedAt) {
        return navigate("/logs");
      }

      const { name, description, price } = product;
      if (formRef.current) {
        formRef.current.name.value = name;
        formRef.current.description.value = description;
        formRef.current.price.value = formatNumber(price.toString());
      }
    }
  };

  const handleSubmit = async (e: FormEvent<ProductForm>) => {
    e.preventDefault();

    const {
      name: { value: name },
      description: { value: description },
      price: { value: price },
    } = e.currentTarget;

    if (!name.trim() || !description.trim() || !onlyNumbers(price).trim()) {
      setErrors({
        name: !name.trim(),
        description: !description.trim(),
        price: !onlyNumbers(price).trim() ? `Price must be numeric` : false,
      });
      return;
    }

    if (product) {
      await ProductActions.edit({
        id: product!.id,
        name,
        description,
        price: parseFloat(price),
      }).then(() => {
        if (!error) goHome();
      });
    }
  };

  useEffect(() => {
    if (!product && id) {
      ProductActions.getDetails(id);
      return;
    }
    loadFormData();
  }, [product, id]);

  if (!id) return <Navigate to={routes.home} />;

  return (
    <div>
      <h1 className="block text-2xl text-center">Product Edit</h1>
      <form
        ref={formRef}
        className="w-full flex flex-col gap-4 md:w-2/3 mx-auto"
        onSubmit={handleSubmit}
      >
        <Input
          error={Boolean(errors.name)}
          helperText="Name must be between 3 and 15 characters"
          id="name"
          type="text"
          title="Name"
        />
        <Input
          error={Boolean(errors.description)}
          helperText="Description must be between 3 and 100 characters"
          id="description"
          type="text"
          title="Description"
        />
        <Input
          prefix="$"
          error={Boolean(errors.price)}
          helperText={
            typeof errors.price === "string"
              ? errors.price
              : "Price must be between 1 and 10 characters"
          }
          id="price"
          type="text"
          title="Price"
          onChange={(e) => {
            const price = e.target.value;

            e.target!.value = formatNumber(price);
          }}
        />
        <div className="w-1/3 [&>button]:w-full ml-auto flex gap-6 mt-6 max-sm:flex-col max-sm:w-full">
          <Button variant="ghost" onClick={goBack}>
            Cancel
          </Button>
          <Button type="submit">
            Save
            {submmitLoading && <Loading size="tiny" />}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ProductEdit;
