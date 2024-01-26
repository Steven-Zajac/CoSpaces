import handleDeleteReservation from "../handlers/handleDeleteReservation";

const SingleReservation = ({ resData }) => {

    const months = {
        0: "January",
        1: "February",
        2: "March",
        3: "April",
        4: "May",
        5: "June",
        6: "July",
        7: "August",
        8: "September",
        9: "October",
        10: "November",
        11: "December"
    };

    const locations = {
        'downtown': 'CoSpaces Downtown Montreal',
        'rosemont': 'CoSpaces Vieux-Rosemont'
    };

    // Parse date data
    const date = new Date(resData.date);
    const day = date.getDate();
    const month = months[date.getMonth()];
    const year = date.getFullYear();

    return (
        <div>
            <ul>
                <div>Date: {month} {day}, {year}</div>
                <div>Location: {locations[resData.location]}</div>
                <button>Modify</button>
                <button onClick={() => handleDeleteReservation(resData._id)}>Delete</button>
            </ul>
        </div>
    );
};

export default SingleReservation;