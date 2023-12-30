import React from "react";
import UserHomepageComponent from "../components/UserHomepageComponent";
import LoadingComponent from "../components/LoadingComponent";

const HomePage = () => {
    return <LoadingComponent>
        <UserHomepageComponent appType="real"/>
    </LoadingComponent>;
};

export default HomePage;
