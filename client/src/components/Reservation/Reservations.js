
import handleNoUser from "../handlers/handleNoUser";
import useFetch from "../hooks/useFetch";
import Loading from "../Global/Loading";
import SingleReservation from "./SingleReservation";

const Reservations = () => {

    handleNoUser(); // If no logged in user, cannot access this page
    const userId = localStorage.getItem('userId');
    const { isLoading, data } = useFetch(`/reservations/user/${userId}`)
    const sortedData = !isLoading && [...data].sort((a,b) => new Date(a.date) - new Date(b.date)); // Want to sort res by date

    // Create new reservation component/form
    // Modify will direct to another page (similar to the new reservation page)

    return (
        <>
            <h1>Upcoming reservations</h1>
            <div>
            {
                !isLoading && data.length ?
                (
                    <div>
                        <ul>
                            {sortedData.map(res => (
                                <SingleReservation resData={res} key={res._id} />
                            ))}
                        </ul>
                    </div>
                ) :
                !isLoading && !data.length ?
                (
                    <div>
                        <h1>No reservations</h1> 
                    </div>
                ) :
                <Loading />
            }
            <a href="/reservations/new" rel="noopener noreferrer">
                <button>New Reservation</button>
            </a>
            </div>
        </>
    );


};


export default Reservations;