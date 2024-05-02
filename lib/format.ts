export const formatPrice = (price: number) => {
    return Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: "INR",
    }).format(price);
};
