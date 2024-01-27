import Calendar from "react-calendar";
import styled from "styled-components";
import { useState } from 'react';

// A calendar to select availabilities based on location
const CalendarReservation = (props) => {

    const [selectedDay, setSelectedDay] = useState(null);
    
    // Extract prop data
    const { 
        availabilities, 
        changeDate,
        month, 
        strLocation,
    } = props;
    
    // This will is to be scaled for more months and years in the future
    const formatCalendar = (month) => {
        if (month !== null) {
            const date = new Date(2024, month, 1)
            return date;
        }
    };

    // Specify a start date for calendar
    const startDate = formatCalendar(month);

    // Disables teh time if there are no availabilities
    const isTileDisabled = ({ date, view }) => {
        if (view==='month') {
            const dayIdx = date.getDate() - 1;
            return availabilities[dayIdx] === 0;
        };
        return false;
    };

    const renderTileContent = ({ date, view }) => {
        if (view === 'month') {
            // -1 to match availabilities array
            const key = date.getDate()-1;
            // Get availability for the day
            const numAvailable = availabilities[key];

            return (
                <div>
                    {numAvailable !== undefined ? `Spots: ${numAvailable}` : ''}
                </div>
            );
        }
    };

    // Sets the day we have selected 
    const daySelector = (value, event) =>{
        setSelectedDay(value);
    };

    const tileClassName = ({ date, view }) => {
        if (view === 'month' && selectedDay && date.toDateString() === selectedDay.toDateString()) {
            return 'isSelectedDate';
        }
    };

    return (
        <>
            {
                (props.month !== null) &&
                <div>
                    <h1>Availabilities for {strLocation}</h1>
                    <StyledCalendar
                    onChange={changeDate}
                    activeStartDate={startDate}
                    showNeighboringMonth={false}
                    tileDisabled={isTileDisabled}
                    tileContent={renderTileContent}
                    calendarType="gregory"
                    onClickDay={daySelector}
                    tileClassName={tileClassName}
                    />
                </div>
            }
        </>
    )
};

export default CalendarReservation;

const StyledCalendar = styled(Calendar)`
    .isSelectedDate {
        background-color: #4caf50;
        color: white;
    }
`;