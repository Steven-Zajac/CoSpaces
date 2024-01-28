import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

// Checks if userId is in local storage (logged in), if not, redirects to login. 
const handleNoUser = () => {
    
    const navigate = useNavigate();

    useEffect(() => {
        const userId = localStorage.getItem('userId');
        !userId && navigate('/');
    }, [navigate]);
    
}

export default handleNoUser;