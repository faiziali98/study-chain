import React, { useEffect, useState } from "react";
import { useAppContext } from "../context/AppContext";
import { useNavigate } from 'react-router-dom';
import { buttonStyle } from '../constants/styles';
import logo from '../logo.svg';
import '../css/Loader.css';

const ShowScore = () => {
    const { getResult } = useAppContext();
    const navigate = useNavigate();
    const [passed, setPassed] = useState(false);
    const [showNext, setShowNext] = useState(false);

    useEffect(() => {
        if (getResult() >= 0) {
            setPassed(true);
        } else {
            setShowNext(true);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const redirectToNextPage = () => {
        navigate(`/${passed ? "application" : 'initial-survey'}`);
    };

    return (
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                {passed ? <div className="congratulations-container">
                    Congratulations, you can continue to the application. <br />
                    <a onClick={() => setShowNext(true)} style={{ color: 'blue', cursor: "pointer", }} rel="noreferrer" target="_blank" href="https://docs.google.com/forms/d/e/1FAIpQLSeNWXAM_3Rg6xRUOqpA-SQ0CWoYZuv_iOHlOTGMBah628Nihg/viewform?embedded=true">Kindly fill this survey before moving forward. </a>
                </div> : <div className="congratulations-container"> Sorry that there was no improvement, press continue to take the surveys again!  </div>}
                {showNext && <button onClick={() => redirectToNextPage()} style={{ ...buttonStyle, marginTop: "12px" }}>Continue</button>}
            </header>
        </div>
    )
}

export default ShowScore;
