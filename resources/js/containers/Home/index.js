import React from "react";
import Categories from "./Categories";
import CollectionGrid from "./CollectionGrid";
import Featured from "./featured";
import Header from "./Header";

const Home = () => {
    return (
        <>
            <Header />
            <Categories />
            <CollectionGrid />
            <Featured />
        </>
    );
};

export default Home;
