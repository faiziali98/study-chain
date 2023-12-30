import React, { useState } from "react";
import { useAppContext } from "../context/AppContext";
import { buttonStyle } from "../constants/styles";

const SettingsComponent = ({ dataSource, signedUp, handleRegisterDemo }) => {
    const { getUser } = useAppContext();
    const [result, setResult] = useState(signedUp ? "Registered!" : null);

    return (
        <div style={{ minWidth: "90vw", minHeight: "90vh", display: "flex", flexDirection: "column", alignSelf: "center", alignItems:"center", justifyContent: "center" }}>
            {
                result
                    ? <h3>{result}</h3>
                    : <button onClick={() => {
                        dataSource.signUp(getUser().name, setResult);
                        handleRegisterDemo();
                    }} style={{ ...buttonStyle, marginTop: "12px" }}>
                        Register your wallet!
                    </button>
            }
        </div>
    )
}

export default SettingsComponent;
