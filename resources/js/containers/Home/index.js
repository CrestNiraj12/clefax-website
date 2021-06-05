import React from "react";
import Categories from "./Categories";
import CollectionGrid from "./CollectionGrid";
import Products from "./Products";
import Header from "./Header";
import Brands from "./Brands";
import Featured from "./Featured";
import Navbar from "./Navbar";

const Home = () => {
    return (
        <>
            <Navbar />
            <Header />
            <Categories />
            <CollectionGrid />
            <Products />
            <Brands />
            <Featured />
        </>
    );
};

export default Home;
