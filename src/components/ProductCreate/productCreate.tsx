import React from 'react';
import { useNavigate } from "react-router-dom";
import useProducts from '../../hooks/useProducts';
import { onlyNumbers } from '../../utils/number';
import Button from "../Button/button";
import Input from "../Input/input";
import Loading from '../Loading/loading';

type CreateProductForm =  HTMLFormElement & {
  name: HTMLInputElement;
  description: HTMLInputElement;
  price: HTMLInputElement;
}

const ProductCreate = () => {
  const navigate = useNavigate();
  const [errors, setErrors] = React.useState<Record<string, boolean | string>>({
    name: false,
    description: false,
    price: false,
  });

  const { ProductActions, error, isLoading, submmitLoading } = useProducts()

  const handleSubmit = async (e: React.FormEvent<CreateProductForm>) => {
    e.preventDefault();

    const name = e.currentTarget.name.value;
    const description = e.currentTarget.description.value;
    const price = e.currentTarget.price.value;


    if (!name.trim() || !description.trim() || !onlyNumbers(price).trim()) {
      setErrors({
        name: !name.trim(),
        description: !description.trim(),
        price: !onlyNumbers(price).trim() ? `Price must be numeric` : false,
      });
      return;
    }

      await ProductActions.create({
        name,
        description,
        price: parseFloat(price),
      }).then(() => {
        if (!error)
          navigate('/');
      })
  };

  const handleCancel = () => {
    navigate(-1);
  };

  return (
    <div>
      <h1 className="block text-2xl text-center">Product Create</h1>
      <form
        className="w-full flex flex-col gap-4 md:w-2/3 mx-auto"
        onSubmit={handleSubmit}
      >
        <Input
          error={!!errors.name}
          helperText="Name must be between 3 and 15 characters"
          id="name"
          type="text"
          title="Name"
        />
        <Input
          error={!!errors.description}
          helperText="Description must be between 3 and 100 characters"
          id="description"
          type="text"
          title="Description"
        />
        <Input
          error={!!errors.price}
          helperText={
            typeof errors.price === "string"
              ? errors.price
              : "Price must be between 1 and 10 characters"
          }
          id="price"
          type="text"
          title="Price"
        />
        <div className="w-1/3 [&>button]:w-full ml-auto flex gap-6 mt-6">
          <Button variant="ghost" onClick={handleCancel}>
            Cancel
          </Button>
          <Button type="submit">
            Create
            {submmitLoading && <Loading size="tiny" />}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ProductCreate;
