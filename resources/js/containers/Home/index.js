import React from "react";
import Categories from "./Categories";
import CollectionGrid from "./CollectionGrid";
import Header from "./Header";

const Home = () => {
    return (
        <>
            <Header />
            <Categories />
            <CollectionGrid />
        </>
    );
};

export default Home;
