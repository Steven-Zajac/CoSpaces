import { useState, useEffect } from 'react';
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
    const { isLoading, data } = useFetch(`/users/${userId}`);
    const [reservations, setReservations] = useState(null);
    const [isFetchDone, setIsFetchDone] = useState(false);

    useEffect(() => {
        const fetchRes = async () => {
            try {
                const response = await fetch(`/reservations/user/${userId}`);
                const result = await response.json();
                setReservations(result.data);
                setIsFetchDone(true);
            } catch (error) {
                throw error;
            }
        };
        if (!isLoading) {
            fetchRes(data._id);
        }
    }, [isLoading]);
    
    // Sorts reservations is fetch is done and reservations are present
    const sortedReservations = (isFetchDone && reservations) && reservations.sort((a,b) => new Date(a.date) - new Date(b.date));
    // if reservation(s) are there then it will grab the date info                           
    const date = sortedReservations.length ? new Date(sortedReservations[0].date) : false ;
    
    return (
        <>
            {
                isFetchDone ?
                <>
                    <h1>Welcome, {data.fname}!</h1> 
                    {
                        date ?
                        <div>
                            Your next reservation is for {days[date.getDay()]}, {months[date.getMonth()]} {date.getDate()}, {date.getFullYear()} at {locations[sortedReservations[0].location]}
                        </div> : 
                        <div>You have no upcoming reservations</div>
                    }
                </> : 
                <Loading />

            }
        </>
    )

};

/*!isLoading && date ?*/

export default UserHome;