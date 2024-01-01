import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { buttonStyle } from '../constants/styles';
import logo from '../logo.svg';
import '../css/Loader.css';

const UserExperienceSurveyComponent = () => {
    const navigate = useNavigate();
    const [showNext, setShowNext] = useState(false);

    const redirectToNextPage = () => {
        navigate('/application');
    };

    return (
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <div className="congratulations-container">
                    You can continue to the application after filling the experience survey. <br />
                    <a onClick={() => setShowNext(true)} style={{ color: 'blue', cursor: "pointer", }} rel="noreferrer" target="_blank" href="https://docs.google.com/forms/d/e/1FAIpQLSeNWXAM_3Rg6xRUOqpA-SQ0CWoYZuv_iOHlOTGMBah628Nihg/viewform?embedded=true"> Kindly fill this survey before moving forward. </a>
                </div>
                {showNext && <button onClick={() => redirectToNextPage()} style={{ ...buttonStyle, marginTop: "12px" }}>Continue</button>}
            </header>
        </div>
    )
}

export default UserExperienceSurveyComponent;
