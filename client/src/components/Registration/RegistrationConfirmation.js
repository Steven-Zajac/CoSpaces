import { useParams, Link } from "react-router-dom";
//import { useState, useEffect } from "react";
//import styled from 'styled-components';


import useFetch from "../hooks/useFetch";

import Loading from "../global/Loading";

const RegistrationConfirmation = () => {

    const { userId } = useParams();
    const { isLoading, data, error } = useFetch(`/users/${userId}`); // Fetch to retrieve registered user's data
    const { fname, email } = !isLoading && data;
    return (
        <>
        {
            isLoading ?
            <Loading /> :
            <>
            <h1>Registration Confirmation</h1>
            <p>Thanks {fname}! Your registration was successful. <br/> We have sent a confirmation to {email}</p>
            <p>Please <Link to='/login'>login</Link> to reserve your workspace</p>
            </>
        }
        </>
    )
};

export default RegistrationConfirmation;
