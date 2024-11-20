import React from "react";
import { useAppContext } from "../context/AppContext";
import { buttonStyle } from '../constants/styles';
import { useNavigate } from 'react-router-dom';
import ReactPlayer from 'react-player';

const VideoTutorialComponent = () => {
    const navigate = useNavigate();
    const { getResult } = useAppContext();

    const redirectToNextPage = () => {
        navigate('/score');
    };

    const tutorials = {
        basic: "bc.mp4",
        wallet: "wallet.mp4",
        navigation: "nav.mp4"
    }

    return (
        <div>
            <div className="loader-container" style={{ flexDirection: "column", maxWidth: "840px" }}>
                <h1>This is a tutorial of blockchain</h1>
                <ReactPlayer
                    url={`/${tutorials[getResult()]}`}
                    controls={true}
                    width="100%"
                    height="100%"
                />
                <h2 style={{marginBottom: "4px"}}>Once completed, click start to continue.</h2>
                <button onClick={() => redirectToNextPage()} style={{...buttonStyle, marginTop: "12px"}}>Start</button>
            </div>
        </div>
    )
}

export default VideoTutorialComponent;
