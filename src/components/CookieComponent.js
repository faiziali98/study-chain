// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';

const CookieComponent = ({children}) => {
    const location = useLocation();
    const { saveContextToCookie, loadContextFromCookie, getUser } = useAppContext();
    const [ initializing, setInitializing ] = useState(true);
    const user = getUser();

    useEffect(() => {
        loadContextFromCookie(setInitializing);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    
    
    useEffect(() => {
        !initializing && saveContextToCookie();
    }, [initializing, location.pathname, saveContextToCookie, user]);
    
    return children
}

export default CookieComponent;
