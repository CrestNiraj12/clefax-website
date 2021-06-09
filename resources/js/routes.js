import Checkout from "./containers/Checkout";
import Home from "./containers/Home";
import Product from "./containers/Product";

export default [
    { path: "/", Component: Home, exact: true, name: "Home" },
    {
        path: "/shop",
        Component: Product,
        exact: true,
        name: "Shop"
    },
    {
        path: "/shop/:title",
        Component: Product,
        exact: false,
        name: "Product"
    },
    {
        path: "/checkout",
        Component: Checkout,
        exact: false,
        name: "Checkout"
    }
    /*{
        path: "/contact-us",
        Component: Contact,
        exact: true,
        name: "Contact us",
    },
    { path: "/courses", Component: Courses, exact: true, name: "Courses" },
    {
        path: "/courses/:title",
        Component: Course,
        exact: false,
        name: "Course",
    },*/
];
