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

    if (!values.subject) errors.subject = "Subject is required";
    if (!values.message) errors.message = "Message is required";
    return errors;
};

export const isValidDate = (date, slots) => {
    var dateObj = new Date();
    var month = dateObj.getUTCMonth();
    var day = dateObj.getUTCDate();
    var year = dateObj.getUTCFullYear();
    return (
        date >= new Date(year, month, day) &&
        slots.some(slot => slot.days.includes(date.getDay()))
    );
};

export const isValidTime = (date, times, days) => {
    if (!date) return true;
    if (!days.includes(date.getDay())) return true;
    const todayWith24hours = new Date();
    todayWith24hours.setDate(todayWith24hours.getDate() + 1);
    const selected = date.setHours(times.substr(0, 2));
    return todayWith24hours >= selected;
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

    if (!values.fullname) errors.fullname = "Please enter your name";

    if (!values.phone) errors.phone = "Please enter your phone number";
    if (!values.address) errors.address = "Please enter your address";

    if (
        values.email &&
        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
    ) {
        errors.email = "Email address is invalid";
    }
    if (!values.dob) errors.dob = "Please enter your date of birth";
    if (!values.gender) errors.gender = "Please enter your gender";

    if (values.password) {
        validatePasswords(values);
    }

    return errors;
};

export const validatePasswords = values => {
    const errors = {};

    if (!values.password) errors.password = "Password is required";
    if (!values.new_password) errors.new_password = "New password is required";
    if (!/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/i.test(values.new_password)) {
        errors.new_password = "Password format is invalid";
    }
    if (!values.new_password_confirmation)
        errors.new_password_confirmation = "Password confirmation is required";
    if (values.new_password !== values.new_password_confirmation) {
        errors.new_password_confirmation =
            "Please make sure your passwords match";
    }

    return errors;
};

export const validateReview = values => {
    const errors = {};
    if (!values.rating) errors.rating = "Please provide a rating";
    if (!values.comment) errors.comment = "Say something about the product";
    return errors;
};
