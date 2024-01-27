import handleDeleteReservation from "../handlers/handleDeleteReservation";

const SingleReservation = ({ resData }) => {

    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

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