import { useParams, NavLink } from "react-router-dom";

import styled from "styled-components";

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
            <Container>
                <Title>Registration Confirmation</Title>
                <Text>Thanks {fname}! Your registration was successful.</Text>
                <Text>We have sent a confirmation to {email}</Text>
                <Text>Please <StyledLink to='/'>login</StyledLink> to reserve your workspace</Text>
            </Container>
        }
        </>
    )
};

export default RegistrationConfirmation;

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 50%;
    height: 20vh;
    margin: 0 auto;
`;

const Title = styled.h1`

`;

const Text = styled.span`
    font-size: 20px;
`;

const StyledLink = styled(NavLink)`
    color: #9092fc;
`;