export const formatPrice = (price: number) => {
  return price.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  });
};

export const onlyNumbers = (value: string) => {
  return value.replace(/[^0-9]/g, "");
};