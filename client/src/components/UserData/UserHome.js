import { useState, useEffect } from 'react';
import handleNoUser from '../handlers/handleNoUser';
import useFetch from '../hooks/useFetch';
import Loading from '../Global/Loading';

const UserHome = () => {

    handleNoUser(); // If no user, redirect to login
    const userId = localStorage.getItem('userId');
    const { isLoading, data } = useFetch(`/users/${userId}`);

    return (
        <>
            {
                !isLoading ?
                <h1>Welcome, {data.fname}</h1> : 
                <Loading />

            }
        </>
    )

};

export default UserHome;