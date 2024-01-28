import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import handleNoUser from '../handlers/handleNoUser';
import useFetch from '../hooks/useFetch';
import Loading from '../Global/Loading';

const UserHome = () => {

    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const locations = {
        'downtown': 'CoSpaces Downtown Montreal',
        'rosemont': 'CoSpaces Vieux-Rosemont'
    };

    handleNoUser(); // If no user, redirect to login
    const userId = localStorage.getItem('userId');
    const { isLoading, data } = useFetch(`/api/users/${userId}`);
    const [reservations, setReservations] = useState(null);
    const [isFetchDone, setIsFetchDone] = useState(false);

    useEffect(() => {
        const fetchRes = async () => {
            try {
                const response = await fetch(`/api/reservations/user/${userId}`);
                const result = await response.json();
                setReservations(result.data);
                setIsFetchDone(true);
            } catch (error) {
                throw error;
            }
        };
        if (!isLoading && data) {
            fetchRes(data._id);
        } 
    }, [data]);
    
    // Sorts reservations is fetch is done and reservations are present
    const sortedReservations = (isFetchDone && reservations) && reservations.sort((a,b) => new Date(a.date) - new Date(b.date));
    // if reservation(s) are there then it will grab the date info                           
    const date = sortedReservations.length ? new Date(sortedReservations[0].date) : false ;
    
    return (
        <>
            {
                (isFetchDone && data) ?
                <Container>
                    <Title>Welcome, {data.fname}!</Title> 
                    {
                        date ?
                        <Text>
                            Your next reservation is for <ResInfo>{days[date.getDay()]}, {months[date.getMonth()]} {date.getDate()}, {date.getFullYear()}</ResInfo> at {locations[sortedReservations[0].location]}
                        </Text> : 
                        <Text>You have no upcoming reservations</Text>
                    }
                </Container> : 
                <Loading />

            }
        </>
    )

};

export default UserHome;

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: start;
    width: 75%;
    padding: 2rem;
    padding-left: 7rem;

`;

const Title = styled.h1`

`;

const Text = styled.div`

`;

const ResInfo = styled.span`
    border-bottom: solid black;
`;