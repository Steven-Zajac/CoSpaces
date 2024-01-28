import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

const handleUserLoggedIn = () => {

    const navigate = useNavigate();
    const alertShown = useRef(false); // prevents from alert to pop up twice bc of strict mode

    // Redirects user to dashboard if user logged in
    useEffect(() => {
        const userId = localStorage.getItem('userId');
        if (userId && !alertShown.current) {
            window.alert('User already logged in');
            alertShown.current = true;
            navigate(`/user/${userId}/home`);
        }
    }, [navigate]);

};

export default handleUserLoggedIn;