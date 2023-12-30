import React, { useState } from "react";
import { useAppContext } from "../context/AppContext";
import { buttonStyle } from "../constants/styles";

const SettingsComponent = ({ dataSource, signedUp }) => {
    const { getUser } = useAppContext();
    const [result, setResult] = useState(signedUp ? "Registered!" : null);

    return (
        <div>
            {
                result
                    ? <h3>{result}</h3>
                    : <button onClick={() => dataSource.signUp(getUser().name, setResult)} style={{ ...buttonStyle, marginTop: "12px" }}>
                        Register your wallet!
                    </button>
            }
        </div>
    )
}

export default SettingsComponent;
