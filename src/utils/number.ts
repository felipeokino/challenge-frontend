export const formatPrice = (price: number) => {
  return price.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  });
};

export const onlyNumbers = (value: string) => {
  return value.replace(/[^0-9]/g, "");
};

export const formatNumber = (value: string) => {
  let digits = value.replace(/\D/g, "");
  if (digits === " " || digits === "" || digits === "0") return "";

  if (digits[0] === "0") digits = digits.slice(1);

  if (digits.length <= 2) {
    return `0.${digits}`;
  }

  let formatted = digits.slice(0, -2) + "." + digits.slice(-2);

  return formatted;
};
