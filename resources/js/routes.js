import Home from "./containers/Home";

export default [
    { path: "/", Component: Home, exact: true, name: "Home" },
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
