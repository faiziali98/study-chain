import React from "react";
import LandingComponent from "../components/LandingComponent";
import LoadingComponent from "../components/LoadingComponent";

const LandingPage = () => {
    return <LoadingComponent showHeading>
        <LandingComponent />
    </LoadingComponent>
};

export default LandingPage;
