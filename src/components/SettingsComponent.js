import React, { useState } from "react";
import { useAppContext } from "../context/AppContext";
import axios from "axios";
import { buttonStyle } from "../constants/styles";

const SettingsComponent = ({ dataSource, signedUp, handleRegisterDemo }) => {
    const { getUser, updateUser } = useAppContext();
    const [result, setResult] = useState(signedUp ? "Registered!" : null);
    const [selectedOption, setSelectedOption] = useState('');

    const handleSelectChange = (event) => {
        setSelectedOption(event.target.value);
    };

    const updateUserDB = async (walletAddress) => {
        const newUser = await axios.put(`http://localhost:3001/users/${getUser()._id}`, {walletAddress});
        updateUser(newUser);
    }

    return (
        <div style={{ minWidth: "90vw", minHeight: "90vh", display: "flex", flexDirection: "column", alignSelf: "center", alignItems: "center", justifyContent: "center" }}>
            {
                result
                    ? <h3>{result}</h3>
                    : <div style={{ display: "flex", flexDirection: "column", maxWidth: "88vw", alignItems: "center" }}>
                        <h3> Select from available wallets to register with. You can only register one wallet with one account. Also one wallet can only be used with one account. </h3>
                        <select style={{
                            padding: '8px',
                            fontSize: '16px',
                            borderRadius: '5px',
                            border: '1px solid #ccc',
                            backgroundColor: '#fff',
                            cursor: 'pointer',
                        }} id="dropdown" value={selectedOption} onChange={handleSelectChange}>
                            <option value="">Select...</option>
                            {dataSource.getAllAccounts().map((val) => <option value={val}>{val}</option>)}
                        </select>
                        <button onClick={() => {
                            dataSource.signUp(getUser().name, setResult, selectedOption, updateUserDB);
                            handleRegisterDemo();
                        }} style={{ ...buttonStyle, marginTop: "12px" }}>
                            Register your wallet!
                        </button>
                    </div>
            }
        </div>
    )
}

export default SettingsComponent;
