
import handleNoUser from "../handlers/handleNoUser";
import useFetch from "../hooks/useFetch";
import Loading from "../Global/Loading";
import SingleReservation from "./SingleReservation";

const Reservations = () => {

    handleNoUser();
    const userId = localStorage.getItem('userId');
    const { isLoading, data } = useFetch(`/reservations/user/${userId}`)

    // create SingleReservation component for the .map
    // there we can extract the date with 
    //const date = new Date(item.date);
    // then parse
    // use a dictionary for month number to string month

    // Create new reservation component/form
    // Create SingleReservation component that will store data cleanly
    // It will also include a modify and delete button
    // Delete will delete the specified reservation. 
    // Modify will direct to another page (similar to the new reservation page)
    // Add a button that directs to new reservation component (this is there whether there are
    // reservations or not)

    return (
        <>
            <h1>Upcoming reservations</h1>
            <div>
            {
                !isLoading && data.length ?
                (
                    <div>
                        <ul>
                            {data.map(res => (
                                <SingleReservation resData={res} key={res._id} />
                            ))}
                        </ul>
                        <button>New Reservation</button>
                    </div>
                ) :
                !isLoading && !data.length ?
                (
                    <div>
                        <h1>No reservations</h1> 
                        <button>New Reservation</button>
                    </div>
                ) :
                <Loading />
            }
            </div>
        </>
    );


};


export default Reservations;