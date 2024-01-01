import React, { useState } from 'react';
import axios from 'axios';
import { buttonStyle, inputStyles } from '../constants/styles';
import { useAppContext } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';


const LoginForm = () => {
    const { updateUser } = useAppContext();
    const navigate = useNavigate();
    
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const [formErrors, setFormErrors] = useState({
        email: '',
        password: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const validateForm = () => {
        const errors = {};

        if (!formData.email.trim()) {
            errors.email = 'Email is required';
        }

        if (!formData.password.trim()) {
            errors.password = 'Password is required';
        }

        setFormErrors(errors);

        return Object.keys(errors).length === 0; // Return true if no errors
    };

    const handleLogin = async (e) => {
        e.preventDefault();

        if (validateForm()) {
            try {
                const {data} = await axios.post('http://localhost:3001/login', formData);
                if (data.message === "Login successful") {
                    updateUser(data.user);
                    navigate("/homepage");
                }
            } catch (error) {
                console.error('Error logging in:', error.response.data);
            }
        }
    };

    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={handleLogin}>
                <div>
                    <label>
                        Email:
                        <input style={inputStyles} type="email" name="email" value={formData.email} onChange={handleChange} />
                    </label>
                    <span>{formErrors.email}</span>
                </div>
                <div style={{ marginTop: "8px" }}>
                    <label>
                        Password:
                        <input style={inputStyles} type="password" name="password" value={formData.password} onChange={handleChange} />
                    </label>
                    <span>{formErrors.password}</span>
                </div>
                <div>
                    <button style={{ ...buttonStyle, marginTop: "12px" }} type="submit">Log In</button>
                </div>
            </form>
        </div>
    );
};

export default LoginForm;
