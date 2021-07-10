import Checkout from "./containers/Checkout";
import Home from "./containers/Home";
import Product from "./containers/Product";
import Invoice from "./containers/Invoice";
import Contact from "./containers/Contact";
import Cart from "./containers/Cart";
import Wishlist from "./containers/Wishlist";
import Vendors from "./containers/Vendors";
import Shop from "./containers/Shop";
import NotFound from "./containers/NotFound";
import Account from "./containers/Account";
import LogoutProcess from "./containers/LogoutProcess";

export default [
    { path: "/", Component: Home, exact: true, name: "Home" },
    { path: "/logout", Component: LogoutProcess, exact: true, name: "Home" },
    {
        path: "/shop",
        Component: Shop,
        exact: true,
        name: "Shop"
    },
    {
        path: "/shop/search",
        Component: Shop,
        exact: false,
        name: "Search results"
    },
    {
        path: "/shop/products",
        Component: Shop,
        exact: false,
        name: "Shop products"
    },
    {
        path: "/shop/:name",
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
        Component: Vendors,
        exact: true,
        name: "Shop Listing"
    },
    {
        path: "/account",
        Component: Account,
        exact: true,
        name: "My Account"
    },
    {
        path: "/*",
        Component: NotFound,
        exact: true,
        name: "Page Not Found"
    }
];
