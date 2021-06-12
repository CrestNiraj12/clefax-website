import Checkout from "./containers/Checkout";
import Home from "./containers/Home";
import Product from "./containers/Product";
import Invoice from "./containers/Invoice";
import Contact from "./containers/Contact";
import Cart from "./containers/Cart";
import Wishlist from "./containers/Wishlist";
import Stores from "./containers/Stores";

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
    },
    {
        path: "/invoice",
        Component: Invoice,
        exact: false,
        name: "Invoice"
    },
    {
        path: "/contact",
        Component: Contact,
        exact: true,
        name: "Contact us"
    },
    {
        path: "/cart",
        Component: Cart,
        exact: true,
        name: "Cart"
    },
    {
        path: "/wishlist",
        Component: Wishlist,
        exact: true,
        name: "Wishlist"
    },
    {
        path: "/vendors",
        Component: Stores,
        exact: true,
        name: "Store Listing"
    }
];
