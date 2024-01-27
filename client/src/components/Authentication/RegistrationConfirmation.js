import { useParams, Link } from "react-router-dom";

import useFetch from "../hooks/useFetch";
import Loading from "../Global/Loading";
import RaiseError from "../Global/RaiseError";

const RegistrationConfirmation = () => {

    const { userId } = useParams();
    const { isLoading, data, error } = useFetch(`/api/users/${userId}`); // Fetch to retrieve registered user's data
    const { fname, email } = !isLoading && data;
    return (
        <>
        {
            isLoading ?
            <Loading /> :
            error ? 
            <RaiseError /> :
            <>
            <h1>Registration Confirmation</h1>
            <p>Thanks {fname}! Your registration was successful. <br/> We have sent a confirmation to {email}</p>
            <p>Please <Link to='/'>login</Link> to reserve your workspace</p>
            </>
        }
        </>
    )
};

export default RegistrationConfirmation;
