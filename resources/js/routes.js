import Home from "./containers/Home";
import Product from "./containers/Product";

export default [
    { path: "/", Component: Home, exact: true, name: "Home" },
    {
        path: "/products/:title",
        Component: Product,
        exact: false,
        name: "Product"
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
