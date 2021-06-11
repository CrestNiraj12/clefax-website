export const validateForm = values => {
    const errors = {};
    if (!values.fullname) errors.fullname = "Name is required";

    if (!values.email) errors.email = "Email is required";
    else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
        errors.email = "Email address is invalid";
    }

    if (!values.phone) errors.phone = "Phone number is required";
    else if (
        !/^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/i.test(values.phone)
    ) {
        errors.phone = "Phone number is invalid";
    }
    if (!values.street_no) errors.street_no = "Street address is required";
    if (!values.address) errors.address = "Town / City is required";
    if (!values.date) errors.date = "Collection date is required";
    if (!values.collection_id)
        errors.collection_id = "Collection slot is required";
    return errors;
};

export const validateContactForm = values => {
    const errors = {};
    if (!values.fullname) errors.fullname = "Name is required";

    if (!values.email) errors.email = "Email is required";
    else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
        errors.email = "Email address is invalid";
    }

    if (!values.phone) errors.subject = "Subject is required";
    if (!values.message) errors.message = "Message is required";
    return errors;
};

export const isValidDate = date => {
    var dateObj = new Date();
    var month = dateObj.getUTCMonth();
    var day = dateObj.getUTCDate();
    var year = dateObj.getUTCFullYear();
    return (
        date >= new Date(year, month, day) &&
        (date.getDay() == 3 || date.getDay() == 4 || date.getDay() == 5)
    );
};
