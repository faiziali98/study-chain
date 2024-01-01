import React from "react";
import { buttonStyle } from '../constants/styles';
import { useNavigate } from 'react-router-dom';

const LandingComponent = () => {
    const navigate = useNavigate();

    const redirectToNextPage = () => {
        navigate('/initial-survey');
    };

    return (
        <div>
            <div className="loader-container" style={{ flexDirection: "column" }}>
                <h1 style={{margin: "0px"}}>Lets begin!</h1>
                <p>We will first take survey to know your understanding of blockchain.</p>
                <button onClick={() => redirectToNextPage()} style={{...buttonStyle, marginTop: "12px"}}>Start</button>
            </div>
        </div>
    )
}

export default LandingComponent;
