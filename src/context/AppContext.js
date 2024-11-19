import React, { useState, useContext } from 'react';
import Cookies from 'js-cookie';

// Create a context to hold the form values
const AppContext = React.createContext();

// Create a context provider component
export const AppProvider = ({ children }) => {
    const [formValues, setFormValues] = useState({
        basic: {},
        wallet: {},
        navigation: {}
    });

    const [user, setUser] = useState(null);

    const saveContextToCookie = () => {
        Cookies.set('formValues', JSON.stringify(formValues));
        Cookies.set('user', JSON.stringify(user));
    }

    const loadContextFromCookie = (setInitializing) => {
        setFormValues(JSON.parse(Cookies.get('formValues') || '{}'));
        !!user && setUser(JSON.parse(Cookies.get('user') || '{}'));
        setInitializing(false);
    }

    const updateFormValues = (surveyId, question, value) => {
        setFormValues((prevValues) => ({
            ...prevValues,
            [surveyId]: {
                ...prevValues[surveyId],
                [question]: value,
            },
        }));
    };

    const updateUser = (userVal) => setUser(userVal);
    const getUser = () => user;

    const getResult = () => {
        const toImprove = Object.keys(formValues).map((section) => [
            section, Object.keys(formValues[section]).reduce((accumulator, key) => (
                accumulator + formValues[section][key]
            ), 0)
        ]).reduce((a, b) => a[1] < b[1] ? b : a);

        console.log(Object.keys(formValues).map((section) => [
            section, Object.keys(formValues[section]).reduce((accumulator, key) => (
                accumulator + formValues[section][key]
            ), 0)
        ]))
    
        return toImprove[0];
    }

    return (
        <AppContext.Provider 
            value={{ 
                formValues, updateFormValues, getResult, updateUser, getUser,
                saveContextToCookie, loadContextFromCookie
            }}
        >
            {children}
        </AppContext.Provider>
    );
};

// Create a custom hook to simplify context usage
export const useAppContext = () => {
    const context = useContext(AppContext);
    if (!context) {
        throw new Error('useAppContext must be used within an AppProvider');
    }
    return context;
};
