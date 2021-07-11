import axios from "axios";

export const getFinalPrice = product => {
    return product.discount && product.discount > 0
        ? product.price - (product.discount / 100) * product.price
        : product.price;
};

export const generateUrl = (id, name) => {
    return (
        "/shop/" +
        (name
            .split(" ")
            .map(w => w.toLowerCase())
            .join("-") +
            "-" +
            id)
    );
};

export const getIdFromUrl = url => {
    return url.split("-").pop();
};

export const searchQuery = (arr, q, key = "name") => {
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

export const sendMail = (templateId, data) => {
    const serviceId = "service_tsk23ym";
    const userID = "user_letDmYNuMuPxGYCxnn6RC";
    emailjs
        .send(serviceId, templateId, data, userID)
        .then(res => {
            console.log("Email successfully sent!");
        })
        .catch(err =>
            console.error(
                "Oh well, you failed. Here some thoughts on the error that occured:",
                err
            )
        );
};

export const getLoginRedirection = () => {
    return `/login?r=${location.pathname}`;
};

export const getAvgReviews = reviews => {
    return reviews && reviews.length
        ? reviews.map(r => r.rating).reduce((r1, r2) => r1 + r2) /
              reviews.length
        : 0;
};
