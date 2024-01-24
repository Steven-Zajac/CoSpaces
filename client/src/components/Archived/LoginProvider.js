import { createContext, useState, useEffect } from "react";

const LoginProvider = ({ components }) => {

    const LoginContext = createContext();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    
    useEffect(() => {
        const userId = localStorage.getItem('userId');
        setIsLoggedIn(userId !== null);
    }, []);

    return (
        <LoginContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
            {components}
        </LoginContext.Provider>
    )
};

export default LoginProvider;