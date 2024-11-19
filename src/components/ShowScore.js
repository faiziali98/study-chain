import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { buttonStyle } from '../constants/styles';
import logo from '../logo.svg';
import '../css/Loader.css';

const ShowScore = () => {
    const navigate = useNavigate();
    const passed = true;

    const redirectToNextPage = () => {
        navigate(`/${passed ? "demo" : 'initial-survey'}`);
    };

    return (
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                {passed ? <div className="congratulations-container">
                    <h3 style={{margin: "0px", marginBottom: "4px"}}>Congratulations, you can continue to the application.</h3>
                    Click continue to access the demo account.
                </div> : <div className="congratulations-container"> Sorry that there was no improvement, press continue to take the surveys again!  </div>}
                <button onClick={() => redirectToNextPage()} style={{ ...buttonStyle, marginTop: "12px" }}>Continue</button>
            </header>
        </div>
    )
}

export default ShowScore;
