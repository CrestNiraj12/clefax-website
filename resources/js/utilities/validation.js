export const validateEmail = values => {
    const errors = {};

    if (!values.email) errors.email = "Email address is required";
    else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
        errors.email = "Email address is invalid";
    }

    return errors;
};

export const validatePaymentEmails = values => {
    const errors = {};

    if (!values.paypal_email)
        errors.paypal_email = "Paypal account is required";
    else if (
        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.paypal_email)
    ) {
        errors.paypal_email = "Email address is invalid";
    }

    if (!values.stripe_email)
        errors.stripe_email = "Stripe account is required";
    else if (
        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.stripe_email)
    ) {
        errors.stripe_email = "Email address is invalid";
    }

    return errors;
};

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

export const validateLogin = values => {
    const errors = {};

    if (!values.email) errors.email = "Email address is required";

    if (!values.password) errors.password = "Password is required";
    return errors;
};

export const validateSignup = values => {
    const errors = {};

    if (!values.fullname) errors.fullname = "Fullname is required";
    if (!values.email) errors.email = "Email address is required";
    else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
        errors.email = "Email address is invalid";
    }
    if (!values.password) errors.password = "Password is required";
    else if (!/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/i.test(values.password)) {
        errors.password = "Password format is invalid";
    }
    if (!values.sq_id) errors.sq_id = "Please select a security question";
    if (!values.sq_id && values.sq_answer)
        errors.sq_answer = "Please select a security question first";
    if (values.sq_id && !values.sq_answer)
        errors.sq_answer = "Please answer your security question";
    if (!values.terms)
        errors.terms = "Please agree to our terms and conditions";
    return errors;
};

export const validateShop = values => {
    const errors = {};

    if (!values.name) errors.name = "Shop name is required";
    if (!values.street_no) errors.street_no = "Street address is required";
    if (!values.city) errors.city = "City is required";

    if (!values.PAN) errors.PAN = "Registration number is required";
    if (!values.logo) errors.logo = "Logo is required";
    return errors;
};

export const validateDetails = values => {
    const errors = {};

    if (
        values.email &&
        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
    ) {
        errors.email = "Email address is invalid";
    }

    if (values.old_password) {
        if (!values.password) errors.password = "Password is required";
        if (!/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/i.test(values.password)) {
            errors.password = "Password format is invalid";
        }
        if (!values.password_confirmation)
            errors.password = "Password confirmation is required";
        if (values.password !== values.password_confirmation) {
            errors.password_confirmation =
                "Please make sure your passwords match";
        }
    }

    return errors;
};
