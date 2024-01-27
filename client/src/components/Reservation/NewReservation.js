import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Loading from "../Global/Loading";
import CalendarReservation from "./CalendarReservation";
import LocationSelect from "./LocationSelect";

import handleNoUser from "../handlers/handleNoUser";
import handlePostSubmit from "../handlers/handlePostSubmit";
import useFetch from "../hooks/useFetch";

const NewReservation = () => {

    handleNoUser();
    const userId = localStorage.getItem('userId');
    const navigate = useNavigate();
    const [formData, setFormData] = useState({});
    const [location, setLocation] = useState(null);
    const { isLoading, data } = useFetch('/locations');
    const [availabilities, setAvailabilities] = useState(null);
    const [isFetchDone, setIsFetchDone] = useState(false);

    const locations = {
        'downtown': 'Downtown Montreal',
        'rosemont': 'Vieux-Rosemont'
    };

    // Changes date
    const changeDate = (newDate) => {
        if (newDate) {
            setFormData({ 
                ...formData, 
                year: String(newDate.getFullYear()),
                month: String(newDate.getMonth()),
                day: String(newDate.getDate())
            })
        }
    };

    const handleDropDown = (e) => {
        if (e.target.value === 'selectOne') {
            return;
        }
        setLocation(e.target.value);
        setFormData({ userId: userId, location: e.target.value });
        
    };

    useEffect(() => {
        const fetchRes = async () => {
            setIsFetchDone(false)
            try {
                const response = await fetch(`/availabilities/${location}`);
                const result = await response.json();
                setAvailabilities(result.data);
                setIsFetchDone(true);
            } catch (error) {
                throw error;
            }
        };
        if (!isLoading) {
            fetchRes(data._id);
        }
    }, [location]);

    const availableDays = availabilities && availabilities[0].days.map(day => (day.available));
    const month = availabilities && availabilities[0].month;

    const handleNewReservation = async (e) => {
        e.preventDefault();
        console.log(formData)
        try {
            const result = await handlePostSubmit(formData, '/reservations');
            if (result.status === 200) {
                window.alert('Success!');
                await navigate(`/reservations/user/${userId}`)
            } else {
                window.alert(result.message);
                setFormData({ location: location, userId: userId }); // Reset state to current loc and always include userId
            }
        } catch (error) {
            throw error;
        }
    };


    return (
        <>
            <h1>Create a New Reservation</h1>
            {
                !isLoading ?
                (
                    <>
                        <div>
                            <span>Please select a location: </span>
                            <LocationSelect
                            handleDrop={handleDropDown}
                            data={data}
                            locations={locations}
                            />
                        </div>
                        {isFetchDone && (
                            <div>
                                <CalendarReservation
                                month={month}
                                availabilities={availableDays}
                                changeDate={changeDate}
                                location={location}
                                strLocation={locations[location]}
                                />
                                <button onClick={handleNewReservation}>Book!</button>
                            </div>
                        )}
                    </>
                ) :
                <Loading />
            }
        </>

    )
};

export default NewReservation;