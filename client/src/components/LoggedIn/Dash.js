import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import handleNoUser from '../handlers/handleNoUser';

const Dash = () => {
    
    /*
    const navigate = useNavigate();

    useEffect(() => {
        const userId = localStorage.getItem('userId');
        !userId && navigate('/login');
    }, [navigate]);
    
    const userId = localStorage.getItem('userId');
    console.log(userId)

    // If no userId stored, want to redirect user to login
    !userId && navigate('/login')*/

    handleNoUser();

    return (
        <h1>User Dashboard</h1>
    )

};

export default Dash;