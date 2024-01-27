import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import Loading from "../Global/Loading";
import CalendarReservation from "./CalendarReservation";
import LocationSelect from "./LocationSelect";

import handleNoUser from "../handlers/handleNoUser";
import handlePatchSubmit from "../handlers/handlePatchSubmit";
import useFetch from "../hooks/useFetch";
import useCalendarData from "../hooks/useCalendarData";

const ModifyReservation = () => {

    handleNoUser();
    const userId = localStorage.getItem('userId');
    const { resId } = useParams();
    const navigate = useNavigate();
    const [ formData, location, handleDrop, handleChangeDate ] = useCalendarData(false)
    const { isLoading: isLoadingRes, data: dataRes } = useFetch(`/api/reservations/res/${resId}`);
    const { isLoading: isLoadingLoc, data: dataLoc } = useFetch('/api/locations');
    const { isLoading, data} = useFetch(`/api/availabilities/${location}`);
   // const [availabilities, setAvailabilities] = useState(null);
    //const [isFetchDone, setIsFetchDone] = useState(false);


    const locations = {
        'downtown': 'Downtown Montreal',
        'rosemont': 'Vieux-Rosemont'
    };

    // Parse current res's date 
    const oldResDate = dataRes && new Date(dataRes.date)
    const weekDay = oldResDate ? oldResDate.toLocaleString('default', { weekday: 'long' }) : '';
    const month = oldResDate ? oldResDate.toLocaleString('default', { month: 'long' }) : '';
    const day = oldResDate ? oldResDate.getDate() : '';
    const year = oldResDate ? oldResDate.getFullYear() : '';

    const availableDays = data && data[0].days.map(day => (day.available));
    const currMonth = data ? data[0].month : null;

    const handleModifyReservation = async (e) => {
        e.preventDefault();
        try {
            const result = await handlePatchSubmit(formData, `/api/reservations/${resId}`);
            if (result.status === 200) {
                window.alert('Success!');
                await navigate(`/reservations/user/${userId}`)
            } else {
                window.alert(result.message);
            }
        } catch (error) {
            throw error;
        }
    };
    
    return (
        <>
            <h1>Modify your upcoming reservation</h1>
            {
                (!isLoadingLoc && !isLoadingRes) ? 
                (
                    <>
                        <div>Current reservation: {weekDay}, {month} {day}, {year} at CoSpaces {locations[dataRes.location]}</div>
                        <div>
                            <span>Please select a location: </span>
                            <LocationSelect
                                handleDrop={handleDrop}
                                data={dataLoc}
                                locations={locations}
                            />
                        </div>
                        {!isLoading && (
                            <div>
                                <CalendarReservation 
                                    month={currMonth}
                                    availabilities={availableDays}
                                    changeDate={handleChangeDate}
                                    location={location}
                                    strLocation={locations[location]}
                                />
                                <button onClick={handleModifyReservation}>Modify!</button>
                            </div>
                        )}
                    </>
                ) :
                <Loading />
            }
        </>
    )

};


export default ModifyReservation;

