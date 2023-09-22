const priceFormater = (qty) => {
  return qty.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  });
};

export { priceFormater };
