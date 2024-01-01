import React, { useState } from 'react';
import axios from 'axios';
import { buttonStyle, inputStyles } from '../constants/styles';
import { applicationEnum } from '../constants/constants';

const SignupForm = ({setState}) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
    });

    const [formErrors, setFormErrors] = useState({
        name: '',
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

        if (!formData.name.trim()) {
            errors.name = 'Name is required';
        }

        if (!formData.email.trim()) {
            errors.email = 'Email is required';
        }

        if (formData.password.length < 6) {
            errors.password = 'Password must be at least 6 characters long';
        }

        setFormErrors(errors);

        return Object.keys(errors).length === 0; // Return true if no errors
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (validateForm()) {
            try {
                const response = await axios.post('http://localhost:3001/users', formData);
                response.statusText === "Created" && setState(applicationEnum.login);
            } catch (error) {
                console.error('Error creating user:', error);
            }
        }
    };

    return (
        <div>
            <h2>Signup</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>
                        Name:
                        <input style={inputStyles} type="text" name="name" value={formData.name} onChange={handleChange} />
                    </label>
                    <span>{formErrors.name}</span>
                </div>
                <div style={{marginTop: "8px"}}>
                    <label>
                        Email:
                        <input style={inputStyles} type="email" name="email" value={formData.email} onChange={handleChange} />
                    </label>
                    <span>{formErrors.email}</span>
                </div>
                <div style={{marginTop: "8px"}}>
                    <label>
                        Password:
                        <input style={inputStyles} type="password" name="password" value={formData.password} onChange={handleChange} />
                    </label>
                    <span>{formErrors.password}</span>
                </div>
                <div>
                    <button type="submit" style={{...buttonStyle, marginTop: "12px"}}>Sign Up</button>
                </div>
            </form>
        </div>
    );
};

export default SignupForm;
