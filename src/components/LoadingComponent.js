import React, { useState, useEffect } from "react";
import AppLoader from "../components/AppLoader";

const LoadingComponent = ({showHeading, children}) => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loaderTimer = setTimeout(() => {
            setLoading(false);
        }, 3000);

        return () => {
            clearTimeout(loaderTimer);
        };
    }, []);


    return loading ? <AppLoader showHeading={showHeading} /> : children;
}

export default LoadingComponent;
