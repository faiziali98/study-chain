import React, { useEffect } from "react";
import { buttonStyle } from '../constants/styles';
import { applicationEnum } from "../constants/constants";
import { useAppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";

const ApplicationComponent = ({ setState }) => {
    const redirect = (next) => {
        setState(next);
    };

    const { getUser } = useAppContext();
    const navigate = useNavigate();

    useEffect(
        () => {
            !!getUser() && navigate('/homepage');
        // eslint-disable-next-line react-hooks/exhaustive-deps
        }, []
    );

    return (
        <div>
            <div className="loader-container" style={{ flexDirection: "column" }}>
                <h1 style={{ margin: "0px" }}>Welcome to StudyChain!</h1>
                <p>Sign up to begin the journey or login to continue with us!</p>
                <div style={{ display: "flex", columnGap: "12px" }}>
                    <button onClick={() => redirect(applicationEnum.signup)} style={{ ...buttonStyle, marginTop: "12px" }}>Sign Up</button>
                    <button onClick={() => redirect(applicationEnum.login)} style={{ ...buttonStyle, marginTop: "12px" }}>Log In</button>
                </div>
            </div>
        </div>
    )
}

export default ApplicationComponent;
