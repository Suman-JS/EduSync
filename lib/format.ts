export const formatPrice = (price: number) => {
    const localCurrency = navigator.language;
    return Intl.NumberFormat(localCurrency, {
        style: "currency",
        currency: "INR",
    }).format(price);
};
