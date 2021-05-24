export const getFinalPrice = product => {
    return product.discount && product.discount > 0
        ? product.price - (product.discount / 100) * product.price
        : product.price;
};
