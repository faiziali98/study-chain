import React, { useState, useContext } from 'react';

// Create a context to hold the form values
const AppContext = React.createContext();

// Create a context provider component
export const AppProvider = ({ children }) => {
    const [formValues, setFormValues] = useState({
        initial: {},
        final: {},
    });

    const [user, setUser] = useState(null);

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
        const { initial, final } = formValues;
        const score = Object.keys(initial).reduce((accumulator, key) => (
            accumulator + (final[key] - initial[key])
        ), 0);

        return score;
    }

    return (
        <AppContext.Provider value={{ formValues, updateFormValues, getResult, updateUser, getUser }}>
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
