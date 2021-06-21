import axios from "axios";

export const getFinalPrice = product => {
    return product.discount && product.discount > 0
        ? product.price - (product.discount / 100) * product.price
        : product.price;
};

export const searchQuery = (arr, q, key = "title") => {
    return arr.filter(elem =>
        q.split(" ").some(word => {
            if (word.length)
                return elem[key].toLowerCase().includes(word.toLowerCase());
        })
    );
};

export const apiClient = axios.create({
    withCredentials: true
});
