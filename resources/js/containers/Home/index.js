import React, { Fragment, useState } from "react";
import Categories from "./Categories";
import CollectionGrid from "./CollectionGrid";
import Products from "./Products";
import Header from "./Header";
import Brands from "./Brands";
import Featured from "./Featured";
import Search from "./Search";
import Navbar from "./Navbar";

const Home = () => {
    const [showSearch, setShowSearch] = useState(false);

    return (
        <>
            {
                <Fragment>
                    <Search
                        showSearch={showSearch}
                        setShowSearch={setShowSearch}
                    />
                </Fragment>
            }
            <Navbar setShowSearch={setShowSearch} />
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
