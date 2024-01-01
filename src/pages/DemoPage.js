import React, { useEffect, useState } from "react";
import UserHomepageComponent from "../components/UserHomepageComponent";
import { useAppContext } from "../context/AppContext";

const DemoPage = () => {
    const { updateUser } = useAppContext();
    const [userAdded, setUserAdded] = useState(false);

    useEffect(() => {
        updateUser({ name: "demo" });
        setUserAdded(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    
    return userAdded && <UserHomepageComponent isDemo />
};

export default DemoPage